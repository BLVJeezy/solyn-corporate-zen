export type Lang = "NL" | "FR" | "EN";

export const translations: Record<Lang, Record<string, string>> = {
  NL: {
    // Navbar
    "nav.home": "Home",
    "nav.services": "Diensten",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",
    "nav.clientLogin": "Client Login",
    "nav.cta": "Gratis Advies",

    // Hero
    "hero.title1": "Uw Visie,",
    "hero.title2": "Onze Expertise.",
    "hero.subtitle": "Web development, infrastructuur en consultancy oplossingen voor groeiende ondernemingen.",
    "hero.cta1": "Start Jouw Project",
    "hero.cta2": "Bekijk Diensten",

    // Services
    "services.heading1": "Onze",
    "services.heading2": "Diensten",
    "services.subtitle": "Wij bieden complete oplossingen voor uw onderneming.",
    "services.web.title": "Web Development",
    "services.web.desc": "Professionele websites en webapplicaties op maat, gebouwd met de nieuwste technologieën voor optimale prestaties.",
    "services.infra.title": "Infrastructure",
    "services.infra.desc": "End-to-end infrastructuuroplossingen die de basis leggen voor duurzame groei en operationele efficiëntie.",
    "services.consult.title": "Consultancy",
    "services.consult.desc": "Strategisch advies op maat dat uw organisatie begeleidt van visie naar realisatie.",

    // TrustBar
    "trust.projects": "Projecten",
    "trust.clients": "Tevreden klanten",
    "trust.countries": "Landen",
    "trust.support": "Support",

    // Process
    "process.heading1": "Ons",
    "process.heading2": "Proces",
    "process.subtitle": "Een gestructureerde aanpak die resulteert in meetbare resultaten.",
    "process.step1.title": "Kennismaking",
    "process.step1.desc": "We luisteren naar uw behoeften en analyseren uw huidige situatie grondig.",
    "process.step2.title": "Strategie",
    "process.step2.desc": "Op basis van onze analyse ontwikkelen we een maatwerk strategie en roadmap.",
    "process.step3.title": "Uitvoering",
    "process.step3.desc": "We implementeren de oplossing en begeleiden u bij elke stap van het proces.",

    // Portfolio
    "portfolio.label": "Portfolio",
    "portfolio.heading": "Recente Projecten",
    "portfolio.subtitle": "Een selectie van onze meest recente samenwerkingen en resultaten.",
    "portfolio.p1.category": "Medische Groothandel",
    "portfolio.p1.desc": "Corporate website met GDP & WDA certificering integratie.",
    "portfolio.p2.category": "Automotive Detailing",
    "portfolio.p2.desc": "Lead-generatie platform met offerte-aanvraag systeem.",
    "portfolio.p3.category": "Beauty & Wellness",
    "portfolio.p3.desc": "Elegant brand platform voor premium nail art studio.",

    // LeadForm
    "lead.heading1": "Plan een",
    "lead.heading2": "Afspraak",
    "lead.subtitle": "Laat uw gegevens achter en wij nemen binnen 24 uur contact met u op.",
    "lead.name": "Uw naam",
    "lead.namePh": "Jan Janssen",
    "lead.company": "Bedrijfsnaam",
    "lead.companyPh": "Uw bedrijf B.V.",
    "lead.budget": "Budget (EUR)",
    "lead.budgetPh": "€750 - €2.000",
    "lead.message": "Uw bericht",
    "lead.messagePh": "Vertel ons over uw project...",
    "lead.back": "Terug",
    "lead.next": "Volgende",
    "lead.send": "Versturen",
    "lead.success": "Bedankt! We nemen zo snel mogelijk contact met u op.",

    // Footer
    "footer.desc": "Web development, infrastructuur en consultancy oplossingen voor groeiende ondernemingen.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.rights": "© 2026 Solyn Global Ltd. Alle rechten voorbehouden.",
  },

  FR: {
    // Navbar
    "nav.home": "Accueil",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",
    "nav.clientLogin": "Espace Client",
    "nav.cta": "Conseil Gratuit",

    // Hero
    "hero.title1": "Votre Vision,",
    "hero.title2": "Notre Expertise.",
    "hero.subtitle": "Développement web, infrastructure et solutions de conseil pour les entreprises en croissance.",
    "hero.cta1": "Démarrez Votre Projet",
    "hero.cta2": "Voir les Services",

    // Services
    "services.heading1": "Nos",
    "services.heading2": "Services",
    "services.subtitle": "Nous offrons des solutions complètes pour votre entreprise.",
    "services.web.title": "Développement Web",
    "services.web.desc": "Sites web et applications web professionnels sur mesure, construits avec les dernières technologies pour des performances optimales.",
    "services.infra.title": "Infrastructure",
    "services.infra.desc": "Solutions d'infrastructure de bout en bout qui posent les bases d'une croissance durable et d'une efficacité opérationnelle.",
    "services.consult.title": "Conseil",
    "services.consult.desc": "Conseil stratégique sur mesure qui guide votre organisation de la vision à la réalisation.",

    // TrustBar
    "trust.projects": "Projets",
    "trust.clients": "Clients satisfaits",
    "trust.countries": "Pays",
    "trust.support": "Support",

    // Process
    "process.heading1": "Notre",
    "process.heading2": "Processus",
    "process.subtitle": "Une approche structurée qui aboutit à des résultats mesurables.",
    "process.step1.title": "Découverte",
    "process.step1.desc": "Nous écoutons vos besoins et analysons votre situation actuelle en profondeur.",
    "process.step2.title": "Stratégie",
    "process.step2.desc": "Sur base de notre analyse, nous développons une stratégie et une feuille de route sur mesure.",
    "process.step3.title": "Exécution",
    "process.step3.desc": "Nous implémentons la solution et vous accompagnons à chaque étape du processus.",

    // Portfolio
    "portfolio.label": "Portfolio",
    "portfolio.heading": "Projets Récents",
    "portfolio.subtitle": "Une sélection de nos collaborations et résultats les plus récents.",
    "portfolio.p1.category": "Grossiste Médical",
    "portfolio.p1.desc": "Site corporate avec intégration de certification GDP & WDA.",
    "portfolio.p2.category": "Detailing Automobile",
    "portfolio.p2.desc": "Plateforme de génération de leads avec système de demande de devis.",
    "portfolio.p3.category": "Beauté & Bien-être",
    "portfolio.p3.desc": "Plateforme de marque élégante pour un studio de nail art premium.",

    // LeadForm
    "lead.heading1": "Prenez",
    "lead.heading2": "Rendez-vous",
    "lead.subtitle": "Laissez vos coordonnées et nous vous contacterons dans les 24 heures.",
    "lead.name": "Votre nom",
    "lead.namePh": "Jean Dupont",
    "lead.company": "Nom de l'entreprise",
    "lead.companyPh": "Votre entreprise SA",
    "lead.budget": "Budget (EUR)",
    "lead.budgetPh": "€750 - €2.000",
    "lead.message": "Votre message",
    "lead.messagePh": "Parlez-nous de votre projet...",
    "lead.back": "Retour",
    "lead.next": "Suivant",
    "lead.send": "Envoyer",
    "lead.success": "Merci ! Nous vous contacterons dès que possible.",

    // Footer
    "footer.desc": "Développement web, infrastructure et solutions de conseil pour les entreprises en croissance.",
    "footer.quickLinks": "Liens Rapides",
    "footer.contact": "Contact",
    "footer.rights": "© 2026 Solyn Global Ltd. Tous droits réservés.",
  },

  EN: {
    // Navbar
    "nav.home": "Home",
    "nav.services": "Services",
    "nav.portfolio": "Portfolio",
    "nav.contact": "Contact",
    "nav.clientLogin": "Client Login",
    "nav.cta": "Free Consultation",

    // Hero
    "hero.title1": "Your Vision,",
    "hero.title2": "Our Expertise.",
    "hero.subtitle": "Web development, infrastructure and consultancy solutions for growing businesses.",
    "hero.cta1": "Start Your Project",
    "hero.cta2": "View Services",

    // Services
    "services.heading1": "Our",
    "services.heading2": "Services",
    "services.subtitle": "We offer complete solutions for your business.",
    "services.web.title": "Web Development",
    "services.web.desc": "Professional custom websites and web applications, built with the latest technologies for optimal performance.",
    "services.infra.title": "Infrastructure",
    "services.infra.desc": "End-to-end infrastructure solutions that lay the foundation for sustainable growth and operational efficiency.",
    "services.consult.title": "Consultancy",
    "services.consult.desc": "Tailored strategic advice that guides your organization from vision to realization.",

    // TrustBar
    "trust.projects": "Projects",
    "trust.clients": "Satisfied clients",
    "trust.countries": "Countries",
    "trust.support": "Support",

    // Process
    "process.heading1": "Our",
    "process.heading2": "Process",
    "process.subtitle": "A structured approach that results in measurable outcomes.",
    "process.step1.title": "Discovery",
    "process.step1.desc": "We listen to your needs and thoroughly analyze your current situation.",
    "process.step2.title": "Strategy",
    "process.step2.desc": "Based on our analysis, we develop a custom strategy and roadmap.",
    "process.step3.title": "Execution",
    "process.step3.desc": "We implement the solution and guide you through every step of the process.",

    // Portfolio
    "portfolio.label": "Portfolio",
    "portfolio.heading": "Recent Projects",
    "portfolio.subtitle": "A selection of our most recent collaborations and results.",
    "portfolio.p1.category": "Medical Wholesale",
    "portfolio.p1.desc": "Corporate website with GDP & WDA certification integration.",
    "portfolio.p2.category": "Automotive Detailing",
    "portfolio.p2.desc": "Lead generation platform with quote request system.",
    "portfolio.p3.category": "Beauty & Wellness",
    "portfolio.p3.desc": "Elegant brand platform for a premium nail art studio.",

    // LeadForm
    "lead.heading1": "Book an",
    "lead.heading2": "Appointment",
    "lead.subtitle": "Leave your details and we will contact you within 24 hours.",
    "lead.name": "Your name",
    "lead.namePh": "John Smith",
    "lead.company": "Company name",
    "lead.companyPh": "Your Company Ltd.",
    "lead.budget": "Budget (EUR)",
    "lead.budgetPh": "€750 - €2,000",
    "lead.message": "Your message",
    "lead.messagePh": "Tell us about your project...",
    "lead.back": "Back",
    "lead.next": "Next",
    "lead.send": "Send",
    "lead.success": "Thank you! We will contact you as soon as possible.",

    // Footer
    "footer.desc": "Web development, infrastructure and consultancy solutions for growing businesses.",
    "footer.quickLinks": "Quick Links",
    "footer.contact": "Contact",
    "footer.rights": "© 2026 Solyn Global Ltd. All rights reserved.",
  },
};
