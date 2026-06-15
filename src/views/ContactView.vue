<template>
  <section class="contact-shell aos-fade-up" v-aos>
    <div class="content-panel">
      <p class="eyebrow">Contact</p>
      <h1>Contactez Mutama</h1>
      <p class="copy">Un design simple, un service direct et une réponse rapide pour organiser votre séjour.</p>

      <div class="contact-grid">
        <div class="contact-box">
          <h2>Téléphone</h2>
          <p>{{ phoneNumber }}</p>
        </div>
        <div class="contact-box">
          <h2>Email</h2>
          <p>contact@mutama.bi</p>
        </div>
        <div class="contact-box">
          <h2>Adresse</h2>
          <p>Burundi</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const phoneNumber = import.meta.env.VITE_WHATSAPP_NUMBER || '+257 123 456 789'
</script>

<style scoped>
.contact-shell {
  padding: 64px 24px;
  max-width: 980px;
  margin: 0 auto;
}
.eyebrow {
  text-transform: uppercase;
  color: #0f172a;
  font-size: 0.75rem;
  letter-spacing: 0.16em;
  margin-bottom: 12px;
}
h1 {
  margin: 0;
  font-size: clamp(2rem, 3vw, 3rem);
  color: #111827;
}
.copy {
  margin: 0;
  color: #475569;
  line-height: 1.8;
  font-size: 1rem;
}
.contact-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 20px;
  margin-top: 32px;
}
.contact-box {
  border-radius: 24px;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  padding: 28px;
}
.contact-box h2 {
  margin: 0 0 14px;
  color: #111827;
}
.contact-box p {
  margin: 0;
  color: #475569;
  line-height: 1.8;
}
@media (max-width: 860px) {
  .contact-grid {
    grid-template-columns: 1fr;
  }
}
</style>
