export interface User {
  id: string
  name: string
  displayName: string
  email: string
  pictureUrl?: string
  providerId: string;
  provider: string;
  profilePicUrl: string;
}

type RegisterMethod =
  | 'REGISTER_METHOD_UNSPECIFIED'
  | 'REGISTER_METHOD_AUTH_KEY'
  | 'REGISTER_METHOD_CLI'
  | 'REGISTER_METHOD_OIDC'

export interface Node {
  id: string
  machineKey: string
  nodeKey: string
  discoKey: string
  ipAddresses: string[]
  name: string
  user: User
  lastSeen?: string
  expiry?: string
  preAuthKey?: PreAuthKey
  createdAt: string
  registerMethod: RegisterMethod
  forcedTags: string[]
  invalidTags: string[]
  validTags: string[]
  givenName: string
  online: boolean
  approvedRoutes: string[]
  availableRoutes: string[]
  subnetRoutes: string[]
}

export interface PreAuthKey {
  user: User
  id: number
  key: string
  reusable: boolean
  ephemeral: boolean
  used: boolean
  expiration: string
  createdAt: string
  aclTags: string[]
}

export type Policy = Record<string, string[]>

interface PolicyResponse {
  policy: Policy,
  updatedAt: string
}

interface PreAuthKeyResponse {
  preauthKeys: PreAuthKey[]
}

interface UserResponse {
  user: User
}

interface UserManyResponse {
  users: User[]
}

interface UserGetParams {
  id?: number
  name?: string
  email?: string
}

interface NodeResponse {
  node: Node
}

interface NodeManyResponse {
  nodes: Node[]
}