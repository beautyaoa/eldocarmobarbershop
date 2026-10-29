/**
 * Eldo Carmo Barbershop — Default catalog (overridden by live Cloudinary catalog.json)
 * Currency: Kz · Orders / bookings → Cloudflare Worker → KV → Admin panel
 * Staff edit texts, services, gallery & images in Admin → Guardar → Publicar
 */

window.ECBARBER_DEFAULTS = {
  updatedAt: null,
  currency: 'Kz',
  products: [
    {
      id: 'scookiie-menta',
      name: 'Scookiie Menta',
      nameEn: 'Scookiie Mint',
      description: 'Chocolate artesanal com notas refrescantes de menta. 80g · 50% cacau.',
      descriptionEn: 'Artisan chocolate with refreshing mint notes. 80g · 50% cocoa.',
      price: 1500,
      image: 'assets/products/scookiie-menta.webp',
      category: 'chocolate',
      active: true,
      stock: true,
      order: 1
    },
    {
      id: 'scookiie-ginguba',
      name: 'Scookiie Ginguba',
      nameEn: 'Scookiie Peanut',
      description: 'Chocolate com ginguba crocante. 80g · 50% cacau.',
      descriptionEn: 'Chocolate with crunchy peanut. 80g · 50% cocoa.',
      price: 1500,
      image: 'assets/products/scookiie-ginguba.webp',
      category: 'chocolate',
      active: true,
      stock: true,
      order: 2
    },
    {
      id: 'scookiie-leite',
      name: 'Scookiie Ao Leite',
      nameEn: 'Scookiie Milk',
      description: 'Chocolate ao leite cremoso. 80g · 50% cacau.',
      descriptionEn: 'Creamy milk chocolate. 80g · 50% cocoa.',
      price: 1500,
      image: 'assets/products/scookiie-aoleite.webp',
      category: 'chocolate',
      active: true,
      stock: true,
      order: 3
    },
    {
      id: 'agua-pura',
      name: 'Água Pura',
      nameEn: 'Pure Water',
      description: 'Água pura 330ml.',
      descriptionEn: 'Pure water 330ml.',
      price: 500,
      image: 'assets/products/agua-pura.webp',
      category: 'bebida',
      active: true,
      stock: true,
      order: 4
    },
    {
      id: 'coca-cola',
      name: 'Coca-Cola',
      nameEn: 'Coca-Cola',
      description: 'Coca-Cola 350ml.',
      descriptionEn: 'Coca-Cola 350ml.',
      price: 700,
      image: 'assets/products/coca-cola.webp',
      category: 'bebida',
      active: true,
      stock: true,
      order: 5
    },
    {
      id: 'cuca',
      name: 'Cuca',
      nameEn: 'Cuca',
      description: 'Cerveja Cuca.',
      descriptionEn: 'Cuca beer.',
      price: 800,
      image: 'assets/products/cuca.webp',
      category: 'bebida',
      active: true,
      stock: true,
      order: 6
    }
  ],
  /* Homepage haircut / barber services (editable in Admin → Serviços) */
  services: [
    {
      id: 'corte-classico',
      name: 'Corte Clássico',
      description: 'Corte tradicional com acabamento preciso e atenção aos detalhes.',
      priceLabel: 'A partir de 2.500 Kz',
      image: 'assets/images/service-classico.webp',
      active: true,
      order: 1
    },
    {
      id: 'corte-barba',
      name: 'Corte + Barba',
      description: 'Combinação completa para um visual impecável e bem cuidado.',
      priceLabel: 'A partir de 4.000 Kz',
      image: 'assets/images/service-corte-barba.webp',
      active: true,
      order: 2
    },
    {
      id: 'fade',
      name: 'Fade / Degradê',
      description: 'Transições suaves e modernas, do baixo ao médio e alto fade.',
      priceLabel: 'A partir de 3.000 Kz',
      image: 'assets/images/service-fade.webp',
      active: true,
      order: 3
    },
    {
      id: 'design',
      name: 'Design & Desenhos',
      description: 'Linhas, padrões e arte no cabelo com precisão artística.',
      priceLabel: 'A partir de 3.000 Kz',
      image: 'assets/images/service-design.webp',
      active: true,
      order: 4
    },
    {
      id: 'trancas',
      name: 'Tranças & Twists',
      description: 'Estilos protegidos e elegantes para todas as idades.',
      priceLabel: 'Consultar',
      image: 'assets/images/service-trancas.webp',
      active: true,
      order: 5
    },
    {
      id: 'barboterapia',
      name: 'Barboterapia',
      description: 'Tratamento completo de barba com toalha quente e produtos premium.',
      priceLabel: 'A partir de 2.000 Kz',
      image: 'assets/images/service-barba.webp',
      active: true,
      order: 6
    }
  ],
  /* Gallery images (Admin → Galeria) */
  gallery: [
    { id: 'g1', image: 'assets/images/gallery-01.webp', alt: 'Corte cacheado loiro — Eldo Carmo Barber Shop' },
    { id: 'g2', image: 'assets/images/gallery-02.webp', alt: 'Fade com cabelo cacheado loiro' },
    { id: 'g3', image: 'assets/images/gallery-03.webp', alt: 'Corte infantil com design' },
    { id: 'g4', image: 'assets/images/gallery-04.webp', alt: 'Cliente e barbeiro — agora tu' },
    { id: 'g5', image: 'assets/images/gallery-05.webp', alt: 'Corte platinado Eldo Carmo' },
    { id: 'g6', image: 'assets/images/gallery-06.webp', alt: 'Johnny Berry no espaço Eldo Carmo' },
    { id: 'g7', image: 'assets/images/gallery-07.webp', alt: 'Tranças e acabamento de barba' }
  ],
  zones: [
    { id: 'v17', name: 'V17 / Maianga', fee: 0, active: true },
    { id: 'ingombota', name: 'Ingombota', fee: 500, active: true },
    { id: 'samba', name: 'Samba', fee: 500, active: true },
    { id: 'rangel', name: 'Rangel', fee: 500, active: true },
    { id: 'sambizanga', name: 'Sambizanga', fee: 700, active: true },
    { id: 'cazenga', name: 'Cazenga', fee: 700, active: true },
    { id: 'kilamba', name: 'Kilamba', fee: 1000, active: true },
    { id: 'talatona', name: 'Talatona', fee: 1000, active: true },
    { id: 'belas', name: 'Belas', fee: 1000, active: true },
    { id: 'viana', name: 'Viana', fee: 1200, active: true },
    { id: 'cacuaco', name: 'Cacuaco', fee: 1200, active: true },
    { id: 'outro', name: 'Outra zona de Luanda', fee: 1500, active: true }
  ],
  /* All public site texts & key images — Admin → Conteúdo */
  site: {
    announceText: 'Já disponível — música Tá Queimar 🔥🔥🔥 · Ouvir no YouTube',
    announceHref: 'https://youtu.be/6vzUPh26JZA?si=xl3FzxXKTsRD6NoC',
    heroEyebrow: 'Luanda · V17 Kilamba',
    heroTitle: 'Chegue.\nSaia impecável.',
    heroSubtitle: 'Cortes premium, ambiente exclusivo e a experiência Eldo Carmo.',
    heroImage: 'assets/images/hero.webp',
    manifestoQuote: 'O seu estilo, com a precisão que ele merece.',
    manifestoAttr: '— Eldo Carmo',
    servicesEyebrow: 'O que fazemos',
    servicesTitle: 'Serviços',
    servicesNote: '* Preços sujeitos a confirmação. Contacte-nos para o valor exacto.',
    experienceEyebrow: 'Por dentro',
    experienceTitle: 'A Experiência Eldo Carmo',
    galleryEyebrow: 'Trabalhos',
    galleryTitle: 'Galeria',
    bookingEyebrow: 'Reservas',
    bookingTitle: 'Agendar corte',
    minibarEyebrow: 'No espaço',
    minibarTitle: 'Mini-Bar',
    minibarIntro: 'Snacks, cocktails e bebidas — incluindo Chocolate Scookiie.',
    minibarCardImage: 'assets/images/minibar-card.webp',
    trust1Value: 'V17',
    trust1Label: 'Kilamba · Luanda',
    trust2Value: '07–22h',
    trust2Label: 'Segunda a Domingo',
    trust3Value: 'Premium',
    trust3Label: 'Cortes & experiência',
    trust4Value: '@eldo_carmo',
    trust4Label: 'Instagram',
    trust4Href: 'https://www.instagram.com/eldo_carmo/',
    footerPhone: '930 095 886',
    footerAddress: 'V17 Kilamba, Luanda',
    footerHours: 'Seg–Dom · 07h–22h',
    footerCopy: '© 2026 Eldo Carmo. Todos os direitos reservados.',
    instagram: 'https://www.instagram.com/eldo_carmo/',
    facebook: 'https://www.facebook.com/EldoCarmoBeleza',
    whatsapp: '244930095886',
    logo: 'assets/images/eldocarmologo.webp'
  },
  texts: {
    pt: {
      heroTitle: 'Eldo Carmo Mini-Bar',
      heroSubtitle: 'Chocolates, bebidas e snacks na barbershop',
      shopCta: 'Ver produtos',
      cartEmpty: 'O carrinho está vazio',
      checkoutTitle: 'Finalizar encomenda',
      orderSuccess: 'Encomenda recebida! Entraremos em contacto em breve.',
      orderError: 'Não foi possível enviar a encomenda. Tente novamente.'
    },
    en: {
      heroTitle: 'Eldo Carmo Mini-Bar',
      heroSubtitle: 'Chocolates, drinks and snacks at the barbershop',
      shopCta: 'Shop products',
      cartEmpty: 'Your cart is empty',
      checkoutTitle: 'Checkout',
      orderSuccess: 'Order received! We will contact you soon.',
      orderError: 'Could not submit the order. Please try again.'
    }
  },
  images: {
    logo: 'assets/images/eldocarmologo.webp',
    hero: 'assets/images/minibar-hero.webp'
  }
};

window.ECBARBER_CONFIG = {
  cloudName: 'gyssk0cm',
  unsignedPreset: 'ecbarbershop_unsigned',
  catalogFolder: 'ecbarbershop',
  catalogPublicId: 'ecbarbershop/catalog',
  workerUrl: 'https://eldocarmobarbershop-api.beautyaoa.workers.dev',
  get catalogUrl() {
    return `https://res.cloudinary.com/${this.cloudName}/raw/upload/${this.catalogFolder}/catalog.json`;
  }
};
