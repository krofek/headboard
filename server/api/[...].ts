import { serverApiRequest } from '~~/server/utils/api'

/**
 * Catch-all Nitro API route to forward requests to the Headscale API server
 * Needs server side request so no CORS is needed for the Headscale API.
*/
export default defineEventHandler((event) => {
  return serverApiRequest(event)
})
