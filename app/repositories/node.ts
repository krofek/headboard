import type { NodeManyResponse, NodeResponse } from '~/types'
import { Repository } from '.'

export class NodeRepository extends Repository {
  getAll(): Promise<NodeManyResponse> {
    return this.api(`/node`)
  }

  getOne(nodeId: string): Promise<NodeResponse> {
    return this.api(`/node/${nodeId}`)
  }

  get(user: string): Promise<NodeManyResponse> {
    return this.api(`/node`, { query: { user } })
  }

  register(user: string, key: string): Promise<NodeResponse> {
    return this.api(`/node/register`, { query: { user, key }, method: 'POST' })
  }

  delete(nodeId: string): Promise<void> {
    return this.api(`/node/${nodeId}`, { method: 'DELETE' })
  }

  approve_routes(nodeId: string, routes: string[]): Promise<NodeResponse> {
    return this.api(`/node/${nodeId}/approve_routes`, { body: { routes }, method: 'PUT' })
  }

  expire(nodeId: string): Promise<NodeResponse> {
    return this.api(`/node/${nodeId}/expire`, { method: 'POST' })
  }

  rename(nodeId: string, newName: string): Promise<NodeResponse> {
    return this.api(`/node/${nodeId}/rename/${newName}`, { method: 'POST' })
  }

  setTags(nodeId: string, tags: string[]): Promise<string[]> {
    return this.api(`/node/${nodeId}/tags`, { body: { tags }, method: 'POST' })
  }

  setUser(nodeId: string, user: number): Promise<NodeResponse> {
    return this.api(`/node/${nodeId}/user`, { body: { user }, method: 'POST' })
  }
}
