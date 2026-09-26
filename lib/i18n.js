'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react'

// ---------------------------------------------------------------------------
// RIHANA DREAMS CARS — translations (FR · EN · AR) + language context
//
// • French is the default language. The choice is saved in localStorage.
// • Arabic switches the whole document to RTL (dir="rtl", lang="ar") and adds
//   the `font-arabic` class on <html> (Cairo, see app/globals.css).
// • Keys are flat (navFleet, heroSubtitle…). The dotted keys requested in the
//   brief (nav.fleet, hero.title, cta.whatsapp…) are aliases — see ALIASES.
// • Car copy uses prefixed keys so it can be looked up from data.js values:
//     s:<spec>   f:<feature>   b:<car slug>   (see `tv` below)
// ---------------------------------------------------------------------------

export const LANGUAGES = [
  { code: 'fr', label: 'FR', name: 'Français' },
  { code: 'en', label: 'EN', name: 'English' },
  { code: 'ar', label: 'العربية', name: 'العربية' },
]
export const DEFAULT_LANG = 'fr'
export const STORAGE_KEY = 'rihana-lang'

export const dict = {
  // =========================================================================
  // FRANÇAIS
  // =========================================================================
  fr: {
    // Navigation
    navHome: 'Accueil',
    navFleet: 'Flotte',
    navExperience: 'Expérience',
    navWhy: 'Pourquoi nous',
    navContact: 'Contact',
    navBook: 'Réserver',
    navigation: 'Navigation',
    menu: 'Menu',
    close: 'Fermer',
    language: 'Langue',

    // Hero
    bookYourDream: 'Réservez Votre Rêve',
    heroTitle1: 'PAS JUSTE UNE VOITURE.',
    heroTitle2: "C'EST VOTRE RÊVE SAHARIEN.",
    heroTitleFull: 'OÙ ALLONS-NOUS ?',
    heroHeadlinePlain: 'OÙ ALLONS',
    heroHeadlineAccent: '-NOUS ?',
    heroSub:
      'Location de voitures de luxe & expériences authentiques du désert marocain — Marrakech, Merzouga & le Haut Atlas.',
    heroSubtitle: "Choisissez votre voyage, on s'occupe du reste.",
    heroCta: 'Découvrir la flotte',
    choose: 'Choisissez votre voyage',
    chooseThisTrip: 'Choisir ce voyage',
    carsLabel: 'Voitures',
    heroTrust1: 'Assurance Complète',
    heroTrust2: 'Support 24/7',
    heroTrust3: 'Livraison & Accueil',
    heroTrust4: 'Annulation Gratuite (48h)',

    // Widget de réservation (Hero)
    widgetLocationLabel: 'Lieu de prise en charge',
    widgetLocationAirport: 'Aéroport Marrakech-Menara',
    widgetLocationCity: 'Centre-ville Marrakech',
    widgetLocationMerzouga: 'Merzouga',
    widgetLocationOuarzazate: 'Ouarzazate',
    widgetLocationAtlas: 'Haut Atlas',
    widgetPickupDateLabel: 'Date de prise en charge',
    widgetReturnDateLabel: 'Date de retour',
    widgetSearchButton: 'Rechercher',
    widgetSearchMsg:
      'Salam RIHANA DREAMS CARS, bghit n3ref wach voiture disponible du {date1} au {date2} à {lieu}?',

    // Catégories
    family: 'FAMILLE',
    familySub: 'Voyage en Famille',
    familyBlurb: 'Confort, sécurité et place pour tous.',
    belbala: 'BELBALA',
    belbalaSub: 'Voyage Désert',
    belbalaBlurb: "Esprit d'aventure et souvenirs inoubliables.",
    atlas: 'ATLAS',
    atlasSub: 'Voyage en Montagne',
    atlasBlurb: 'Nature grandiose, routes claires, vraie aventure.',
    collectionTitle: 'Collection {name}',
    vehiclesCollection: '{n} Véhicules / Une Collection',
    collectionSubFamily:
      'Confort, sécurité et place pour tous. Quatre voitures, choisies pour toute la famille.',
    collectionSubBelbala:
      'Grand désert. Merzouga. Erg Chebbi. Trois voitures, choisies pour la route du sud.',
    collectionSubAtlas:
      'Virages en épingle. Sommets enneigés. Villages berbères. Quatre voitures, choisies pour le Haut Atlas.',

    // Flotte & fiches voiture
    fleetTitle: 'La Flotte',
    fleetSub: 'Trois voyages. Une seule exigence.',
    fleetCount: '{n} Véhicules / 3 Voyages',
    all: 'Tous',
    backToFleet: 'Retour à la flotte',
    checkAvailability: 'Vérifier la disponibilité',
    availabilityQuestion:
      'Cette voiture est-elle disponible à vos dates ? Confirmation instantanée sur WhatsApp.',
    repliesFast: 'Répond généralement en 5 minutes',
    priceOnRequest: 'Sur Demande',
    askPriceWhatsapp: 'Demander le prix sur WhatsApp',
    priceMsg: 'Salam RIHANA DREAMS CARS, bghit n3ref taman dyal {car}',
    carMsg: 'Salam RIHANA DREAMS CARS, bghit n3ref wach {car} disponible?',
    photo: 'photo',
    seats: 'Places',
    gearbox: 'Boîte',
    fuel: 'Carburant',
    's:Manual': 'Manuelle',
    's:Automatic': 'Automatique',
    's:Petrol': 'Essence',
    's:Diesel': 'Diesel',
    's:Hybrid': 'Hybride',
    's:Electric': 'Électrique',
    'f:7 Seats': '7 places',
    'f:Roof Rails': 'Barres de toit',
    'f:Full Insurance': 'Assurance complète',
    'f:Raised Suspension': 'Suspension surélevée',
    'f:Economy': 'Économique',
    'f:City Perfect': 'Idéale en ville',
    'f:Panoramic Roof': 'Toit panoramique',
    'f:AWD Available': 'AWD disponible',
    'f:Adaptive Cruise': 'Régulateur adaptatif',
    'f:Spacious Boot': 'Grand coffre',
    'f:Long Haul Ready': 'Prête pour les longs trajets',
    'f:Desert Tested': 'Testée dans le désert',
    'f:Latest Model': 'Dernier modèle',
    'f:Comfort Seats': 'Sièges confort',
    'f:All-Terrain': 'Tout-terrain',
    'f:Premium Sound': 'Son premium',
    'f:Sport Mode': 'Mode Sport',
    'f:Sport Seats': 'Sièges sport',
    'b:dacia-jogger': '7 places, une grande famille, zéro stress.',
    'b:dacia-sandero-stepway': 'Surélevée, robuste, prête pour la route.',
    'b:peugeot-208': 'Lignes affûtées, conduite souple, de la ville à la côte.',
    'b:vw-tiguan': "La précision allemande, avec de l'espace à revendre.",
    'b:hyundai-tucson': 'Un design audacieux, serein sur tous les types de routes.',
    'b:dacia-logan-green': 'La fidèle monture qui ne vous laisse jamais tomber.',
    'b:dacia-logan-blanc': 'Sobre, simple, conçue pour le long bitume vers le sud.',
    'b:renault-talian': 'La toute dernière Renault, réglée pour la distance.',
    'b:range-rover-evoque': 'Une puissance raffinée pour les lacets et la neige.',
    'b:porsche-macan': "L'âme d'une voiture de sport dans un corps de SUV.",
    'b:vw-golf-r': 'Le frisson de la transmission intégrale sur les routes de montagne.',

    // Expérience
    experienceTitle: "L'Expérience",
    twoRoadsSouth: 'Deux routes vers le sud',
    altBelbala: "L'expérience du désert Belbala",
    altAtlas: "L'expérience des montagnes de l'Atlas",
    belbalaTitle: "Belbala — Vers l'Erg",
    belbalaText:
      "Au sud de Ouarzazate, le bitume s'efface et le Sahara commence. Belbala rend hommage à ce seuil — les dernières palmeraies avant que les dunes de l'Erg Chebbi n'avalent l'horizon. Chaque voyage traverse des villages berbères et des kasbahs dorées par le soleil, jusqu'à un silence assez profond pour entendre son propre cœur battre.",
    atlasTitle: 'Atlas — Au-dessus des Nuages',
    atlasText:
      "Enneigé en hiver, fleuri au printemps, le Haut Atlas est la colonne vertébrale du Maroc. Virage après virage, vous grimpez devant des hameaux amazighs accrochés à la falaise, thé à la menthe servi en terrasse face à des vallées sculptées depuis des millénaires. C'est la route qui vous rappelle pourquoi vous êtes venu.",

    // Pourquoi nous
    trustTitle: 'Pourquoi RIHANA DREAMS CARS',
    trustSub: "Parce qu'un rêve mérite d'être traité avec soin.",
    trust1Title: 'Chauffeurs Berbères',
    trust1Text:
      'Des guides locaux qui distinguent la piste du bitume — et connaissent tous les raccourcis.',
    trust2Title: 'Support 24/7',
    trust2Text:
      'Un vrai humain sur WhatsApp, jour et nuit, où que la route vous mène.',
    trust3Title: "Livraison à l'Hôtel",
    trust3Text:
      'Riad à Marrakech ou camp à Merzouga — on vient à vous, clés en main.',
    trust4Title: 'Assurance Complète',
    trust4Text:
      'Une couverture complète sur chaque véhicule : le seul risque est de tomber amoureux du désert.',

    // Article
    share: 'Partager',
    shareOn: 'Partager sur',
    copyLink: 'Copier le lien',
    recommendedVehicles: 'Véhicules Recommandés',
    forThisTrip: 'Pour Cette Escapade',
    articleFrOnly: '',

    // Contact & formulaire
    contactTitle: 'Contact',
    contactSub:
      "Dites-nous vos dates et où la route vous mène. Un vrai humain répond sur WhatsApp, jour et nuit.",
    whatsapp: 'WhatsApp',
    phone: 'Téléphone',
    location: 'Marrakech, Maroc',
    whatsappMainLabel: 'WhatsApp principal',
    secondaryLabel: 'Secondaire',
    whatsapp2: 'WhatsApp 2',
    ctaWhatsapp: 'Réserver sur WhatsApp',
    ctaCall: 'Appeler maintenant',
    fullName: 'Nom complet',
    namePlaceholder: 'Nom et prénom',
    pickupDate: 'Date de départ',
    returnDate: 'Date de retour',
    whatsappNumber: 'Numéro WhatsApp',
    send: 'Envoyer la demande',
    messageLabel: 'Message',
    messagePlaceholder: 'Vos dates, votre trajet, la voiture souhaitée…',
    sendMessage: 'Envoyer le message',
    messageSent: 'Message envoyé. Nous vous répondons très vite.',
    messageError: "Le message n'a pas pu être envoyé. Réessayez ou écrivez-nous sur WhatsApp.",
    bookingMsg:
      'Bonjour RIHANA DREAMS CARS ! Je souhaite vérifier la disponibilité de la *{car}*.\n\nNom : {name}\nDépart : {pickup}\nRetour : {ret}\nMon WhatsApp : {whatsapp}',

    // Footer
    footerTagline: 'Une porte de luxe vers le désert marocain.',
    footerRights: 'Tous droits réservés.',
    footerRegions: 'Marrakech · Merzouga · Haut Atlas',
  },

  // =========================================================================
  // ENGLISH
  // =========================================================================
  en: {
    navHome: 'Home',
    navFleet: 'Fleet',
    navExperience: 'Experience',
    navWhy: 'Why us',
    navContact: 'Contact',
    navBook: 'Book your ride',
    navigation: 'Navigation',
    menu: 'Menu',
    close: 'Close',
    language: 'Language',

    bookYourDream: 'Book Your Dream',
    heroTitle1: 'NOT JUST A CAR.',
    heroTitle2: "IT'S YOUR DESERT DREAM.",
    heroTitleFull: 'WHERE TO NEXT?',
    heroHeadlinePlain: 'WHERE TO',
    heroHeadlineAccent: 'NEXT?',
    heroSub:
      'Luxury car rental & authentic Moroccan desert experiences — Marrakech, Merzouga & the High Atlas.',
    heroSubtitle: "Pick your journey and we'll take care of everything else.",
    heroCta: 'Explore the fleet',
    choose: 'Choose your journey',
    chooseThisTrip: 'Choose this trip',
    carsLabel: 'Cars',
    heroTrust1: 'Full Insurance',
    heroTrust2: '24/7 Support',
    heroTrust3: 'Delivery & Pickup',
    heroTrust4: 'Free Cancellation (48h)',

    // Booking widget (Hero)
    widgetLocationLabel: 'Pick-up Location',
    widgetLocationAirport: 'Marrakech-Menara Airport',
    widgetLocationCity: 'Marrakech City Center',
    widgetLocationMerzouga: 'Merzouga',
    widgetLocationOuarzazate: 'Ouarzazate',
    widgetLocationAtlas: 'High Atlas',
    widgetPickupDateLabel: 'Pick-up Date',
    widgetReturnDateLabel: 'Return Date',
    widgetSearchButton: 'Search',
    widgetSearchMsg:
      'Salam RIHANA DREAMS CARS, bghit n3ref wach voiture disponible du {date1} au {date2} à {lieu}?',

    family: 'FAMILY',
    familySub: 'Family Trip',
    familyBlurb: 'Comfort, safety and space for everyone.',
    belbala: 'BELBALA',
    belbalaSub: 'Desert Trip',
    belbalaBlurb: 'Adventure vibes and memories that last.',
    atlas: 'ATLAS',
    atlasSub: 'Mountain Trip',
    atlasBlurb: 'Stunning nature, clear roads, real adventure.',
    collectionTitle: '{name} Collection',
    vehiclesCollection: '{n} Vehicles / One Collection',
    collectionSubFamily:
      'Comfort, safety and space for everyone. Four cars, chosen for the whole family.',
    collectionSubBelbala:
      'Deep desert. Merzouga. Erg Chebbi. Three cars, chosen for the road south.',
    collectionSubAtlas:
      'Switchbacks. Snow peaks. Berber villages. Four cars, chosen for the High Atlas.',

    fleetTitle: 'The Fleet',
    fleetSub: 'Three journeys. One standard of excellence.',
    fleetCount: '{n} Vehicles / 3 Journeys',
    all: 'All',
    backToFleet: 'Back to the fleet',
    checkAvailability: 'Check Availability',
    availabilityQuestion:
      'Is this car available on your dates? Get instant confirmation on WhatsApp.',
    repliesFast: 'Usually replies in 5 minutes',
    priceOnRequest: 'Price on Request',
    askPriceWhatsapp: 'Ask for the price on WhatsApp',
    priceMsg: 'Salam RIHANA DREAMS CARS, bghit n3ref taman dyal {car}',
    carMsg: 'Salam RIHANA DREAMS CARS, bghit n3ref wach {car} disponible?',
    photo: 'photo',
    seats: 'Seats',
    gearbox: 'Gearbox',
    fuel: 'Fuel',
    // Car specs / features / blurbs: English is the source text in data.js,
    // so nothing to add here — `tv` falls back to the original value.

    experienceTitle: 'The Experience',
    twoRoadsSouth: 'Two Roads South',
    altBelbala: 'Belbala desert experience',
    altAtlas: 'Atlas mountains experience',
    belbalaTitle: 'Belbala — Into the Erg',
    belbalaText:
      "South of Ouarzazate, the tarmac fades and the Sahara begins. Belbala is our tribute to that threshold — the last palm groves before Erg Chebbi's dunes swallow the horizon. We route every desert journey through Berber villages, past kasbahs turned to dust-gold by the sun, ending where the silence is loud enough to hear your own heartbeat.",
    atlasTitle: 'Atlas — Above the Clouds',
    atlasText:
      "Snow-capped in winter, wildflower-lined in spring, the High Atlas is Morocco's spine. Hairpin by hairpin, you climb past Amazigh hamlets clinging to the cliffside, mint tea served on terraces overlooking valleys carved over millennia. This is the drive that reminds you why you came.",

    trustTitle: 'Why RIHANA DREAMS CARS',
    trustSub: 'Because a dream deserves to be handled with care.',
    trust1Title: 'Berber Drivers',
    trust1Text:
      'Local guides who know the piste from the tarmac — and every shortcut in between.',
    trust2Title: '24/7 Support',
    trust2Text:
      'A real human on WhatsApp, day or night, wherever the road takes you.',
    trust3Title: 'Hotel Pickup',
    trust3Text:
      'Marrakech riad or Merzouga camp — we come to you, keys in hand.',
    trust4Title: 'Full Insurance',
    trust4Text:
      'Comprehensive cover on every vehicle, so the only risk is falling in love with the desert.',

    share: 'Share',
    shareOn: 'Share on',
    copyLink: 'Copy link',
    recommendedVehicles: 'Recommended Vehicles',
    forThisTrip: 'For This Getaway',
    articleFrOnly: 'This article is currently available in French only.',

    contactTitle: 'Contact',
    contactSub:
      'Tell us your dates and where the road leads. A real human answers on WhatsApp, day or night.',
    whatsapp: 'WhatsApp Us',
    phone: 'Phone',
    location: 'Marrakech, Morocco',
    whatsappMainLabel: 'Main WhatsApp',
    secondaryLabel: 'Secondary',
    whatsapp2: 'WhatsApp 2',
    ctaWhatsapp: 'Book on WhatsApp',
    ctaCall: 'Call now',
    fullName: 'Full Name',
    namePlaceholder: 'John Doe',
    pickupDate: 'Pick-up Date',
    returnDate: 'Return Date',
    whatsappNumber: 'WhatsApp Number',
    send: 'Send Request',
    messageLabel: 'Message',
    messagePlaceholder: 'Your dates, route, preferred car…',
    sendMessage: 'Send message',
    messageSent: 'Message sent. We will reply shortly.',
    messageError: "Your message couldn't be sent. Try again or write to us on WhatsApp.",
    bookingMsg:
      'Hello RIHANA DREAMS CARS! I would like to check availability for the *{car}*.\n\nName: {name}\nPick-up: {pickup}\nReturn: {ret}\nMy WhatsApp: {whatsapp}',

    footerTagline: 'A luxury gateway to the Moroccan desert.',
    footerRights: 'All rights reserved.',
    footerRegions: 'Marrakech · Merzouga · High Atlas',
  },

  // =========================================================================
  // العربية
  // =========================================================================
  ar: {
    navHome: 'الرئيسية',
    navFleet: 'الأسطول',
    navExperience: 'التجربة',
    navWhy: 'لماذا نحن',
    navContact: 'اتصل بنا',
    navBook: 'احجز الآن',
    navigation: 'التنقل',
    menu: 'القائمة',
    close: 'إغلاق',
    language: 'اللغة',

    bookYourDream: 'احجز حلمك',
    heroTitle1: 'ليست مجرد سيارة.',
    heroTitle2: 'إنها حلمك الصحراوي.',
    heroTitleFull: 'إلى أين وجهتك القادمة؟',
    heroHeadlinePlain: 'إلى أين',
    heroHeadlineAccent: 'وجهتك القادمة؟',
    heroSub:
      'كراء سيارات فاخرة وتجارب صحراوية مغربية أصيلة — مراكش ومرزوكة والأطلس الكبير.',
    heroSubtitle: 'اختر رحلتك ونحن نتكفل بالباقي.',
    heroCta: 'اكتشف الأسطول',
    choose: 'اختر رحلتك',
    chooseThisTrip: 'اختر هذه الرحلة',
    carsLabel: 'سيارات',
    heroTrust1: 'تأمين شامل',
    heroTrust2: 'دعم 24/7',
    heroTrust3: 'التسليم والاستلام',
    heroTrust4: 'إلغاء مجاني (48 ساعة)',

    // ودجت الحجز (الهيرو)
    widgetLocationLabel: 'مكان الاستلام',
    widgetLocationAirport: 'مطار مراكش المنارة',
    widgetLocationCity: 'وسط مدينة مراكش',
    widgetLocationMerzouga: 'مرزوكة',
    widgetLocationOuarzazate: 'ورزازات',
    widgetLocationAtlas: 'الأطلس الكبير',
    widgetPickupDateLabel: 'تاريخ الاستلام',
    widgetReturnDateLabel: 'تاريخ الإرجاع',
    widgetSearchButton: 'بحث',
    widgetSearchMsg:
      'Salam RIHANA DREAMS CARS, bghit n3ref wach voiture disponible du {date1} au {date2} à {lieu}?',

    family: 'العائلة',
    familySub: 'رحلة عائلية',
    familyBlurb: 'راحة وأمان ومساحة للجميع.',
    belbala: 'بلبالة',
    belbalaSub: 'رحلة الصحراء',
    belbalaBlurb: 'أجواء المغامرة وذكريات لا تُنسى.',
    atlas: 'أطلس',
    atlasSub: 'رحلة الجبال',
    atlasBlurb: 'طبيعة خلابة وطرق واضحة ومغامرة حقيقية.',
    collectionTitle: 'مجموعة {name}',
    vehiclesCollection: '{n} سيارات / مجموعة واحدة',
    collectionSubFamily:
      'راحة وأمان ومساحة للجميع. أربع سيارات مختارة للعائلة بأكملها.',
    collectionSubBelbala:
      'عمق الصحراء. مرزوكة. عرق الشبي. ثلاث سيارات مختارة لطريق الجنوب.',
    collectionSubAtlas:
      'منعطفات جبلية. قمم مكسوّة بالثلج. قرى أمازيغية. أربع سيارات مختارة للأطلس الكبير.',

    fleetTitle: 'الأسطول',
    fleetSub: 'ثلاث رحلات. معيار واحد من التميّز.',
    fleetCount: '{n} سيارة / 3 رحلات',
    all: 'الكل',
    backToFleet: 'العودة إلى الأسطول',
    checkAvailability: 'تحقق من التوفر',
    availabilityQuestion:
      'هل هذه السيارة متاحة في تواريخك؟ احصل على تأكيد فوري عبر واتساب.',
    repliesFast: 'نرد عادةً خلال 5 دقائق',
    priceOnRequest: 'الثمن عند الطلب',
    askPriceWhatsapp: 'اطلب الثمن عبر واتساب',
    priceMsg: 'Salam RIHANA DREAMS CARS, bghit n3ref taman dyal {car}',
    carMsg: 'Salam RIHANA DREAMS CARS, bghit n3ref wach {car} disponible?',
    photo: 'صورة',
    seats: 'مقاعد',
    gearbox: 'ناقل الحركة',
    fuel: 'الوقود',
    's:Manual': 'يدوي',
    's:Automatic': 'أوتوماتيك',
    's:Petrol': 'بنزين',
    's:Diesel': 'ديزل',
    's:Hybrid': 'هجين',
    's:Electric': 'كهربائية',
    'f:7 Seats': '7 مقاعد',
    'f:Roof Rails': 'قضبان سقف',
    'f:Full Insurance': 'تأمين شامل',
    'f:Raised Suspension': 'تعليق مرتفع',
    'f:Economy': 'اقتصادية',
    'f:City Perfect': 'مثالية للمدينة',
    'f:Panoramic Roof': 'سقف بانورامي',
    'f:AWD Available': 'دفع رباعي متوفر',
    'f:Adaptive Cruise': 'مثبّت سرعة تكيّفي',
    'f:Spacious Boot': 'صندوق واسع',
    'f:Long Haul Ready': 'جاهزة للمسافات الطويلة',
    'f:Desert Tested': 'مجرّبة في الصحراء',
    'f:Latest Model': 'أحدث طراز',
    'f:Comfort Seats': 'مقاعد مريحة',
    'f:All-Terrain': 'لجميع التضاريس',
    'f:Premium Sound': 'نظام صوت فاخر',
    'f:Sport Mode': 'وضع رياضي',
    'f:Sport Seats': 'مقاعد رياضية',
    'b:dacia-jogger': '7 مقاعد، عائلة كبيرة، وبلا أي توتر.',
    'b:dacia-sandero-stepway': 'مرتفعة وقوية وجاهزة للطريق المفتوح.',
    'b:peugeot-208': 'خطوط أنيقة وقيادة سلسة، من المدينة إلى الساحل.',
    'b:vw-tiguan': 'دقة ألمانية مع مساحة رحبة.',
    'b:hyundai-tucson': 'تصميم جريء وهدوء على كل أنواع الطرق.',
    'b:dacia-logan-green': 'السيارة العملية التي لا تخذلك أبدًا.',
    'b:dacia-logan-blanc': 'أنيقة وبسيطة، صُنعت للطريق الطويل نحو الجنوب.',
    'b:renault-talian': 'أحدث سيارات رونو، مهيّأة للمسافات الطويلة.',
    'b:range-rover-evoque': 'قوة راقية للمنعطفات الجبلية والثلوج.',
    'b:porsche-macan': 'روح سيارة رياضية في جسد سيارة دفع رباعي.',
    'b:vw-golf-r': 'متعة الدفع الرباعي على الطرق الجبلية.',

    experienceTitle: 'التجربة',
    twoRoadsSouth: 'طريقان نحو الجنوب',
    altBelbala: 'تجربة صحراء بلبالة',
    altAtlas: 'تجربة جبال الأطلس',
    belbalaTitle: 'بلبالة — نحو العرق',
    belbalaText:
      'جنوب ورزازات يتلاشى الإسفلت وتبدأ الصحراء الكبرى. بلبالة هي تحيتنا لتلك العتبة — آخر واحات النخيل قبل أن تبتلع كثبان عرق الشبي الأفق. نمرّ في كل رحلة صحراوية بقرى أمازيغية وقصبات صبغتها الشمس بلون الذهب الترابي، لنصل إلى حيث يكون الصمت عاليًا بما يكفي لتسمع نبض قلبك.',
    atlasTitle: 'الأطلس — فوق الغيوم',
    atlasText:
      'مكسوٌّ بالثلوج في الشتاء ومزدان بأزهار الربيع، الأطلس الكبير هو عمود المغرب الفقري. منعطفًا بعد منعطف، تصعد بمحاذاة مداشر أمازيغية متشبثة بالجرف، وكؤوس الشاي بالنعناع تُقدَّم على شرفات تطل على أودية نحتها الزمن منذ آلاف السنين. إنها الطريق التي تذكّرك لماذا جئت.',

    trustTitle: 'لماذا RIHANA DREAMS CARS',
    trustSub: 'لأن الحلم يستحق أن يُعتنى به.',
    trust1Title: 'سائقون أمازيغ',
    trust1Text:
      'مرشدون محليون يعرفون المسالك الترابية من الطريق المعبّد — وكل اختصار بينهما.',
    trust2Title: 'دعم على مدار الساعة',
    trust2Text: 'شخص حقيقي على واتساب ليلًا ونهارًا، أينما قادتك الطريق.',
    trust3Title: 'التسليم في الفندق',
    trust3Text:
      'رياض في مراكش أو مخيم في مرزوكة — نأتي إليك والمفاتيح بين يديك.',
    trust4Title: 'تأمين شامل',
    trust4Text:
      'تغطية شاملة لكل سيارة، فلا خطر سوى أن تقع في حب الصحراء.',

    share: 'مشاركة',
    shareOn: 'مشاركة عبر',
    copyLink: 'نسخ الرابط',
    recommendedVehicles: 'سيارات موصى بها',
    forThisTrip: 'لهذه الرحلة',
    articleFrOnly: 'هذا المقال متوفر حاليًا باللغة الفرنسية فقط.',

    contactTitle: 'اتصل بنا',
    contactSub:
      'أخبرنا بتواريخك وإلى أين تأخذك الطريق. شخص حقيقي يردّ عليك على واتساب، ليلًا ونهارًا.',
    whatsapp: 'واتساب',
    phone: 'الهاتف',
    location: 'مراكش، المغرب',
    whatsappMainLabel: 'واتساب رئيسي',
    secondaryLabel: 'ثانوي',
    whatsapp2: 'واتساب 2',
    ctaWhatsapp: 'احجز عبر واتساب',
    ctaCall: 'اتصل الآن',
    fullName: 'الاسم الكامل',
    namePlaceholder: 'الاسم الكامل',
    pickupDate: 'تاريخ الاستلام',
    returnDate: 'تاريخ الإرجاع',
    whatsappNumber: 'رقم واتساب',
    send: 'إرسال الطلب',
    messageLabel: 'الرسالة',
    messagePlaceholder: 'تواريخك، وجهتك، السيارة المفضلة…',
    sendMessage: 'إرسال الرسالة',
    messageSent: 'تم إرسال رسالتك. سنردّ عليك قريبًا.',
    messageError: 'تعذّر إرسال رسالتك. حاول مرة أخرى أو راسلنا عبر واتساب.',
    bookingMsg:
      'مرحبًا RIHANA DREAMS CARS! أرغب في التحقق من توفر السيارة *{car}*.\n\nالاسم: {name}\nتاريخ الاستلام: {pickup}\nتاريخ الإرجاع: {ret}\nرقم واتساب: {whatsapp}',

    footerTagline: 'بوابة فاخرة نحو الصحراء المغربية.',
    footerRights: 'جميع الحقوق محفوظة.',
    footerRegions: 'مراكش · مرزوكة · الأطلس الكبير',
  },
}

// Dotted keys from the brief → the flat key that holds the string.
const ALIASES = {
  'nav.home': 'navHome',
  'nav.fleet': 'navFleet',
  'nav.blog': 'navWhy',
  'nav.contact': 'navContact',
  'hero.title': 'heroTitleFull',
  'hero.subtitle': 'heroSubtitle',
  'hero.cta': 'heroCta',
  'fleet.title': 'fleetTitle',
  'contact.title': 'contactTitle',
  'footer.rights': 'footerRights',
  'cta.whatsapp': 'ctaWhatsapp',
  'cta.call': 'ctaCall',
  'categories.belbala': 'belbala',
  'categories.atlas': 'atlas',
  'categories.family': 'family',
}

const isLang = (l) => LANGUAGES.some((x) => x.code === l)

const LangContext = createContext(null)

export function LangProvider({ children }) {
  const [lang, setLangState] = useState(DEFAULT_LANG)
  const [ready, setReady] = useState(false)

  // Restore the saved language once, after hydration (so server and first
  // client render both use the French default and never mismatch).
  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY)
      if (isLang(saved)) setLangState(saved)
    } catch {
      /* storage blocked (private mode…) — stay on the default */
    }
    setReady(true)
  }, [])

  // Keep <html> in sync: lang, dir (RTL for Arabic) and the Arabic font class.
  useEffect(() => {
    if (!ready) return
    const root = document.documentElement
    root.lang = lang
    root.dir = lang === 'ar' ? 'rtl' : 'ltr'
    root.classList.toggle('font-arabic', lang === 'ar')
  }, [lang, ready])

  const setLang = useCallback((next) => {
    if (!isLang(next)) return
    setLangState(next)
    try {
      window.localStorage.setItem(STORAGE_KEY, next)
    } catch {
      /* ignore */
    }
  }, [])

  const value = useMemo(() => {
    const table = dict[lang]
    const lookup = (key) => table[key] ?? dict.en[key] ?? dict.fr[key]
    return {
      lang,
      setLang,
      dir: lang === 'ar' ? 'rtl' : 'ltr',
      // t('navFleet') or t('nav.fleet')
      t: (key) => lookup(ALIASES[key] ?? key) ?? key,
      // Translate a value coming from data.js (spec, feature, car blurb).
      // tv('s', 'Manual') · tv('f', 'Full Insurance') · tv('b', car.slug, car.blurb)
      tv: (prefix, value, fallback = value) => table[`${prefix}:${value}`] ?? fallback,
      // Fill {placeholders} in a translated string.
      tf: (key, vars = {}) =>
        (lookup(ALIASES[key] ?? key) ?? key).replace(/\{(\w+)\}/g, (_, k) => vars[k] ?? ''),
    }
  }, [lang, setLang])

  return <LangContext.Provider value={value}>{children}</LangContext.Provider>
}

export function useLang() {
  const ctx = useContext(LangContext)
  if (!ctx) throw new Error('useLang must be used within LangProvider')
  return ctx
}
