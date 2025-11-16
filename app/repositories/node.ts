import type { NodeManyResponse, NodeResponse } from '~/types'
import { Repository } from '.'

export class NodeRepository extends Repository {
  getAll() {
    return this.api<NodeManyResponse>(`/node`)
  }

  getOne(nodeId: string) {
    return this.api<NodeResponse>(`/node/${nodeId}`)
  }

  get(user: string) {
    return this.api<NodeManyResponse>(`/node`, { query: { user } })
  }

  register(user: string, key: string) {
    return this.api<NodeResponse>(`/node/register`, { query: { user, key }, method: 'POST' })
  }

  delete(nodeId: string) {
    return this.api(`/node/${nodeId}`, { method: 'DELETE' })
  }

  approve_routes(nodeId: string, routes: string[]) {
    return this.api<NodeResponse>(`/node/${nodeId}/approve_routes`, { body: { routes }, method: 'PUT' })
  }

  expire(nodeId: string) {
    return this.api<NodeResponse>(`/node/${nodeId}/expire`, { method: 'POST' })
  }

  rename(nodeId: string, newName: string) {
    return this.api<NodeResponse>(`/node/${nodeId}/rename/${newName}`, { method: 'POST' })
  }

  setTags(nodeId: string, tags: string[]) {
    return this.api(`/node/${nodeId}/tags`, { body: { tags }, method: 'POST' })
  }

  setUser(nodeId: string, user: number) {
    return this.api<NodeResponse>(`/node/${nodeId}/user`, { body: { user }, method: 'POST' })
  }
}
