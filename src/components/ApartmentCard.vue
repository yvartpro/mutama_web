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
  <article class="card aos-fade-up" @click="openDetails" v-aos>
    <div class="card-media" :style="cardStyle"></div>
    <div class="card-body">
      <div class="card-header">
        <div>
          <h3>{{ apartment.name }}</h3>
          <p class="subtitle">Appartement Mutama</p>
        </div>
        <span class="price">{{ formattedPrice }}</span>
      </div>
      <p class="excerpt">{{ apartment.description || 'Un refuge discret avec un service sobre, propre et chaleureux.' }}</p>
      <div class="tagline">Séjour haut de gamme, design moderne.</div>
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
.subtitle {
  margin: 4px 0 0;
  color: #6b7280;
  font-size: 0.88rem;
}
.price {
  color: #111827;
  font-weight: 700;
}
.excerpt {
  margin: 0;
  color: #475569;
  line-height: 1.85;
  font-size: 0.95rem;
}
.tagline {
  display: inline-flex;
  align-items: center;
  padding: 10px 14px;
  border-radius: 999px;
  background: #fff7ed;
  color: #c2410c;
  font-weight: 700;
  font-size: 0.85rem;
}
</style>
