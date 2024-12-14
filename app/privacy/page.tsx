export default function PrivacyPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Politique de Confidentialité</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="lead">
          Dernière mise à jour : 14 décembre 2023
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            AgriMarketplace s'engage à protéger la vie privée des utilisateurs de notre plateforme. 
            Cette politique de confidentialité explique comment nous collectons, utilisons et protégeons vos informations personnelles.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">2. Collecte des Informations</h2>
          <p>
            Nous collectons les informations que vous nous fournissez directement :
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Informations de compte (nom, email, numéro de téléphone)</li>
            <li>Informations de profil</li>
            <li>Informations de transaction</li>
            <li>Communications avec nous</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">3. Utilisation des Informations</h2>
          <p>
            Nous utilisons vos informations pour :
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Fournir et améliorer nos services</li>
            <li>Communiquer avec vous</li>
            <li>Personnaliser votre expérience</li>
            <li>Assurer la sécurité de notre plateforme</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">4. Protection des Données</h2>
          <p>
            Nous prenons la sécurité de vos données très au sérieux et mettons en œuvre 
            des mesures techniques et organisationnelles appropriées pour protéger vos informations.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">5. Vos Droits</h2>
          <p>
            Vous avez le droit de :
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Accéder à vos données personnelles</li>
            <li>Corriger vos données personnelles</li>
            <li>Supprimer vos données personnelles</li>
            <li>Vous opposer au traitement de vos données</li>
            <li>Retirer votre consentement à tout moment</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">6. Contact</h2>
          <p>
            Pour toute question concernant cette politique de confidentialité ou vos données personnelles, 
            veuillez nous contacter à :
          </p>
          <p className="mt-4">
            Email : privacy@agrimarketplace.com<br />
            Adresse : 123 Rue de l'Agriculture, Dakar, Sénégal
          </p>
        </section>
      </div>
    </div>
  );
}
