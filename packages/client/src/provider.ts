import { WsProvider } from 'dedot'

const providerUrl: Record<AllfeatNetwork, string> = {
  melodie: 'wss://melodie-rpc.allfeat.io',
  local: 'ws://127.0.0.1:9944',
}

/** Available network to connect with a `AllfeatProvider` instance.*/
export type AllfeatNetwork = 'melodie' | 'local'

/**
 * A WebSocket provider specifically configured for Allfeat networks.
 *
 * This class extends the dedot `WsProvider` to simplify connection setup
 * for Allfeat-based networks. It allows developers to connect either to a predefined
 * network (`'melodie'`, `'local'`, etc.) or to a custom WebSocket endpoint.
 *
 * Example usage:
 * ```ts
 * const provider = new AllfeatProvider('melodie');
 * ```
 *
 * @extends {WsProvider}
 */
export class AllfeatProvider extends WsProvider {
  /**
   * Creates a new provider instance using either a known Allfeat network name
   * or a custom WebSocket URL.
   *
   * @param {AllfeatNetwork | string} networkOrUrl - The name of the network ('melodie', 'local', etc.) or a custom WebSocket URL.
   * @throws Will throw an error if the network is not supported and no valid URL is provided.
   */
  constructor(networkOrUrl: AllfeatNetwork | string) {
    const url =
      networkOrUrl in providerUrl
        ? providerUrl[networkOrUrl as AllfeatNetwork] // Predefined Networks
        : networkOrUrl // Custom URL

    if (!url) {
      throw new Error(
        `Network '${networkOrUrl}' is not supported, and no valid URL was provided`,
      )
    }

    super(url)
  }

  /**
   * Returns the list of all supported Allfeat networks.
   *
   * @returns {AllfeatNetwork[]} An array of supported network names.
   */
  static getSupportedNetworks(): AllfeatNetwork[] {
    return Object.keys(providerUrl) as AllfeatNetwork[]
  }
}
