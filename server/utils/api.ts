import type { EventHandlerRequest, H3Event } from 'h3'

export const serverApiRequest = (event: H3Event<EventHandlerRequest>) => {
  const api = $fetch.create({
    baseURL: useRuntimeConfig().public.apiUrl,
    onRequest({ options }) {
      options.headers.append('Authorization', `Bearer ${useRuntimeConfig().public.apikey}`)
    }
  })

  // Read body for non-GET/DELETE requests
  const body = event.method !== 'GET' && event.method !== 'DELETE' ? readBody(event) : undefined

  // Forward the request to the actual Headscale API server
  // Remove /api from path as it's added in the repository layer to decouple nitro and nuxt routes
  return api(event.path.replace('/api', ''), {
    method: event.method,
    query: event.node.req.query,
    body
  })
}
