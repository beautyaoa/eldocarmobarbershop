/**
 * Eldo Carmo Barbershop Mini-Bar — Default catalog (overridden by live Cloudinary catalog.json)
 * Currency: Kz · Orders → Cloudflare Worker → KV → Admin panel
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

/* ——— Config (public only — secrets live in Worker) ——— */
window.ECBARBER_CONFIG = {
  cloudName: 'gyssk0cm',
  unsignedPreset: 'ecbarbershop_unsigned',
  catalogFolder: 'ecbarbershop',
  catalogPublicId: 'ecbarbershop/catalog',
  // Set after Worker is deployed:
  workerUrl: 'https://eldocarmobarbershop-api.beautyaoa.workers.dev',
  get catalogUrl() {
    return `https://res.cloudinary.com/${this.cloudName}/raw/upload/${this.catalogFolder}/catalog.json`;
  }
};
