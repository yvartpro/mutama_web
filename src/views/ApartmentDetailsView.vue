<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getApartment, getRoomsByApartment, getPostsByApartment, getImageUrl } from '@/api.js'

const route = useRoute()
const router = useRouter()
const apartment = ref(null)
const rooms = ref([])
const posts = ref([])
const loading = ref(true)
const error = ref('')
const phoneNumber = '+257123456789'

const coverImage = computed(() => getImageUrl(apartment.value))
const whatsappMessage = computed(() => `Bonjour, je souhaite réserver l'appartement "${apartment.value?.name || ''}".`)
const whatsappLink = computed(() => {
  const cleaned = phoneNumber.replace(/\D/g, '')
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(whatsappMessage.value)}`
})

async function loadDetails() {
  try {
    loading.value = true
    const id = route.params.id
    apartment.value = await getApartment(id)
    rooms.value = await getRoomsByApartment(id)
    posts.value = await getPostsByApartment(id)
  } catch (err) {
    error.value = 'Impossible de charger les détails de l’appartement.'
    console.error(err)
  } finally {
    loading.value = false
  }
}

onMounted(loadDetails)
</script>

<template>
  <section class="details-shell">
    <div class="details-top">
      <button class="back-button" @click="router.back()">← Retour</button>
      <div>
        <p class="eyebrow">Détails de l’appartement</p>
        <h1>{{ apartment?.name || 'Appartement' }}</h1>
      </div>
    </div>

    <div v-if="loading" class="status-block">Chargement des détails…</div>
    <div v-if="error" class="status-block status-error">{{ error }}</div>

    <div v-if="apartment" class="details-grid">
      <div class="details-card image-panel" :style="{ backgroundImage: coverImage ? `url(${coverImage})` : 'none' }">
        <div class="details-tag">AI powered</div>
      </div>
      <div class="details-card info-panel">
        <div class="info-row">
          <span class="label">Prix</span>
          <strong>{{ apartment.price ? `BIF ${apartment.price.toLocaleString('fr-FR')}` : 'Sur demande' }}</strong>
        </div>
        <div class="info-row">
          <span class="label">Catégorie</span>
          <strong>Appartement</strong>
        </div>
        <p class="details-copy">{{ apartment.description || 'Description non disponible pour ce logement.' }}</p>
        <h2>Services & espaces</h2>
        <ul class="details-list">
          <li v-for="room in rooms" :key="room.id">{{ room.name }}</li>
          <li v-if="rooms.length === 0">Sans informations de pièces supplémentaires.</li>
        </ul>
        <h2>Atouts sélectionnés</h2>
        <ul class="details-list">
          <li v-for="post in posts.slice(0, 4)" :key="post.id">{{ post.title }}</li>
          <li v-if="posts.length === 0">Aucun avantage détaillé.</li>
        </ul>
        <a :href="whatsappLink" class="button button-primary">Contacter via WhatsApp</a>
      </div>
    </div>
  </section>
</template>

<style scoped>
.details-shell {
  padding: 64px 24px;
  max-width: 1120px;
  margin: 0 auto;
}
.details-top {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: center;
  margin-bottom: 32px;
}
.back-button {
  border: none;
  background: transparent;
  color: #0f172a;
  font-weight: 700;
  cursor: pointer;
}
.eyebrow {
  text-transform: uppercase;
  color: #0f172a;
  letter-spacing: 0.2em;
  font-size: 0.75rem;
  margin-bottom: 12px;
}
.details-top h1 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 3rem);
  color: #111827;
}
.details-grid {
  display: grid;
  grid-template-columns: 1.2fr 0.8fr;
  gap: 24px;
}
.details-card {
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 28px;
  background: #fff;
  padding: 24px;
}
.image-panel {
  min-height: 460px;
  background-size: cover;
  background-position: center;
  position: relative;
}
.details-tag {
  position: absolute;
  top: 24px;
  left: 24px;
  padding: 10px 14px;
  border-radius: 999px;
  background: rgba(56, 189, 248, 0.12);
  color: #0c4a6e;
  font-size: 0.85rem;
  font-weight: 700;
}
.info-panel h2 {
  margin-top: 32px;
  margin-bottom: 18px;
  font-size: 1.25rem;
  color: #111827;
}
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 18px 0;
  border-bottom: 1px solid rgba(15, 23, 42, 0.08);
}
.info-row:last-child {
  border-bottom: none;
}
.label {
  color: #64748b;
  font-size: 0.95rem;
}
.details-copy {
  margin: 24px 0;
  color: #475569;
  line-height: 1.8;
}
.details-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: grid;
  gap: 10px;
}
.details-list li {
  padding: 14px 18px;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 18px;
  background: #f8fafc;
  color: #0f172a;
}
.button-primary {
  display: inline-flex;
  margin-top: 28px;
  padding: 14px 24px;
  border-radius: 999px;
  color: #fff;
  background: #0f172a;
  text-decoration: none;
  font-weight: 700;
}
.status-block {
  border: 1px solid rgba(15, 23, 42, 0.08);
  background: #f8fafc;
  border-radius: 20px;
  padding: 28px;
  color: #475569;
}
.status-error {
  color: #b91c1c;
}

@media (max-width: 960px) {
  .details-grid {
    grid-template-columns: 1fr;
  }
}
</style>
