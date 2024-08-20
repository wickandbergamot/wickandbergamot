const endpoint = {
  http: {
    devnet: 'http://api.devnet.wickandbergamot.org',
    testnet: 'http://api.testnet.wickandbergamot.org',
    'mainnet-beta': 'http://api.mainnet-beta.wickandbergamot.org/',
  },
  https: {
    devnet: 'https://api.devnet.wickandbergamot.org',
    testnet: 'https://api.testnet.wickandbergamot.org',
    'mainnet-beta': 'https://api.mainnet-beta.wickandbergamot.org/',
  },
};

export type Cluster = 'devnet' | 'testnet' | 'mainnet-beta';

/**
 * Retrieves the RPC API URL for the specified cluster
 */
export function clusterApiUrl(cluster?: Cluster, tls?: boolean): string {
  const key = tls === false ? 'http' : 'https';

  if (!cluster) {
    return endpoint[key]['devnet'];
  }

  const url = endpoint[key][cluster];
  if (!url) {
    throw new Error(`Unknown ${key} cluster: ${cluster}`);
  }
  return url;
}
