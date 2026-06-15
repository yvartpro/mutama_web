<script setup>
import { ref, onMounted } from 'vue'
import ApartmentCard from '@/components/ApartmentCard.vue'
import { getApartments } from '@/api.js'

const apartments = ref([])
const loading = ref(true)
const error = ref('')

const highlights = [
  'Un cadre calme, propre et sécurisé pour vos séjours',
  'Votre tranquillité et discrétion, notre priorité absolue',
  'Service professionnel de classe mondiale',
]

async function loadApartments() {
  try {
    apartments.value = await getApartments()
  } catch (err) {
    error.value = 'Impossible de charger les appartements pour le moment.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(loadApartments)
</script>

<template>
  <section class="hero-section">
    <div class="hero-background"></div>
    <div class="hero-overlay"></div>
    <div class="hero-content aos-fade-up" v-aos>
      <span class="hero-eyebrow">Maison de Passage Mutama</span>
      <h1 class="hero-title">Votre Refuge de<br><span> Luxe & Discrétion</span></h1>
      <div class="hero-copy">
        <p>Un cadre calme, propre et sécurisé pour vos séjours</p>
        <p>Votre tranquillité et discrétion, notre priorité absolue</p>
        <p>Service professionnel de classe mondiale</p>
      </div>
      <div class="hero-actions">
        <a href="#apartments" class="button button-primary">Voir nos appartements</a>
        <router-link to="/reservation" class="button button-secondary">Réserver Maintenant</router-link>
      </div>
    </div>
  </section>

  <section class="list-section aos-fade-up" id="apartments" v-aos>
    <div class="section-header">
      <span class="section-kicker">Appartements</span>
      <h2>Choisissez votre séjour</h2>
    </div>

    <div v-if="loading" class="status-block">Chargement des appartements…</div>
    <div v-if="error" class="status-block status-error">{{ error }}</div>
    <div v-if="!loading && apartments.length === 0" class="status-block">Aucun appartement trouvé.</div>

    <div v-if="apartments.length > 0" class="card-grid">
      <ApartmentCard v-for="apartment in apartments" :key="apartment.id" :apartment="apartment" />
    </div>
  </section>

  <section class="features-section aos-fade-up" v-aos>
    <div class="features-panel">
      <div class="features-header">
        <span class="section-kicker">Présentation</span>
        <h2>Un service serein, clair et haut de gamme</h2>
      </div>
      <div class="feature-list">
        <div v-for="(highlight, index) in highlights" :key="index" class="feature-pill">
          <span class="feature-dot"></span>
          <p>{{ highlight }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.hero-section {
  position: relative;
  min-height: 88vh;
  display: grid;
  place-items: center;
  overflow: hidden;
  padding: 0 24px;
}
.hero-background {
  position: absolute;
  inset: 0;
  background-image: url('/assets/images/hero/background image.jpg');
  background-size: cover;
  background-position: center;
  filter: saturate(0.95) brightness(0.65);
}
.hero-overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, rgba(15,23,42,0.48), rgba(15,23,42,0.86));
}
.hero-content {
  position: relative;
  z-index: 10;
  max-width: 900px;
  text-align: center;
  color: #f8fafc;
}
.hero-eyebrow {
  text-transform: uppercase;
  letter-spacing: 0.28em;
  color: #f5f5f4;
  font-weight: 700;
  margin-bottom: 20px;
  display: inline-block;
}
.hero-title {
  margin: 0;
  font-size: clamp(3rem, 5vw, 5.75rem);
  line-height: 0.95;
  font-weight: 800;
}
.hero-title span {
  background: linear-gradient(90deg, #f59e0b, #fb923c);
  -webkit-background-clip: text;
  color: transparent;
}
.hero-copy {
  display: grid;
  gap: 18px;
  font-size: 1.1rem;
  line-height: 1.9;
  color: rgba(248, 250, 252, 0.9);
  max-width: 740px;
  margin: 28px auto 40px;
}
.hero-copy p {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
}
.hero-copy p::before {
  content: '';
  width: 10px;
  height: 10px;
  border-radius: 999px;
  background: #fbbf24;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 16px;
}
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
  padding: 16px 30px;
  transition: transform 180ms ease, box-shadow 180ms ease, background 180ms ease;
}
.button-primary {
  background: linear-gradient(90deg, #f59e0b, #fb923c);
  color: #0f172a;
  box-shadow: 0 22px 45px rgba(251, 146, 60, 0.23);
}
.button-secondary {
  background: rgba(255,255,255,0.08);
  color: #f8fafc;
  border: 1px solid rgba(248, 250, 252, 0.25);
}
.button:hover {
  transform: translateY(-2px);
}

.list-section,
.features-section {
  padding: 64px 24px;
  max-width: 1200px;
  margin: 0 auto;
}
.section-header {
  margin-bottom: 32px;
}
.section-kicker {
  display: block;
  color: #f59e0b;
  font-weight: 800;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-size: 0.78rem;
  margin-bottom: 12px;
}
.section-header h2 {
  margin: 0;
  font-size: clamp(2.15rem, 2.7vw, 3rem);
  color: #111827;
}
.feature-list {
  display: grid;
  gap: 16px;
}
.features-panel {
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 28px;
  padding: 32px;
  box-shadow: 0 28px 70px rgba(15, 23, 42, 0.06);
}
.features-header h2 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 2.8rem);
  color: #111827;
}
.feature-pill {
  display: flex;
  align-items: flex-start;
  gap: 18px;
  padding: 20px 22px;
  border-radius: 24px;
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.05);
}
.feature-dot {
  min-width: 14px;
  min-height: 14px;
  border-radius: 999px;
  background: #f59e0b;
  margin-top: 6px;
}
.feature-pill p {
  margin: 0;
  color: #334155;
  line-height: 1.8;
}
.card-grid {
  display: grid;
  gap: 24px;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
}
.status-block {
  color: #475569;
  padding: 20px;
  background: #f8fafc;
  border-radius: 18px;
  border: 1px solid rgba(15, 23, 42, 0.06);
}
.status-error {
  color: #b91c1c;
}

@media (max-width: 960px) {
  .hero-section {
    min-height: 80vh;
  }
  .hero-title {
    font-size: clamp(2.5rem, 8vw, 4.25rem);
  }
}

@media (max-width: 640px) {
  .hero-section {
    min-height: 70vh;
    padding: 0 16px;
  }
  .hero-eyebrow {
    font-size: 0.72rem;
    letter-spacing: 0.16em;
    margin-bottom: 14px;
  }
  .hero-title {
    font-size: clamp(2.2rem, 12vw, 3rem);
    line-height: 1.05;
  }
  .hero-copy {
    margin: 24px auto 32px;
    max-width: 100%;
  }
  .hero-copy p {
    display: none;
  }
  .hero-copy p:first-child {
    display: inline-flex;
  }
  .hero-actions {
    flex-direction: column;
    gap: 14px;
  }
  .button {
    width: 100%;
  }
}
</style>
