<template>
  <div class="app-shell">
    <header class="app-header">
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
    </header>

    <main class="app-main">
      <router-view />
    </main>

    <footer class="app-footer">
      <p>Mutama — simple, professionnel et construit pour l’essentiel.</p>
    </footer>
  </div>
</template>

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
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  padding: 20px 32px;
  background: rgba(255, 255, 255, 0.96);
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
  position: sticky;
  top: 0;
  z-index: 10;
  backdrop-filter: blur(12px);
}
.brand {
  display: flex;
  align-items: center;
  gap: 14px;
}
.brand-symbol {
  width: 46px;
  height: 46px;
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
  margin: 2px 0 0;
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
}
.app-nav a.router-link-active {
  color: #2563eb;
}
.app-main {
  padding: 24px 32px 52px;
}
.app-footer {
  padding: 24px 32px;
  color: #475569;
  border-top: 1px solid rgba(15, 23, 42, 0.08);
  background: #fff;
}
@media (max-width: 860px) {
  .app-header {
    flex-direction: column;
    align-items: stretch;
  }
  .app-nav {
    justify-content: space-between;
    gap: 14px;
  }
}
</style>
