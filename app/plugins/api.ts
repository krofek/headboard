export default defineNuxtPlugin({
  setup() {
    const api = $fetch.create({
      baseURL: useRuntimeConfig().public.apiUrl,
      onRequest({ options }) {
        options.headers.append('Authorization', `Bearer ${useCookie('auth_key').value}`)
      }
      // onResponseError({ response }) {
      //     if (response.status === 401) {
      //         useCookie('auth_key').value = null
      //         navigateTo('/login')
      //     }
      // }
    })

    return {
      provide: { api }
    }
  }
})
