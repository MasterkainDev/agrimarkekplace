import { createRouteHandlerClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { z } from "zod";

const ticketSchema = z.object({
  subject: z.string().min(1).max(255),
  message: z.string().min(1).max(2000),
  priority: z.enum(["low", "medium", "high", "urgent"]),
  category: z.enum(["general", "technical", "billing", "other"]),
});

const contactFormSchema = z.object({
  name: z.string().min(2).max(50),
  email: z.string().email(),
  phone: z.string().min(8).max(15).optional(),
  subject: z.string().min(1).max(255),
  message: z.string().min(10).max(1000),
  priority: z.enum(["low", "normal", "high", "urgent"]),
});

export async function POST(request: Request) {
  try {
    const supabase = createRouteHandlerClient({ cookies });
    const json = await request.json();
    const { type } = json;

    // Vérifier l'authentification pour certaines actions
    const {
      data: { session },
    } = await supabase.auth.getSession();

    switch (type) {
      case "create_ticket": {
        const { data } = json;
        const validatedData = ticketSchema.parse(data);

        if (!session) {
          return NextResponse.json(
            { error: "Authentication required" },
            { status: 401 }
          );
        }

        const { data: ticket, error } = await supabase
          .from("tickets")
          .insert([
            {
              ...validatedData,
              user_id: session.user.id,
              status: "open",
            },
          ])
          .select()
          .single();

        if (error) throw error;

        return NextResponse.json({ ticket });
      }

      case "contact_form": {
        const { data } = json;
        const validatedData = contactFormSchema.parse(data);

        const { error } = await supabase.from("contact_messages").insert([
          {
            ...validatedData,
            user_id: session?.user?.id,
            status: "new",
          },
        ]);

        if (error) throw error;

        return NextResponse.json({
          message: "Message sent successfully",
        });
      }

      case "get_tickets": {
        if (!session) {
          return NextResponse.json(
            { error: "Authentication required" },
            { status: 401 }
          );
        }

        const { data: tickets, error } = await supabase
          .from("tickets")
          .select("*")
          .eq("user_id", session.user.id)
          .order("created_at", { ascending: false });

        if (error) throw error;

        return NextResponse.json({ tickets });
      }

      case "update_ticket": {
        if (!session) {
          return NextResponse.json(
            { error: "Authentication required" },
            { status: 401 }
          );
        }

        const { ticket_id, status } = json.data;

        const { data: ticket, error } = await supabase
          .from("tickets")
          .update({ status })
          .eq("id", ticket_id)
          .eq("user_id", session.user.id)
          .select()
          .single();

        if (error) throw error;

        return NextResponse.json({ ticket });
      }

      default:
        return NextResponse.json(
          { error: "Invalid action type" },
          { status: 400 }
        );
    }
  } catch (error) {
    console.error("Support API Error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
