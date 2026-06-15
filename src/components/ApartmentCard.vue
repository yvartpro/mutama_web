<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { getImageUrl } from '@/api.js'

const props = defineProps({
  apartment: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const cover = computed(() => getImageUrl(props.apartment) || '')
const cardStyle = computed(() => ({
  backgroundImage: cover.value ? `url(${cover.value})` : 'none',
}))
const formattedPrice = computed(() => {
  const price = props.apartment?.price
  return price ? `BIF ${price.toLocaleString('fr-FR')}` : 'Tarif sur demande'
})

function openDetails() {
  router.push({ name: 'ApartmentDetails', params: { id: props.apartment.id } })
}
</script>

<template>
  <article class="card" @click="openDetails">
    <div class="card-media" :style="cardStyle">
      <span class="tag">AI powered</span>
    </div>
  <div class="card-body">
    <div class="card-header">
      <h3>{{ apartment.name }}</h3>
      <span class="price">{{ formattedPrice }}</span>
    </div>
    <p class="excerpt">{{ apartment.description || 'Appartement moderne avec sélection d’équipements et accueil chaleureux.' }}</p>
    <div class="pill">AI curated comfort</div>
  </div>
</article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(15, 23, 42, 0.08);
  border-radius: 24px;
  background: #fff;
  min-height: 320px;
  cursor: pointer;
  overflow: hidden;
  transition: transform 180ms ease, box-shadow 180ms ease, border-color 180ms ease;
}
.card:hover {
  transform: translateY(-4px);
  box-shadow: 0 20px 50px rgba(15, 23, 42, 0.09);
  border-color: rgba(15, 23, 42, 0.12);
}
.card-media {
  min-height: 180px;
  background-size: cover;
  background-position: center;
  position: relative;
  background-color: #f5f7fa;
}
.tag {
  position: absolute;
  top: 16px;
  left: 16px;
  padding: 6px 12px;
  border-radius: 999px;
  background: rgba(16, 185, 129, 0.12);
  color: #047857;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.02em;
}
.card-body {
  padding: 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
}
.card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}
.card-header h3 {
  margin: 0;
  font-size: 1.125rem;
  font-weight: 700;
  color: #111827;
}
.price {
  color: #111827;
  font-weight: 700;
}
.excerpt {
  margin: 0;
  color: #4b5563;
  line-height: 1.75;
  font-size: 0.95rem;
}
.pill {
  align-self: flex-start;
  padding: 8px 12px;
  border-radius: 999px;
  color: #0f172a;
  background: #eff6ff;
  font-size: 0.8rem;
  font-weight: 700;
}
</style>
