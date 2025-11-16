import type { UseFetchOptions } from '#app'

export class Repository {
  protected api<T>(
    url: string | (() => string),
    options?: UseFetchOptions<T>
  ) {
    return useFetch(url, {
      ...options,
      baseURL: '/api' // Ensure all requests are prefixed with /api, to decouple nitro server with nuxt routes
    })
  }
}
