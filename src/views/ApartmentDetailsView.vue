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
const selectedMedia = ref(null)
const phoneNumber = '+257123456789'

const coverImage = computed(() => getImageUrl(apartment.value))
const whatsappMessage = computed(() => `Bonjour, je souhaite réserver l'appartement "${apartment.value?.name || ''}".`)
const whatsappLink = computed(() => {
  const cleaned = phoneNumber.replace(/\D/g, '')
  return `https://wa.me/${cleaned}?text=${encodeURIComponent(whatsappMessage.value)}`
})

function normalizeImage(value) {
  if (!value) return null
  if (typeof value === 'string') return value
  return value.url || null
}

function extractGallery(item, label) {
  const images = []
  if (Array.isArray(item.images)) {
    item.images.forEach(img => {
      const src = normalizeImage(img)
      if (src) images.push({ src, label })
    })
  }
  if (item.heroImage) {
    const src = normalizeImage(item.heroImage)
    if (src) images.push({ src, label })
  }
  return images
}

const roomGallery = computed(() => rooms.value.flatMap(room => extractGallery(room, room.name || 'Pièce')))
const postGallery = computed(() => posts.value.flatMap(post => extractGallery(post, post.title || 'Prestations')))
const galleryItems = computed(() => [...roomGallery.value, ...postGallery.value])

function openMedia(item) {
  selectedMedia.value = item
}

function closeMedia() {
  selectedMedia.value = null
}

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
        <h1>{{ apartment?.name || 'Appartement Mutama' }}</h1>
      </div>
    </div>

    <div v-if="loading" class="status-block">Chargement des détails…</div>
    <div v-if="error" class="status-block status-error">{{ error }}</div>

    <div v-if="apartment" class="details-grid">
      <div class="details-card image-panel" :style="{ backgroundImage: coverImage ? `url(${coverImage})` : 'none' }">
        <div class="image-overlay"></div>
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
        <div class="amenities-block">
          <div class="amenity-grid">
            <div v-for="post in posts" :key="post.id" class="amenity-card">
              <div class="amenity-thumb" :style="{ backgroundImage: `url(${getImageUrl(post) || '/assets/images/hero/background image.jpg'})` }"></div>
              <div>
                <h3>{{ post.title || 'Prestations' }}</h3>
                <p>{{ post.content || 'Aménagements et services pour votre séjour.' }}</p>
              </div>
            </div>
            <div v-if="posts.length === 0" class="amenity-empty">Aucun service détaillé disponible.</div>
          </div>
        </div>
        <a :href="whatsappLink" class="button button-primary">Contacter via WhatsApp</a>
      </div>
    </div>

    <section class="gallery-section">
      <div class="gallery-header">
        <div>
          <span class="section-kicker">Galerie</span>
          <h2>Espaces et équipements associés</h2>
        </div>
        <p>Images liées à l’appartement sélectionné : chambres, services et prestations disponibles.</p>
      </div>

      <div v-if="galleryItems.length === 0" class="status-block">Aucune image liée à cet appartement.</div>
      <div v-else class="gallery-grid">
        <button v-for="(item, index) in galleryItems" :key="index" class="gallery-card" @click="openMedia(item)">
          <div class="media-thumb" :style="{ backgroundImage: `url(${item.src})` }"></div>
          <p>{{ item.label }}</p>
        </button>
      </div>
    </section>

    <div v-if="selectedMedia" class="lightbox" @click.self="closeMedia">
      <div class="lightbox-content">
        <button class="lightbox-close" @click="closeMedia">×</button>
        <img :src="selectedMedia.src" alt="Photo" />
        <p>{{ selectedMedia.label }}</p>
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
  border-radius: 16px;
  background: #fff;
  padding: 24px;
}
.image-panel {
  min-height: 420px;
  background-size: cover;
  background-position: center;
  position: relative;
  border-radius: 16px;
}
.details-tag {
  display: none;
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
.amenities-block {
  margin-top: 32px;
}
.amenity-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(240px, 1fr));
  gap: 16px;
}
.amenity-card {
  display: grid;
  grid-template-columns: 96px 1fr;
  gap: 14px;
  padding: 16px;
  border-radius: 16px;
  background: #f8fafc;
  border: 1px solid rgba(15, 23, 42, 0.08);
  align-items: center;
}
.amenity-thumb {
  min-height: 96px;
  background-size: cover;
  background-position: center;
  border-radius: 14px;
}
.amenity-card h3 {
  margin: 0 0 8px;
  font-size: 1rem;
  color: #0f172a;
}
.amenity-card p {
  margin: 0;
  color: #475569;
  font-size: 0.95rem;
  line-height: 1.6;
}
.amenity-empty {
  grid-column: 1 / -1;
  padding: 18px;
  text-align: center;
  background: #fff4e5;
  border-radius: 22px;
  color: #92400e;
}
.gallery-section {
  margin-top: 48px;
}
.gallery-header {
  display: flex;
  justify-content: space-between;
  gap: 24px;
  align-items: flex-end;
  margin-bottom: 24px;
}
.gallery-header h2 {
  margin: 0;
  font-size: clamp(1.9rem, 2.4vw, 2.5rem);
  color: #111827;
}
.gallery-header p {
  margin: 0;
  color: #475569;
  max-width: 480px;
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 18px;
}
.gallery-card {
  border-radius: 16px;
  overflow: hidden;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  cursor: pointer;
  text-align: left;
  padding: 0;
  transition: transform 180ms ease, box-shadow 180ms ease;
}
.gallery-card:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 40px rgba(15, 23, 42, 0.08);
}
.media-thumb {
  min-height: 160px;
  background-size: cover;
  background-position: center;
}
.gallery-card p {
  margin: 14px 16px 18px;
  color: #111827;
  font-weight: 700;
}
.lightbox {
  position: fixed;
  inset: 0;
  z-index: 50;
  display: grid;
  place-items: center;
  background: rgba(15, 23, 42, 0.8);
  padding: 24px;
}
.lightbox-content {
  position: relative;
  max-width: 960px;
  width: 100%;
  background: #111827;
  border-radius: 28px;
  overflow: hidden;
  box-shadow: 0 40px 100px rgba(15, 23, 42, 0.4);
}
.lightbox-close {
  position: absolute;
  top: 18px;
  right: 18px;
  border: none;
  background: rgba(255,255,255,0.1);
  color: #f8fafc;
  width: 42px;
  height: 42px;
  border-radius: 999px;
  font-size: 1.5rem;
  cursor: pointer;
}
.lightbox img {
  width: 100%;
  max-height: 80vh;
  object-fit: contain;
  display: block;
}
.lightbox-content p {
  margin: 16px;
  color: #f8fafc;
  font-size: 0.95rem;
}
.button-primary {
  display: inline-flex;
  margin-top: 28px;
  padding: 14px 24px;
  border-radius: 14px;
  color: #0f172a;
  background: linear-gradient(90deg, #f59e0b, #fb923c);
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
