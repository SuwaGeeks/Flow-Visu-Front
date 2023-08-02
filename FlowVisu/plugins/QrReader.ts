import QrReader from 'vue3-qr-reader'

export default defineNuxtPlugin((NuxtApp) => {
  if (typeof window === 'object') {
    NuxtApp.vueApp.use(QrReader)
  }
})