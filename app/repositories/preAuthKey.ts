import type { PreAuthKeyResponse } from '~/types'
import { Repository } from '.'

export class PreAuthKeyRepository extends Repository {
  getAll() {
    return this.api<PreAuthKeyResponse>(`/preauthkey`)
  }

  get(user: string) {
    return this.api<PreAuthKeyResponse>(`/preauthkey`, { query: { user } })
  }
}
