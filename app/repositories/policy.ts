import type { Policy, PolicyResponse } from '~/types'
import { Repository } from '.'

export class PolicyRepository extends Repository {
  get() {
    return this.api<PolicyResponse>(`/policy`)
  }

  update(policy: Policy) {
    return this.api<PolicyResponse>(`/policy`, { body: { policy }, method: 'PUT' })
  }
}
