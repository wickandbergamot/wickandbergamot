/**
 * The connection url to use when running unit tests against a live cluster
 */

export const MOCK_PORT = 9999;
export const url = process.env.TEST_LIVE
  ? 'http://localhost:8328/'
  : 'http://localhost:9999/';

export const wsUrl = process.env.TEST_LIVE
  ? 'ws://localhost:8329/'
  : 'ws://localhost:9999/';

//export const url = 'https://api.devnet.wickandbergamot.org/';
//export const url = 'http://api.devnet.wickandbergamot.org/';
