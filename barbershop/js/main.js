/**
 * Eldo Carmo Barber Shop
 * Cart + Navigation + Contact form
 */

document.addEventListener('DOMContentLoaded', () => {
  // ---------- Elements ----------
  const hamburger = document.getElementById('hamburger');
  const cartBtn = document.getElementById('cart-btn');
  const cartDrawer = document.getElementById('cart-drawer');
  const cartOverlay = document.getElementById('cart-overlay');
  const cartClose = document.getElementById('cart-close');
  const cartItemsEl = document.getElementById('cart-items');
  const cartCountEl = document.getElementById('cart-count');
  const cartTotalEl = document.getElementById('cart-total');
  const checkoutBtn = document.getElementById('checkout-btn');
  const cartClearBtn = document.getElementById('cart-clear');
  const bookingForm = document.getElementById('booking-form');

  // ---------- State ----------
  let cart = JSON.parse(localStorage.getItem('eldocarmo_cart') || '[]');

  /* ——— CMS: load published catalog and apply texts / services / gallery ——— */
  async function loadAndApplyCms() {
    const defaults = window.ECBARBER_DEFAULTS || {};
    let catalog = defaults;
    const cfg = window.ECBARBER_CONFIG;
    if (cfg && cfg.catalogUrl) {
      try {
        const res = await fetch(cfg.catalogUrl + '?t=' + Date.now());
        if (res.ok) {
          const remote = await res.json();
          catalog = {
            ...defaults,
            ...remote,
            services: Array.isArray(remote.services) ? remote.services : defaults.services,
            gallery: Array.isArray(remote.gallery) ? remote.gallery : defaults.gallery,
            site: { ...(defaults.site || {}), ...(remote.site || {}) }
          };
        }
      } catch (_) {}
    }
    applySiteContent(catalog.site || defaults.site || {});
    renderServices(catalog.services || defaults.services || []);
    renderGallery(catalog.gallery || defaults.gallery || []);
    // Populate booking form service select
    const select = document.getElementById('service');
    if (select && Array.isArray(catalog.services)) {
      const active = catalog.services.filter((s) => s.active !== false).sort((a, b) => (a.order || 0) - (b.order || 0));
      if (active.length) {
        const current = select.value;
        select.innerHTML =
          '<option value="">Seleccione o serviço</option>' +
          active.map((s) => `<option value="${s.name}">${s.name}</option>`).join('');
        if (current) select.value = current;
      }
    }
  }

  function applySiteContent(site) {
    if (!site) return;
    const setText = (key, html) => {
      document.querySelectorAll(`[data-cms="${key}"]`).forEach((el) => {
        if (el.tagName === 'IMG') {
          if (site[key]) el.src = site[key];
          return;
        }
        if (html) el.innerHTML = String(site[key] || '').replace(/\n/g, '<br>');
        else el.textContent = site[key] || el.textContent;
      });
    };
    setText('heroEyebrow');
    setText('heroTitle', true);
    setText('heroSubtitle');
    setText('heroImage');
    setText('manifestoQuote');
    setText('manifestoAttr');
    setText('servicesEyebrow');
    setText('servicesTitle');
    setText('servicesNote');
    setText('experienceEyebrow');
    setText('experienceTitle');
    setText('galleryEyebrow');
    setText('galleryTitle');
    setText('bookingEyebrow');
    setText('bookingTitle');
    setText('minibarEyebrow');
    setText('minibarTitle');
    setText('minibarIntro');
    setText('minibarCardImage');

    const announce = document.querySelector('[data-cms="announce"]');
    if (announce) {
      if (site.announceText) announce.innerHTML = site.announceText;
      if (site.announceHref) announce.href = site.announceHref;
    }
    document.querySelectorAll('[data-cms-href="instagram"]').forEach((a) => {
      if (site.instagram) a.href = site.instagram;
    });
  }

  function renderServices(services) {
    const grid = document.getElementById('services-grid');
    if (!grid) return;
    const list = (services || [])
      .filter((s) => s.active !== false)
      .sort((a, b) => (a.order || 0) - (b.order || 0));
    if (!list.length) return;
    grid.innerHTML = list
      .map(
        (s) => `
      <article class="service-card" data-service="${escapeAttr(s.name)}">
        <div class="service-card__image">
          <img src="${escapeAttr(s.image || '')}" alt="${escapeAttr(s.name)}" loading="lazy">
        </div>
        <div class="service-card__overlay">
          <h3 class="service-card__title">${escapeHtml(s.name)}</h3>
          <p class="service-card__desc">${escapeHtml(s.description || '')}</p>
          <p class="service-card__price">${escapeHtml(s.priceLabel || '')}</p>
          <a href="#agendar" class="btn btn--service agendar-btn">Agendar</a>
        </div>
      </article>`
      )
      .join('');
    // Re-bind agendar buttons
    grid.querySelectorAll('.agendar-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        const card = btn.closest('.service-card');
        const service = card?.dataset.service;
        const select = document.getElementById('service');
        if (service && select) select.value = service;
      });
    });
  }

  function renderGallery(items) {
    const grid = document.getElementById('gallery-grid');
    if (!grid || !items || !items.length) return;
    grid.innerHTML = items
      .map(
        (g) => `
      <div class="gallery-item">
        <img src="${escapeAttr(g.image || '')}" alt="${escapeAttr(g.alt || '')}" loading="lazy">
      </div>`
      )
      .join('');
  }

  function escapeHtml(str) {
    return String(str || '')
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');
  }
  function escapeAttr(str) {
    return String(str || '').replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
  }

  // Apply CMS (defaults immediately, live catalog when available)
  loadAndApplyCms();

  // ---------- Hero: static image only ----------
  const heroStill = document.getElementById('hero-still');
  if (heroStill) {
    heroStill.classList.remove('is-hidden');
  }

  // ---------- Left menu drawer ----------
  const menuDrawer = document.getElementById('menu-drawer');
  const menuOverlay = document.getElementById('menu-overlay');
  const menuClose = document.getElementById('menu-close');

  const openMenu = () => {
    if (!menuDrawer) return;
    menuDrawer.classList.add('is-open');
    menuDrawer.setAttribute('aria-hidden', 'false');
    if (hamburger) {
      hamburger.classList.add('is-active');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    document.body.classList.add('menu-open');
  };

  const closeMenu = () => {
    if (!menuDrawer) return;
    menuDrawer.classList.remove('is-open');
    menuDrawer.setAttribute('aria-hidden', 'true');
    if (hamburger) {
      hamburger.classList.remove('is-active');
      hamburger.setAttribute('aria-expanded', 'false');
    }
    document.body.classList.remove('menu-open');
  };

  if (hamburger) {
    hamburger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (menuDrawer && menuDrawer.classList.contains('is-open')) closeMenu();
      else openMenu();
    });
  }
  if (menuOverlay) menuOverlay.addEventListener('click', closeMenu);
  if (menuClose) menuClose.addEventListener('click', closeMenu);

  if (menuDrawer) {
    menuDrawer.querySelectorAll('.menu-drawer__link').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });
  }

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') closeMenu();
  });

  // ---------- Cart Drawer ----------
  function openCart() {
    cartDrawer.classList.add('is-open');
    cartDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer.classList.remove('is-open');
    cartDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
    const panel = cartDrawer.querySelector('.cart-drawer__panel');
    if (panel) {
      panel.style.transform = '';
      panel.style.transition = '';
    }
  }

  cartBtn?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  // Swipe right to close cart panel (mobile)
  if (cartDrawer) {
    const panel = cartDrawer.querySelector('.cart-drawer__panel');
    let touchStartX = 0;
    let touchCurrentX = 0;
    let isDragging = false;

    panel?.addEventListener('touchstart', (e) => {
      touchStartX = e.touches[0].clientX;
      touchCurrentX = touchStartX;
      isDragging = true;
      panel.style.transition = 'none';
    }, { passive: true });

    panel?.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      touchCurrentX = e.touches[0].clientX;
      const deltaX = touchCurrentX - touchStartX;
      if (deltaX > 0) {
        panel.style.transform = `translateX(${deltaX}px)`;
      }
    }, { passive: true });

    panel?.addEventListener('touchend', () => {
      if (!isDragging) return;
      isDragging = false;
      panel.style.transition = '';
      const deltaX = touchCurrentX - touchStartX;
      if (deltaX > 80) {
        closeCart();
      } else {
        panel.style.transform = '';
      }
    });
  }

  // ---------- Cart Logic ----------
  function saveCart() {
    localStorage.setItem('eldocarmo_cart', JSON.stringify(cart));
    renderCart();
  }

  function addToCart(id, name, price) {
    const existing = cart.find((item) => item.id === id);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, name, price: Number(price), qty: 1 });
    }
    saveCart();
    openCart();
  }

  function changeQty(id, delta) {
    const item = cart.find((i) => i.id === id);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter((i) => i.id !== id);
    }
    saveCart();
  }

  function clearCart() {
    cart = [];
    saveCart();
  }

  function getTotal() {
    return cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  }

  function formatPrice(value) {
    return value.toLocaleString('pt-AO') + ' Kz';
  }

  function renderCart() {
    if (!cartCountEl || !cartTotalEl || !cartItemsEl) return;

    const total = getTotal();
    const count = cart.reduce((sum, item) => sum + item.qty, 0);
    const empty = cart.length === 0;

    cartCountEl.textContent = count;
    cartTotalEl.textContent = formatPrice(total);

    if (checkoutBtn) {
      if (checkoutBtn.tagName === 'A') {
        checkoutBtn.setAttribute('aria-disabled', empty ? 'true' : 'false');
        checkoutBtn.classList.toggle('is-disabled', empty);
      } else {
        checkoutBtn.disabled = empty;
      }
    }
    if (cartClearBtn) cartClearBtn.disabled = empty;

    if (empty) {
      cartItemsEl.innerHTML = `
        <div class="cart-empty">
          <p class="cart-empty__title">O carrinho está vazio</p>
          <p class="cart-empty__text">Explore o Mini-Bar e adicione snacks ou bebidas.</p>
          <a href="minibar.html" class="btn btn--ghost btn--small">Ver Mini-Bar</a>
        </div>`;
      return;
    }

    cartItemsEl.innerHTML = cart
      .map(
        (item) => `
      <div class="cart-item">
        <div class="cart-item__info">
          <h4>${item.name}</h4>
          <p>${formatPrice(item.price * item.qty)}</p>
        </div>
        <div class="cart-item__qty">
          <button type="button" class="cart-item__qty-btn" data-id="${item.id}" data-delta="-1" aria-label="Diminuir">−</button>
          <span class="cart-item__qty-val">${item.qty}</span>
          <button type="button" class="cart-item__qty-btn" data-id="${item.id}" data-delta="1" aria-label="Aumentar">+</button>
        </div>
      </div>
    `
      )
      .join('');

    cartItemsEl.querySelectorAll('.cart-item__qty-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        changeQty(btn.dataset.id, Number(btn.dataset.delta));
      });
    });
  }

  // Add to cart buttons
  document.querySelectorAll('.add-to-cart').forEach((btn) => {
    btn.addEventListener('click', (e) => {
      const card = e.target.closest('.product-card');
      if (!card) return;
      addToCart(card.dataset.id, card.dataset.name, card.dataset.price);
    });
  });

  // Clear cart
  cartClearBtn?.addEventListener('click', () => {
    if (cart.length === 0) return;
    clearCart();
  });

  // Cart drawer CTA → checkout page (prevent if empty)
  if (checkoutBtn) {
    const isLink = checkoutBtn.tagName === 'A';
    if (isLink) {
      checkoutBtn.addEventListener('click', (e) => {
        if (cart.length === 0) {
          e.preventDefault();
          return;
        }
      });
    } else {
      checkoutBtn.addEventListener('click', () => {
        if (cart.length === 0) return;
        window.location.href = 'checkout.html';
      });
    }
  }

  // Initial render
  renderCart();

  // ---------- Checkout page ----------
  const PRODUCT_IMAGES = {
    'scookiie-menta': 'assets/products/scookiie-menta.webp',
    'scookiie-ginguba': 'assets/products/scookiie-ginguba.webp',
    'scookiie-leite': 'assets/products/scookiie-aoleite.webp',
    'agua-pura': 'assets/products/agua-pura.webp',
    'coca-cola': 'assets/products/coca-cola.webp',
    cuca: 'assets/products/cuca.webp',
  };

  const checkoutItemsEl = document.getElementById('checkout-items');
  const checkoutTotalEl = document.getElementById('checkout-total');
  const checkoutEmptyEl = document.getElementById('checkout-empty');
  const checkoutLayoutEl = document.getElementById('checkout-layout');
  const checkoutForm = document.getElementById('checkout-form');

  function renderCheckoutPage() {
    if (!checkoutItemsEl) return;

    const empty = cart.length === 0;

    if (checkoutEmptyEl) checkoutEmptyEl.hidden = !empty;
    if (checkoutLayoutEl) checkoutLayoutEl.hidden = empty;

    if (empty) {
      if (checkoutTotalEl) checkoutTotalEl.textContent = formatPrice(0);
      checkoutItemsEl.innerHTML = '';
      return;
    }

    if (checkoutTotalEl) checkoutTotalEl.textContent = formatPrice(getTotal());

    checkoutItemsEl.innerHTML = cart
      .map((item) => {
        const img = PRODUCT_IMAGES[item.id] || 'assets/images/eldocarmologo.webp';
        return `
      <div class="checkout-item" data-id="${item.id}">
        <div class="checkout-item__image">
          <img src="${img}" alt="" loading="lazy">
        </div>
        <div class="checkout-item__info">
          <h3 class="checkout-item__name">${item.name}</h3>
          <p class="checkout-item__unit">${formatPrice(item.price)} / un.</p>
          <div class="checkout-item__row">
            <div class="cart-item__qty">
              <button type="button" class="cart-item__qty-btn checkout-qty-btn" data-id="${item.id}" data-delta="-1" aria-label="Diminuir">−</button>
              <span class="cart-item__qty-val">${item.qty}</span>
              <button type="button" class="cart-item__qty-btn checkout-qty-btn" data-id="${item.id}" data-delta="1" aria-label="Aumentar">+</button>
            </div>
            <p class="checkout-item__line">${formatPrice(item.price * item.qty)}</p>
          </div>
        </div>
      </div>`;
      })
      .join('');

    checkoutItemsEl.querySelectorAll('.checkout-qty-btn').forEach((btn) => {
      btn.addEventListener('click', () => {
        changeQty(btn.dataset.id, Number(btn.dataset.delta));
        renderCheckoutPage();
      });
    });
  }

  renderCheckoutPage();

  // Keep checkout summary in sync when qty changes in the cart drawer
  if (checkoutItemsEl && cartItemsEl) {
    cartItemsEl.addEventListener('click', (e) => {
      if (e.target.closest('.cart-item__qty-btn')) {
        setTimeout(renderCheckoutPage, 0);
      }
    });
  }

  checkoutForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;

    const name = document.getElementById('co-name')?.value.trim() || '';
    const phone = document.getElementById('co-phone')?.value.trim() || '';
    const pickup = document.getElementById('co-pickup')?.value || 'levantamento';
    const notes = document.getElementById('co-notes')?.value.trim() || '';
    const submitBtn = document.getElementById('checkout-submit');
    const hint = document.querySelector('.checkout-form__hint');

    if (!name || !phone) {
      if (!name) document.getElementById('co-name')?.focus();
      else document.getElementById('co-phone')?.focus();
      return;
    }

    const pickupLabel =
      pickup === 'entrega' ? 'Entrega' : 'Levantamento no V17 (Kilamba)';
    const subtotal = getTotal();
    const order = {
      id: 'ord_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      createdAt: new Date().toISOString(),
      status: 'pending',
      customer: { name, phone, address: pickupLabel, notes },
      zone: pickup === 'entrega' ? { id: 'entrega', name: 'Entrega', fee: 0 } : { id: 'levantamento', name: 'Levantamento', fee: 0 },
      items: cart.map((i) => ({ id: i.id, name: i.name, price: i.price, qty: i.qty })),
      subtotal,
      deliveryFee: 0,
      total: subtotal,
      currency: 'Kz',
      source: 'minibar'
    };

    const CONFIG = window.ECBARBER_CONFIG || {};
    if (CONFIG.workerUrl) {
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.textContent = 'A enviar…';
      }
      try {
        const res = await fetch(CONFIG.workerUrl.replace(/\/$/, '') + '/order', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(order)
        });
        if (!res.ok) throw new Error('Order failed');
        cart.length = 0;
        saveCart();
        renderCart();
        if (typeof renderCheckoutPage === 'function') renderCheckoutPage();
        if (hint) hint.textContent = 'Encomenda recebida! Entraremos em contacto em breve.';
        checkoutForm.reset();
        setTimeout(() => { window.location.href = 'minibar.html'; }, 1600);
      } catch (err) {
        console.error(err);
        if (hint) hint.textContent = 'Não foi possível enviar. Tente novamente ou use WhatsApp.';
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.textContent = 'Enviar pedido';
        }
      }
      return;
    }

    // Fallback: WhatsApp (until Worker is configured)
    const lines = cart.map(
      (item) => `• ${item.name} × ${item.qty} — ${formatPrice(item.price * item.qty)}`
    );
    const total = formatPrice(subtotal);
    let message =
      `Olá! Gostaria de encomendar os seguintes produtos da Eldo Carmo Mini-Bar:\n\n` +
      `${lines.join('\n')}\n\n` +
      `Total: ${total}\n\n` +
      `Nome: ${name}\n` +
      `Telefone: ${phone}\n` +
      `Entrega: ${pickupLabel}`;
    if (notes) message += `\nNotas: ${notes}`;
    message += `\n\nObrigado!`;
    window.open(`https://wa.me/244923929074?text=${encodeURIComponent(message)}`, '_blank');
  });

  // ---------- Service card → pre-fill booking ----------
  document.querySelectorAll('.agendar-btn').forEach((btn) => {
    btn.addEventListener('click', () => {
      const card = btn.closest('.service-card');
      const service = card?.dataset.service;
      const select = document.getElementById('bk-service');
      if (service && select) {
        select.value = service;
      }
    });
  });

  // ---------- Booking Form → Admin API ----------
  bookingForm?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const name = document.getElementById('bk-name').value.trim();
    const phone = document.getElementById('bk-phone').value.trim();
    const people = document.getElementById('bk-people').value.trim();
    const service = document.getElementById('bk-service').value;
    const date = document.getElementById('bk-date').value;
    const time = document.getElementById('bk-time').value;
    const message = document.getElementById('bk-message').value.trim();

    if (!name || !service || !date || !time) return;

    const submitBtn = bookingForm.querySelector('button[type="submit"]');
    const originalLabel = submitBtn ? submitBtn.textContent : '';
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.textContent = 'A enviar…';
    }

    const booking = {
      id: 'bk_' + Date.now() + '_' + Math.random().toString(36).slice(2, 8),
      type: 'booking',
      status: 'pending',
      createdAt: new Date().toISOString(),
      customer: { name, phone: phone || '' },
      people: people ? Number(people) : null,
      service,
      date,
      time,
      notes: message || ''
    };

    const workerUrl = (window.ECBARBER_CONFIG && window.ECBARBER_CONFIG.workerUrl) || '';
    let ok = false;

    if (workerUrl) {
      try {
        const res = await fetch(workerUrl.replace(/\/$/, '') + '/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(booking)
        });
        ok = res.ok;
      } catch (err) {
        console.warn('Booking API', err);
      }
    }

    if (!ok) {
      // Fallback: store locally so staff can still see it if they open admin on this browser
      try {
        const key = 'ecbarber_bookings_local';
        const list = JSON.parse(localStorage.getItem(key) || '[]');
        list.unshift(booking);
        localStorage.setItem(key, JSON.stringify(list.slice(0, 100)));
      } catch (_) {}
    }

    bookingForm.reset();
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = originalLabel;
    }
    alert(
      ok
        ? 'Pedido de agendamento enviado! A equipa confirma em breve.'
        : workerUrl
          ? 'Não foi possível enviar agora. Tente novamente dentro de momentos.'
          : 'Pedido guardado localmente. Configure a API para receber agendamentos no painel.'
    );
  });

  // ---------- Experience videos ----------
  document.querySelectorAll('.experience-card').forEach((card) => {
    const video = card.querySelector('.experience-card__video');
    const playBtn = card.querySelector('.experience-card__play');
    if (!video || !playBtn) return;

    // Sound on by default when user plays
    video.muted = false;
    video.volume = 1;

    const toggle = () => {
      if (video.paused) {
        document.querySelectorAll('.experience-card__video').forEach((v) => {
          if (v !== video) {
            v.pause();
            v.closest('.experience-card')?.classList.remove('is-playing');
          }
        });
        video.muted = false;
        video.volume = 1;
        const playPromise = video.play();
        if (playPromise && typeof playPromise.then === 'function') {
          playPromise.catch(() => {
            // If autoplay policy blocks unmuted, retry once unmuted after gesture (already a click)
            video.muted = false;
            video.play().catch(() => {});
          });
        }
        card.classList.add('is-playing');
      } else {
        video.pause();
        card.classList.remove('is-playing');
      }
    };

    playBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      toggle();
    });

    card.addEventListener('click', () => toggle());

    video.addEventListener('ended', () => {
      card.classList.remove('is-playing');
    });
  });

  // Experience carousel arrows + dots
  const expTrack = document.getElementById('experience-track');
  const expPrev = document.getElementById('experience-prev');
  const expNext = document.getElementById('experience-next');
  const expDotsEl = document.getElementById('experience-dots');

  if (expTrack && expPrev && expNext) {
    const cards = () => [...expTrack.querySelectorAll('.experience-card')];

    const scrollByCard = (dir) => {
      const card = expTrack.querySelector('.experience-card');
      if (!card) return;
      const step = card.offsetWidth + 16;
      expTrack.scrollBy({ left: dir * step, behavior: 'smooth' });
    };

    const getActiveIndex = () => {
      const list = cards();
      if (!list.length) return 0;
      const left = expTrack.scrollLeft;
      let best = 0;
      let bestDist = Infinity;
      list.forEach((card, i) => {
        const dist = Math.abs(card.offsetLeft - left);
        if (dist < bestDist) {
          bestDist = dist;
          best = i;
        }
      });
      return best;
    };

    const updateNav = () => {
      const maxScroll = expTrack.scrollWidth - expTrack.clientWidth - 2;
      expPrev.disabled = expTrack.scrollLeft <= 2;
      expNext.disabled = expTrack.scrollLeft >= maxScroll;
      if (expDotsEl) {
        const active = getActiveIndex();
        expDotsEl.querySelectorAll('.experience-dot').forEach((d, i) => {
          d.classList.toggle('is-active', i === active);
        });
      }
    };

    if (expDotsEl) {
      cards().forEach((_, i) => {
        const btn = document.createElement('button');
        btn.type = 'button';
        btn.className = 'experience-dot' + (i === 0 ? ' is-active' : '');
        btn.setAttribute('aria-label', 'Vídeo ' + (i + 1));
        btn.addEventListener('click', () => {
          const list = cards();
          if (!list[i]) return;
          expTrack.scrollTo({ left: list[i].offsetLeft, behavior: 'smooth' });
        });
        expDotsEl.appendChild(btn);
      });
    }

    expPrev.addEventListener('click', () => scrollByCard(-1));
    expNext.addEventListener('click', () => scrollByCard(1));
    expTrack.addEventListener('scroll', updateNav, { passive: true });
    window.addEventListener('resize', updateNav);
    updateNav();
  }

  // Close menu drawer when tapping Agendar CTA
  document.querySelectorAll('.menu-drawer__agendar, .menu-drawer__link[href^="#"]').forEach((link) => {
    link.addEventListener('click', () => {
      const drawer = document.getElementById('menu-drawer');
      if (drawer && drawer.classList.contains('is-open')) {
        document.getElementById('menu-close')?.click();
      }
    });
  });

  // ---------- Header scroll: transparent → solid; announce bar only at top ----------
  const header = document.getElementById('header');
  const announceBar = document.querySelector('.announce-bar');
  const onScrollHeader = () => {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 40);
      header.classList.toggle('announce-hidden', y > 20);
    }
    if (announceBar) {
      announceBar.classList.toggle('is-hidden', y > 20);
    }
  };
  window.addEventListener('scroll', onScrollHeader, { passive: true });
  onScrollHeader();
});
