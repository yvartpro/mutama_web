<script setup>
import { ref, onMounted } from 'vue'
import ApartmentCard from '@/components/ApartmentCard.vue'
import { getApartments } from '@/api.js'

const apartments = ref([])
const loading = ref(true)
const error = ref('')

const features = [
  {
    title: 'Minimalist stay search',
    description: 'Cartes claires, interface simple et navigation fluide pour trouver rapidement votre appartement.',
  },
  {
    title: 'AI powered recommendations',
    description: 'Chaque espace est présenté avec un accent “AI powered” pour une expérience moderne et intelligente.',
  },
  {
    title: 'Flat, professional layout',
    description: 'Un design épuré qui met l’accent sur le contenu et la confiance.',
  },
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
    <div class="page-grid">
      <div>
        <p class="eyebrow">Maison de Passage Mutama</p>
        <h1>Un hébergement premium, simple et moderne.</h1>
        <p class="hero-copy">Découvrez des appartements sélectionnés avec une présentation claire, des tarifs propres et une expérience utilisateur inspirée par les grandes interfaces.</p>
        <div class="hero-actions">
          <router-link to="/reservation" class="button button-primary">Réserver maintenant</router-link>
          <router-link to="/contact" class="button button-secondary">Contact rapide</router-link>
        </div>
      </div>
      <div class="hero-card">
        <div class="hero-card-label">AI powered</div>
        <h2>Cartes intelligentes</h2>
        <p>Chaque appartement est présenté dans un format épuré, mettant l’accent sur l’information essentielle et la confiance.</p>
      </div>
    </div>
  </section>

  <section class="features-section">
    <div class="section-header">
      <span class="section-kicker">Design</span>
      <h2>Un look professionnel et organisé</h2>
    </div>
    <div class="feature-grid">
      <div v-for="feature in features" :key="feature.title" class="feature-card">
        <p class="feature-title">{{ feature.title }}</p>
        <p class="feature-copy">{{ feature.description }}</p>
      </div>
    </div>
  </section>

  <section class="list-section">
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
</template>

<style scoped>
.hero-section {
  background: #fff;
  padding: 64px 24px 40px;
}
.page-grid {
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 32px;
  max-width: 1200px;
  margin: 0 auto;
  align-items: center;
}
.eyebrow {
  color: #0f172a;
  font-weight: 700;
  letter-spacing: 0.15em;
  text-transform: uppercase;
  font-size: 0.8rem;
  margin-bottom: 16px;
}
.hero-section h1 {
  margin: 0;
  font-size: clamp(2.5rem, 3.5vw, 4.25rem);
  line-height: 1.02;
  color: #111827;
}
.hero-copy {
  max-width: 640px;
  color: #475569;
  font-size: 1rem;
  margin: 24px 0;
}
.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}
.button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 14px 24px;
  border-radius: 999px;
  font-weight: 700;
  text-decoration: none;
}
.button-primary {
  background: #0f172a;
  color: #fff;
}
.button-secondary {
  border: 1px solid rgba(15, 23, 42, 0.16);
  color: #0f172a;
  background: #fff;
}
.hero-card {
  position: relative;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 28px;
  padding: 32px;
  background: #f8fafc;
  box-shadow: 0 24px 60px rgba(15, 23, 42, 0.04);
}
.hero-card-label {
  display: inline-flex;
  padding: 8px 16px;
  border-radius: 999px;
  color: #0f172a;
  background: #e0f2fe;
  font-size: 0.8rem;
  font-weight: 700;
  margin-bottom: 20px;
}
.hero-card h2 {
  margin: 0 0 16px;
  font-size: 1.75rem;
  color: #111827;
}
.hero-card p {
  margin: 0;
  color: #475569;
  line-height: 1.8;
}
.features-section,
.list-section {
  padding: 64px 24px;
  max-width: 1200px;
  margin: 0 auto;
}
.section-header {
  margin-bottom: 32px;
}
.section-kicker {
  display: block;
  color: #0f172a;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  font-size: 0.75rem;
  margin-bottom: 12px;
}
.section-header h2 {
  margin: 0;
  font-size: 2.25rem;
  color: #111827;
}
.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
}
.feature-card {
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  padding: 28px;
}
.feature-title {
  margin: 0 0 14px;
  font-weight: 700;
  font-size: 1rem;
  color: #111827;
}
.feature-copy {
  margin: 0;
  color: #475569;
  line-height: 1.75;
}
.card-grid {
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
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
  .page-grid {
    grid-template-columns: 1fr;
  }
  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
