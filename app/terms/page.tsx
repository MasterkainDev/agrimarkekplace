export default function TermsPage() {
  return (
    <div className="container py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Conditions Générales d'Utilisation</h1>
      
      <div className="prose prose-gray dark:prose-invert max-w-none">
        <p className="lead">
          Dernière mise à jour : 14 décembre 2023
        </p>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">1. Introduction</h2>
          <p>
            Bienvenue sur AgriMarketplace. En utilisant notre plateforme, vous acceptez 
            ces conditions générales d'utilisation. Veuillez les lire attentivement.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">2. Définitions</h2>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>
              <strong>Plateforme :</strong> désigne le site web et l'application AgriMarketplace
            </li>
            <li>
              <strong>Utilisateur :</strong> toute personne qui accède à et utilise la Plateforme
            </li>
            <li>
              <strong>Services :</strong> l'ensemble des services proposés par AgriMarketplace
            </li>
            <li>
              <strong>Contenu :</strong> tous les éléments publiés sur la Plateforme
            </li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">3. Inscription et Compte</h2>
          <p>
            Pour utiliser certains services, vous devez créer un compte. Vous vous engagez à :
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Fournir des informations exactes et complètes</li>
            <li>Maintenir la confidentialité de vos identifiants</li>
            <li>Ne pas créer de compte multiples</li>
            <li>Ne pas usurper l'identité d'un tiers</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">4. Utilisation de la Plateforme</h2>
          <p>
            En utilisant notre plateforme, vous vous engagez à :
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Respecter les lois en vigueur</li>
            <li>Ne pas perturber le fonctionnement de la plateforme</li>
            <li>Ne pas diffuser de contenu illégal ou préjudiciable</li>
            <li>Respecter les droits des autres utilisateurs</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">5. Transactions</h2>
          <p>
            Les transactions effectuées sur la plateforme sont soumises aux conditions suivantes :
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Les prix sont indiqués en euros</li>
            <li>Les vendeurs sont responsables de la description de leurs produits</li>
            <li>AgriMarketplace n'est pas responsable des transactions entre utilisateurs</li>
            <li>Les frais de service sont non remboursables</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">6. Propriété Intellectuelle</h2>
          <p>
            Tous les contenus présents sur la plateforme (logos, textes, etc.) sont 
            la propriété exclusive d'AgriMarketplace ou de ses partenaires.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">7. Limitation de Responsabilité</h2>
          <p>
            AgriMarketplace ne peut être tenu responsable :
          </p>
          <ul className="list-disc pl-6 mt-4 space-y-2">
            <li>Des contenus publiés par les utilisateurs</li>
            <li>Des transactions entre utilisateurs</li>
            <li>Des interruptions de service</li>
            <li>Des dommages indirects</li>
          </ul>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">8. Modification des CGU</h2>
          <p>
            AgriMarketplace se réserve le droit de modifier ces CGU à tout moment. 
            Les utilisateurs seront informés des modifications importantes.
          </p>
        </section>

        <section className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">9. Contact</h2>
          <p>
            Pour toute question concernant ces CGU, veuillez nous contacter à :
          </p>
          <p className="mt-4">
            Email : legal@agrimarketplace.com<br />
            Adresse : 123 Rue de l'Agriculture, Dakar, Sénégal
          </p>
        </section>
      </div>
    </div>
  );
}
