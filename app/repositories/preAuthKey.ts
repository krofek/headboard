import type { PreAuthKeyResponse } from "~/types"
import { Repository } from "."

export class PreAuthKeyRepository extends Repository {
    getAll(): Promise<PreAuthKeyResponse> {
        return this.api(`/preauthkey`)
    }

    get(user: string): Promise<PreAuthKeyResponse> {
        return this.api(`/preauthkey`, { query: { user } })
    }
}