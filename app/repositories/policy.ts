import type { Policy, PolicyResponse } from '~/types'
import { Repository } from '.'

export class PolicyRepository extends Repository {
    get(): Promise<PolicyResponse[]> {
        return this.api(`/policy`)
    }

    update(policy: Policy): Promise<PolicyResponse> {
        return this.api(`/policy`, { body: { policy }, method: 'PUT' })
    }
}