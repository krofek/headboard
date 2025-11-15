import type { UserManyResponse, User, UserGetParams, UserResponse } from '~/types'
import { Repository } from '.'

export class UserRepository extends Repository {
    getAll(): Promise<UserManyResponse[]> {
        return this.api(`/user`)
    }

    get(query: UserGetParams): Promise<UserManyResponse> {
        return this.api('/user', { query })
    }

    create(userData: Partial<User>): Promise<UserResponse> {
        return this.api('/user', { body: userData, method: 'POST' })
    }

    delete(userId: number): Promise<void> {
        return this.api(`/user/${userId}`, { method: 'DELETE' })
    }

    rename(newName: string, userId: number): Promise<UserResponse> {
        return this.api(`/user/${userId}/rename/${newName}`, { method: 'POST' })
    }
}