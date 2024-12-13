import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';
import { Database } from '@/types/supabase';

const supabase = createClient<Database>(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

const resend = new Resend(process.env.RESEND_API_KEY);

export async function handleTicketCreated(ticket: Database['public']['Tables']['tickets']['Row']) {
  try {
    // 1. Envoyer un email de confirmation
    await resend.emails.send({
      from: 'support@agrimarketplace.com',
      to: ticket.profiles.email,
      subject: `Ticket #${ticket.id} - Confirmation de création`,
      html: `
        <h2>Votre ticket a été créé avec succès</h2>
        <p>Merci d'avoir contacté notre support. Votre ticket "${ticket.title}" a été créé et sera traité dans les plus brefs délais.</p>
        <p>Vous pouvez suivre l'état de votre ticket en cliquant sur le lien ci-dessous :</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/support/tickets/${ticket.id}">
          Voir le ticket
        </a>
      `,
    });

    // 2. Créer une notification
    await supabase.from('notifications').insert({
      user_id: ticket.user_id,
      title: 'Nouveau ticket créé',
      message: `Votre ticket "${ticket.title}" a été créé avec succès.`,
      type: 'ticket_created',
      link: `/support/tickets/${ticket.id}`,
    });

    // 3. Mettre à jour les statistiques
    await updateSupportStats(ticket.category);

  } catch (error) {
    console.error('Erreur lors du traitement du nouveau ticket:', error);
  }
}

export async function handleTicketUpdated(ticket: Database['public']['Tables']['tickets']['Row']) {
  try {
    // 1. Envoyer un email de notification
    await resend.emails.send({
      from: 'support@agrimarketplace.com',
      to: ticket.profiles.email,
      subject: `Ticket #${ticket.id} - Mise à jour du statut`,
      html: `
        <h2>Votre ticket a été mis à jour</h2>
        <p>Le statut de votre ticket "${ticket.title}" a été mis à jour vers "${ticket.status}".</p>
        <p>Vous pouvez consulter les détails en cliquant sur le lien ci-dessous :</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/support/tickets/${ticket.id}">
          Voir le ticket
        </a>
      `,
    });

    // 2. Créer une notification
    await supabase.from('notifications').insert({
      user_id: ticket.user_id,
      title: 'Ticket mis à jour',
      message: `Le statut de votre ticket "${ticket.title}" a été mis à jour vers "${ticket.status}".`,
      type: 'ticket_updated',
      link: `/support/tickets/${ticket.id}`,
    });

  } catch (error) {
    console.error('Erreur lors de la mise à jour du ticket:', error);
  }
}

export async function handleNewMessage(message: any) {
  try {
    // 1. Récupérer les informations du ticket
    const { data: ticket, error: ticketError } = await supabase
      .from('tickets')
      .select('*, profiles:user_id(email, full_name)')
      .eq('id', message.ticket_id)
      .single();

    if (ticketError) throw ticketError;

    // 2. Envoyer un email de notification
    await resend.emails.send({
      from: 'support@agrimarketplace.com',
      to: ticket.profiles.email,
      subject: `Ticket #${ticket.id} - Nouvelle réponse`,
      html: `
        <h2>Nouvelle réponse à votre ticket</h2>
        <p>Une nouvelle réponse a été ajoutée à votre ticket "${ticket.title}".</p>
        <p>Cliquez sur le lien ci-dessous pour voir la réponse :</p>
        <a href="${process.env.NEXT_PUBLIC_APP_URL}/support/tickets/${ticket.id}">
          Voir le ticket
        </a>
        <hr />
        <p><strong>Message :</strong></p>
        <p>${message.content}</p>
      `,
    });

    // 3. Créer une notification
    await supabase.from('notifications').insert({
      user_id: ticket.user_id,
      title: 'Nouvelle réponse',
      message: `Une nouvelle réponse a été ajoutée à votre ticket "${ticket.title}".`,
      type: 'new_message',
      link: `/support/tickets/${ticket.id}`,
    });

  } catch (error) {
    console.error('Erreur lors du traitement du nouveau message:', error);
  }
}

export async function updateSupportStats(category: string) {
  try {
    // 1. Récupérer les statistiques actuelles
    const { data: stats, error: statsError } = await supabase
      .from('support_stats')
      .select('*')
      .eq('category', category)
      .single();

    if (statsError && statsError.code !== 'PGRST116') {
      throw statsError;
    }

    // 2. Mettre à jour ou créer les statistiques
    if (stats) {
      await supabase
        .from('support_stats')
        .update({
          total_tickets: stats.total_tickets + 1,
          updated_at: new Date().toISOString(),
        })
        .eq('category', category);
    } else {
      await supabase.from('support_stats').insert({
        category,
        total_tickets: 1,
      });
    }
  } catch (error) {
    console.error('Erreur lors de la mise à jour des statistiques:', error);
  }
}
