import type { UserManyResponse, User, UserGetParams, UserResponse } from '~/types'
import { Repository } from '.'

export class UserRepository extends Repository {
  getAll() {
    return this.api<UserManyResponse>('/user', { method: 'GET' })
  }

  get(query: UserGetParams) {
    return this.api<UserManyResponse>('/user', { query })
  }

  create(userData: Partial<User>) {
    return this.api<UserResponse>('/user', { body: userData, method: 'POST' })
  }

  delete(userId: number) {
    return this.api(`/user/${userId}`, { method: 'DELETE' })
  }

  rename(newName: string, userId: number) {
    return this.api<UserResponse>(`/user/${userId}/rename/${newName}`, { method: 'POST' })
  }
}
