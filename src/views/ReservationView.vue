<template>
  <section class="reserve-shell">
    <div class="content-panel">
      <p class="eyebrow">Réservation</p>
      <h1>Réservez votre séjour en quelques secondes.</h1>
      <p class="copy">Contactez-nous directement sur WhatsApp pour une réponse rapide, une proposition claire et une réservation simple.</p>

      <div class="reserve-card">
        <h2>Réservation prioritaire</h2>
        <p>Nos meilleurs appartements sont traités en priorité. Envoyez votre demande et recevez un lien de confirmation.</p>
        <a :href="whatsappLink" class="button button-primary">Ouvrir WhatsApp</a>
      </div>

      <div class="reserve-details">
        <div>
          <h3>Processus simple</h3>
          <p>1. Choisissez un appartement.
          <br>2. Envoyez votre message.
          <br>3. Recevez la confirmation.</p>
        </div>
        <div>
          <h3>Support dédié</h3>
          <p>Nous répondons rapidement aux demandes de réservation et proposons des solutions sur mesure.</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const phoneNumber = '+257123456789'
const whatsappMessage = 'Bonjour, je souhaite réserver un appartement à Mutama.'
const whatsappLink = `https://wa.me/${phoneNumber.replace(/\D/g, '')}?text=${encodeURIComponent(whatsappMessage)}`
</script>

<style scoped>
.reserve-shell {
  padding: 64px 24px;
  max-width: 980px;
  margin: 0 auto;
}
.content-panel {
  display: grid;
  gap: 32px;
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
.reserve-card {
  padding: 32px;
  border-radius: 28px;
  background: #fff;
  border: 1px solid rgba(15, 23, 42, 0.08);
  box-shadow: 0 24px 48px rgba(15, 23, 42, 0.06);
}
.reserve-card h2 {
  margin: 0 0 16px;
  color: #111827;
}
.button-primary {
  display: inline-flex;
  margin-top: 20px;
  padding: 14px 24px;
  border-radius: 999px;
  color: #fff;
  background: #0f172a;
  text-decoration: none;
  font-weight: 700;
}
.reserve-details {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 20px;
}
.reserve-details h3 {
  margin: 0 0 12px;
  color: #111827;
}
.reserve-details p {
  margin: 0;
  color: #475569;
  line-height: 1.8;
}
@media (max-width: 720px) {
  .reserve-details {
    grid-template-columns: 1fr;
  }
}
</style>
