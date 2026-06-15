<template>
  <div class="app-shell">
    <header class="app-header aos-fade-down" v-aos>
      <div class="app-header-inner">
        <div class="brand">
          <span class="brand-symbol">M</span>
          <div>
            <p class="brand-name">Mutama</p>
            <p class="brand-subtitle">Maison de Passage</p>
          </div>
        </div>

        <nav class="app-nav">
          <router-link to="/">Accueil</router-link>
          <router-link to="/reservation">Réserver</router-link>
          <router-link to="/contact">Contact</router-link>
        </nav>

        <button class="mobile-toggle" @click="toggleMenu" aria-label="Ouvrir le menu">
          <span />
        </button>

        <router-link to="/reservation" class="header-cta">Réserver Maintenant</router-link>
      </div>

      <div class="mobile-drawer-backdrop" :class="{ open: mobileMenuOpen }" @click="closeMenu"></div>
      <aside class="mobile-drawer" :class="{ open: mobileMenuOpen }">
        <div class="drawer-header">
          <div>
            <p class="drawer-label">Navigation</p>
            <p class="drawer-subtitle">Mutama</p>
          </div>
          <button class="drawer-close" @click="closeMenu" aria-label="Fermer le menu">×</button>
        </div>
        <nav class="drawer-nav">
          <router-link to="/" @click="closeMenu">Accueil</router-link>
          <router-link to="/reservation" @click="closeMenu">Réserver</router-link>
          <router-link to="/contact" @click="closeMenu">Contact</router-link>
        </nav>
      </aside>
    </header>

    <main class="app-main">
      <router-view />
    </main>

    <footer class="app-footer aos-fade-up" v-aos>
      <div class="app-footer-inner">
        <div class="footer-grid">
          <div>
            <div class="footer-title">
              <span>M</span>
              <span>Mutama</span>
            </div>
            <p class="footer-text">Maison de Passage Mutama</p>
            <p class="footer-text" style="margin-top: 12px;">Votre destination idéale pour un séjour confortable et tranquille.</p>
          </div>

          <div>
            <p class="footer-title">Liens Rapides</p>
            <a class="footer-link" href="/">Accueil</a>
            <a class="footer-link" href="/#maisons">Appartements</a>
            <a class="footer-link" href="/reservation">Réserver</a>
            <a class="footer-link" href="/contact">Contact</a>
          </div>

          <div>
            <p class="footer-title">Nous Contacter</p>
            <p class="footer-contact">+257 XX XXX XXXX</p>
            <p class="footer-contact">contact@mutama.bi</p>
            <p class="footer-contact">Burundi</p>
          </div>
        </div>

        <div class="footer-bottom">© 2026 Mutama. Tous droits réservés.</div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute();
const mobileMenuOpen = ref(false);
const toggleMenu = () => {
  mobileMenuOpen.value = !mobileMenuOpen.value;
};
const closeMenu = () => {
  mobileMenuOpen.value = false;
};

watch(mobileMenuOpen, (value) => {
  document.body.style.overflow = value ? 'hidden' : '';
});

watch(
  () => route.fullPath,
  () => {
    mobileMenuOpen.value = false;
  }
);
</script>

<style>
:root {
  color-scheme: light;
  font-family: Inter, system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  background: #f8fafc;
  color: #111827;
}
* {
  box-sizing: border-box;
}
body {
  margin: 0;
}
.app-shell {
  min-height: 100vh;
  background: #f8fafc;
}
.app-header {
  position: sticky;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 90;
  background: rgba(255, 255, 255, 0.96);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}
.app-header-inner {
  max-width: 1220px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 32px;
}
.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}
.brand-symbol {
  width: 48px;
  height: 48px;
  display: grid;
  place-items: center;
  border-radius: 16px;
  background: #0f172a;
  color: #fff;
  font-weight: 800;
}
.brand-name {
  margin: 0;
  font-weight: 800;
  font-size: 1.05rem;
}
.brand-subtitle {
  margin: 4px 0 0;
  color: #475569;
  font-size: 0.82rem;
}
.app-nav {
  display: flex;
  align-items: center;
  gap: 28px;
}
.app-nav a {
  color: #0f172a;
  text-decoration: none;
  font-weight: 600;
  font-size: 0.96rem;
}
.app-nav a.router-link-active {
  color: #f59e0b;
}
.header-cta {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(90deg, #f59e0b, #fb923c);
  color: #0f172a;
  padding: 14px 24px;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  transition: transform 180ms ease, box-shadow 180ms ease;
}
.header-cta:hover {
  transform: translateY(-1px);
  box-shadow: 0 20px 35px rgba(251, 146, 60, 0.2);
}
.mobile-toggle {
  display: none;
  border: none;
  background: transparent;
  cursor: pointer;
  width: 44px;
  height: 44px;
  align-items: center;
  justify-content: center;
}
.mobile-toggle span,
.mobile-toggle span::before,
.mobile-toggle span::after {
  display: block;
  width: 22px;
  height: 2px;
  background: #0f172a;
  border-radius: 999px;
  position: relative;
}
.mobile-toggle span::before,
.mobile-toggle span::after {
  content: '';
  position: absolute;
  left: 0;
}
.mobile-toggle span::before {
  top: -7px;
}
.mobile-toggle span::after {
  top: 7px;
}
.mobile-drawer-backdrop {
  position: fixed;
  inset: 0;
  z-index: 88;
  background: rgba(15, 23, 42, 0.55);
  opacity: 0;
  visibility: hidden;
  transition: opacity 220ms ease, visibility 220ms ease;
}
.mobile-drawer-backdrop.open {
  opacity: 1;
  visibility: visible;
}
.mobile-drawer {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  width: min(320px, 85vw);
  padding: 32px 24px;
  background: #ffffff;
  box-shadow: -24px 0 80px rgba(15, 23, 42, 0.18);
  z-index: 89;
  transform: translateX(110%);
  transition: transform 280ms ease;
  display: grid;
  gap: 28px;
}
.mobile-drawer.open {
  transform: translateX(0);
}
.drawer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
}
.drawer-label {
  margin: 0;
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.18em;
  color: #f59e0b;
}
.drawer-subtitle {
  margin: 6px 0 0;
  font-weight: 700;
  color: #111827;
}
.drawer-close {
  all: unset;
  cursor: pointer;
  font-size: 1.65rem;
  line-height: 1;
  color: #111827;
}
.drawer-nav {
  display: grid;
  gap: 18px;
}
.drawer-nav a {
  color: #0f172a;
  text-decoration: none;
  font-weight: 700;
  font-size: 1.05rem;
}
.app-main {
  padding: 0;
}
.app-footer {
  padding: 48px 32px;
  color: #f8fafc;
  background: #111827;
}
.app-footer-inner {
  max-width: 1220px;
  margin: 0 auto;
}
.footer-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 24px;
}
.footer-title {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
  color: #fff;
  font-size: 1.25rem;
  font-weight: 800;
}
.footer-title span {
  display: inline-flex;
  width: 34px;
  height: 34px;
  border-radius: 12px;
  background: #f59e0b;
  align-items: center;
  justify-content: center;
  color: #0f172a;
  font-weight: 800;
}
.footer-text,
.footer-link,
.footer-contact {
  color: #cbd5e1;
  line-height: 1.8;
}
.footer-link {
  display: block;
  margin-bottom: 10px;
  color: #cbd5e1;
}
.footer-link:hover {
  color: #f59e0b;
}
.footer-bottom {
  margin-top: 40px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding-top: 24px;
  text-align: center;
  color: #94a3b8;
}
@media (max-width: 1024px) {
  .app-header-inner {
    padding: 18px 24px;
  }
}
@media (max-width: 860px) {
  .app-header-inner {
    flex-direction: column;
    align-items: stretch;
  }
  .app-nav {
    display: none;
  }
  .mobile-toggle {
    display: inline-flex;
  }
  .header-cta {
    display: none;
  }
  .footer-grid {
    grid-template-columns: 1fr;
  }
}
@media (min-width: 861px) {
  .mobile-drawer,
  .mobile-drawer-backdrop {
    display: none !important;
    pointer-events: none;
  }
}
</style>
