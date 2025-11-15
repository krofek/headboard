import type { NitroFetchRequest, $Fetch } from 'nitropack'

export class Repository {
  protected api: $Fetch

  constructor(api: $Fetch<NitroFetchRequest>) {
    this.api = api
  }
}
