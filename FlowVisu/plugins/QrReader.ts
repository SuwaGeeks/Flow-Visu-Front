import QrReader from 'vue3-qr-reader'

export default defineNuxtPlugin((NuxtApp) => {
  NuxtApp.vueApp.use(QrReader)
})