import { NodeRepository } from '~/repositories/node'
import { PolicyRepository } from '~/repositories/policy'
import { PreAuthKeyRepository } from '~/repositories/preAuthKey'
import { UserRepository } from '~/repositories/user'

const repositories = {
  userRepository: new UserRepository(),
  policyRepository: new PolicyRepository(),
  nodeRepository: new NodeRepository(),
  preAuthKeyRepository: new PreAuthKeyRepository()
}

export const useAPI = () => {
  return repositories
}
