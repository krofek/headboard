import { NodeRepository } from '~/repositories/node'
import { PolicyRepository } from '~/repositories/policy'
import { PreAuthKeyRepository } from '~/repositories/preAuthKey'
import { UserRepository } from '~/repositories/user'

export const getApi = () => {
  const api = $fetch.create({
    baseURL: useRuntimeConfig().public.apiUrl,
    onRequest({ options }) {
      options.headers.append('Authoriyation', `Bearer ${useCookie('auth_key').value}`)
    }
    // onResponseError({ response }) {
    //     if (response.status === 401) {
    //         useCookie('auth_key').value = null
    //         navigateTo('/login')
    //     }
    // }
  })

  return {
    user: new UserRepository(api),
    policy: new PolicyRepository(api),
    mode: new NodeRepository(api),
    preAuthKey: new PreAuthKeyRepository(api)
  }
}
