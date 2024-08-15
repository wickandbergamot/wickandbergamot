import bs58 from "bs58";
import {
  SystemProgram,
  StakeProgram,
  VOTE_PROGRAM_ID,
  BPF_LOADER_PROGRAM_ID,
  BPF_LOADER_DEPRECATED_PROGRAM_ID,
  SYSVAR_CLOCK_PUBKEY,
  SYSVAR_RENT_PUBKEY,
  SYSVAR_REWARDS_PUBKEY,
  SYSVAR_STAKE_HISTORY_PUBKEY,
  ParsedTransaction,
  TransactionInstruction,
  Transaction,
  PartiallyDecodedInstruction,
  ParsedInstruction,
  Secp256k1Program,
  Ed25519Program,
} from "@wickandbergamot/web3.js";
import { Cluster } from "providers/cluster";
import { SerumMarketRegistry } from "serumMarketRegistry";
import { TokenInfoMap } from "@wickandbergamot/safe-token-registry";

export enum PROGRAM_NAMES {
  // native built-ins
  ADDRESS_LOOKUP_TABLE = "Address Lookup Table Program",
  COMPUTE_BUDGET = "Compute Budget Program",
  CONFIG = "Config Program",
  STAKE = "Stake Program",
  SYSTEM = "System Program",
  VOTE = "Vote Program",

  // native precompiles
  SECP256K1 = "Secp256k1 SigVerify Precompile",
  ED25519 = "Ed25519 SigVerify Precompile",

  // spl
  ASSOCIATED_TOKEN = "Associated Token Program",
  FEATURE_PROPOSAL = "Feature Proposal Program",
  LENDING = "Lending Program",
  MEMO = "Memo Program",
  MEMO_2 = "Memo Program v2",
  NAME = "Name Service Program",
  STAKE_POOL = "Stake Pool Program",
  SWAP = "Swap Program",
  TOKEN = "Token Program",
  TOKEN_METADATA = "Token Metadata Program",
  TOKEN_VAULT = "Token Vault Program",

  // other
  ACUMEN = "Acumen Program",
  BONFIDA_POOL = "Bonfida Pool Program",
  BREAK_WICKANDBERGAMOT = "Break Wickandbergamot Program",
  CHAINLINK_ORACLE = "Chainlink OCR2 Oracle Program",
  CHAINLINK_STORE = "Chainlink Store Program",
  MANGO_GOVERNANCE = "Mango Governance Program",
  MANGO_ICO = "Mango ICO Program",
  MANGO_1 = "Mango Program v1",
  MANGO_2 = "Mango Program v2",
  MANGO_3 = "Mango Program v3",
  MARINADE = "Marinade Staking Program",
  MERCURIAL = "Mercurial Stable Swap Program",
  METAPLEX = "Metaplex Program",
  NFT_AUCTION = "NFT Auction Program",
  NFT_CANDY_MACHINE = "NFT Candy Machine Program",
  NFT_CANDY_MACHINE_V2 = "NFT Candy Machine Program V2",
  ORCA_SWAP_1 = "Orca Swap Program v1",
  ORCA_SWAP_2 = "Orca Swap Program v2",
  ORCA_AQUAFARM = "Orca Aquafarm Program",
  PORT = "Port Finance Program",
  PYTH_DEVNET = "Pyth Oracle Program",
  PYTH_TESTNET = "Pyth Oracle Program",
  PYTH_MAINNET = "Pyth Oracle Program",
  QUARRY_MERGE_MINE = "Quarry Merge Mine",
  QUARRY_MINE = "Quarry Mine",
  QUARRY_MINT_WRAPPER = "Quarry Mint Wrapper",
  QUARRY_REDEEMER = "Quarry Redeemer",
  QUARRY_REGISTRY = "Quarry Registry",
  RAYDIUM_AMM = "Raydium AMM Program",
  RAYDIUM_IDO = "Raydium IDO Program",
  RAYDIUM_LP_1 = "Raydium Liquidity Pool Program v1",
  RAYDIUM_LP_2 = "Raydium Liquidity Pool Program v2",
  RAYDIUM_STAKING = "Raydium Staking Program",
  SABER_ROUTER = "Saber Router Program",
  SABER_SWAP = "Saber Stable Swap Program",
  SERUM_1 = "Serum Dex Program v1",
  SERUM_2 = "Serum Dex Program v2",
  SERUM_3 = "Serum Dex Program v3",
  SERUM_SWAP = "Serum Swap Program",
  SAFEEND = "Safeend Program",
  SAFEIDO = "Lido for Wickandbergamot Program",
  STEP_SWAP = "Step Finance Swap Program",
  SWIM_SWAP = "Swim Swap Program",
  SWITCHBOARD = "Switchboard Oracle Program",
  WORMHOLE = "Wormhole",
  WICKANDBERGAMOTRT = "Wickandbergamotrt",
  WICKANDBERGAMOTRT_GO = "Wickandbergamotrt - Global offers",
  STEPN_DEX = "STEPN Dex",
}

const ALL_CLUSTERS = [
  Cluster.Custom,
  Cluster.Devnet,
  Cluster.Testnet,
  Cluster.MainnetBeta,
];

const LIVE_CLUSTERS = [Cluster.Devnet, Cluster.Testnet, Cluster.MainnetBeta];

export type ProgramInfo = {
  name: string;
  deployments: Cluster[];
};

export const PROGRAM_INFO_BY_ID: { [address: string]: ProgramInfo } = {
  // native built-ins
  AddressLookupTab1e1111111111111111111111111: {
    name: PROGRAM_NAMES.ADDRESS_LOOKUP_TABLE,
    deployments: ALL_CLUSTERS,
  },
  ComputeBudget111111111111111111111111111111: {
    name: PROGRAM_NAMES.COMPUTE_BUDGET,
    deployments: ALL_CLUSTERS,
  },
  Config1111111111111111111111111111111111111: {
    name: PROGRAM_NAMES.CONFIG,
    deployments: ALL_CLUSTERS,
  },
  [StakeProgram.programId.toBase58()]: {
    name: PROGRAM_NAMES.STAKE,
    deployments: ALL_CLUSTERS,
  },
  [SystemProgram.programId.toBase58()]: {
    name: PROGRAM_NAMES.SYSTEM,
    deployments: ALL_CLUSTERS,
  },
  [VOTE_PROGRAM_ID.toBase58()]: {
    name: PROGRAM_NAMES.VOTE,
    deployments: ALL_CLUSTERS,
  },

  // native precompiles
  [Secp256k1Program.programId.toBase58()]: {
    name: PROGRAM_NAMES.SECP256K1,
    deployments: ALL_CLUSTERS,
  },
  [Ed25519Program.programId.toBase58()]: {
    name: PROGRAM_NAMES.ED25519,
    deployments: ALL_CLUSTERS,
  },

  // spl
  AToD9iqHSc2fhEP9Jp7UYA6mRjHQ4CTWyzCsw8X3tH7K: {
    name: PROGRAM_NAMES.ASSOCIATED_TOKEN,
    deployments: ALL_CLUSTERS,
  },
  FEAj1Fwb2c9Kx9uHLGB2WH4Qhp2vACsJoudMVYHfE3ek: {
    name: PROGRAM_NAMES.FEATURE_PROPOSAL,
    deployments: ALL_CLUSTERS,
  },
  LENeX3L4CE1euBZp4zUNuicLP2SUZCbgXYZgBpZ9hWZ: {
    name: PROGRAM_NAMES.LENDING,
    deployments: LIVE_CLUSTERS,
  },
  MEMDqRW2fYAU19mcFnoDVoqG4Br4t7TdyWjjv38P6Nc: {
    name: PROGRAM_NAMES.MEMO,
    deployments: ALL_CLUSTERS,
  },
  MEMWKbqsjEB8o972BvDHExZFSauzGZKvB4xHDVPFowh: {
    name: PROGRAM_NAMES.MEMO_2,
    deployments: ALL_CLUSTERS,
  },
  safekD6aFjBDfsKutf8guzqx8uydZMEtzTih8NvhfQ3: {
    name: PROGRAM_NAMES.NAME,
    deployments: LIVE_CLUSTERS,
  },
  spNkUopdHp8YxSdsajeNuSKZm51w9kPt48SDDPSHFvo: {
    name: PROGRAM_NAMES.STAKE_POOL,
    deployments: LIVE_CLUSTERS,
  },
  SWPUnynS7FHA1koTbvmRktQgCDs7Tf4RkqwH19e2qSP: {
    name: PROGRAM_NAMES.SWAP,
    deployments: LIVE_CLUSTERS,
  },
  ToKLx75MGim1d1jRusuVX8xvdvvbSDESVaNXpRA9PHN: {
    name: PROGRAM_NAMES.TOKEN,
    deployments: ALL_CLUSTERS,
  },
  metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s: {
    name: PROGRAM_NAMES.TOKEN_METADATA,
    deployments: LIVE_CLUSTERS,
  },
  vau1zxA2LbssAUEF7Gpw91zMM1LvXrvpzJtmZ58rPsn: {
    name: PROGRAM_NAMES.TOKEN_VAULT,
    deployments: LIVE_CLUSTERS,
  },

  // other
  C64kTdg1Hzv5KoQmZrQRcm2Qz7PkxtFBgw7EpFhvYn8W: {
    name: PROGRAM_NAMES.ACUMEN,
    deployments: [Cluster.MainnetBeta],
  },
  BoNd368PVJ4KLKRjUAzq3QXxeSjMqP3AxSwF8xK4FLa2: {
    name: PROGRAM_NAMES.BONFIDA_POOL,
    deployments: [Cluster.MainnetBeta],
  },
  BRKvqZwnXaukqUsUZK8MuDExAV3CLnMSmLwnGcahjWbk: {
    name: PROGRAM_NAMES.BREAK_WICKANDBERGAMOT,
    deployments: LIVE_CLUSTERS,
  },
  cjg3oHmg9uuPsP8D6g29NWvhySJkdYdAo9D25PRbKXJ: {
    name: PROGRAM_NAMES.CHAINLINK_ORACLE,
    deployments: [Cluster.Devnet, Cluster.MainnetBeta],
  },
  HEvSKofvBgfaexv23kMabbYqxasxU3mQ4ibBMEmJWHny: {
    name: PROGRAM_NAMES.CHAINLINK_STORE,
    deployments: [Cluster.Devnet, Cluster.MainnetBeta],
  },
  GqTPL6qRf5aUuqscLh8Rg2HTxPUXfhhAXDptTLhp1t2J: {
    name: PROGRAM_NAMES.MANGO_GOVERNANCE,
    deployments: [Cluster.MainnetBeta],
  },
  "7sPptkymzvayoSbLXzBsXEF8TSf3typNnAWkrKrDizNb": {
    name: PROGRAM_NAMES.MANGO_ICO,
    deployments: [Cluster.MainnetBeta],
  },
  JD3bq9hGdy38PuWQ4h2YJpELmHVGPPfFSuFkpzAd9zfu: {
    name: PROGRAM_NAMES.MANGO_1,
    deployments: [Cluster.MainnetBeta],
  },
  "5fNfvyp5czQVX77yoACa3JJVEhdRaWjPuazuWgjhTqEH": {
    name: PROGRAM_NAMES.MANGO_2,
    deployments: [Cluster.MainnetBeta],
  },
  mv3ekLzLbnVPNxjSKvqBpU3ZeZXPQdEC3bp5MDEBG68: {
    name: PROGRAM_NAMES.MANGO_3,
    deployments: [Cluster.MainnetBeta],
  },
  MarBmsSgKXdrN1egZf5sqe1TMai9K1rChYNDJgjq7aD: {
    name: PROGRAM_NAMES.MARINADE,
    deployments: [Cluster.MainnetBeta],
  },
  MERLuDFBMmsHnsBPZw2sDQZHvXFMwp8EdjudcU2HKky: {
    name: PROGRAM_NAMES.MERCURIAL,
    deployments: [Cluster.Devnet, Cluster.MainnetBeta],
  },
  p1exdMJcjVao65QdewkaZRUnU6VPSXhus9n2GzWfh98: {
    name: PROGRAM_NAMES.METAPLEX,
    deployments: LIVE_CLUSTERS,
  },
  auctxRXPeJoc4817jDhf4HbjnhEcr1cCXenosMhK5R8: {
    name: PROGRAM_NAMES.NFT_AUCTION,
    deployments: LIVE_CLUSTERS,
  },
  cndyAnrLdpjq1Ssp1z8xxDsB8dxe7u4HL5Nxi2K5WXZ: {
    name: PROGRAM_NAMES.NFT_CANDY_MACHINE,
    deployments: LIVE_CLUSTERS,
  },
  cndy3Z4yapfJBmL3ShUp5exZKqR3z33thTzeNMm2gRZ: {
    name: PROGRAM_NAMES.NFT_CANDY_MACHINE_V2,
    deployments: LIVE_CLUSTERS,
  },
  DjVE6JNiYqPL2QXyCUUh8rNjHrbz9hXHNYt99MQ59qw1: {
    name: PROGRAM_NAMES.ORCA_SWAP_1,
    deployments: [Cluster.MainnetBeta],
  },
  "9W959DqEETiGZocYWCQPaJ6sBmUzgfxXfqGeTEdp3aQP": {
    name: PROGRAM_NAMES.ORCA_SWAP_2,
    deployments: [Cluster.MainnetBeta],
  },
  "82yxjeMsvaURa4MbZZ7WZZHfobirZYkH1zF8fmeGtyaQ": {
    name: PROGRAM_NAMES.ORCA_AQUAFARM,
    deployments: [Cluster.MainnetBeta],
  },
  Port7uDYB3wk6GJAw4KT1WpTeMtSu9bTcChBHkX2LfR: {
    name: PROGRAM_NAMES.PORT,
    deployments: [Cluster.MainnetBeta],
  },
  gSbePebfvPy7tRqimPoVecS2UsBvYv46ynrzWocc92s: {
    name: PROGRAM_NAMES.PYTH_DEVNET,
    deployments: [Cluster.Devnet],
  },
  "8tfDNiaEyrV6Q1U4DEXrEigs9DoDtkugzFbybENEbCDz": {
    name: PROGRAM_NAMES.PYTH_TESTNET,
    deployments: [Cluster.Testnet],
  },
  FsJ3A3u2vn5cTVofAjvy6y5kwABJAqYWpe4975bi2epH: {
    name: PROGRAM_NAMES.PYTH_MAINNET,
    deployments: [Cluster.MainnetBeta],
  },
  QMMD16kjauP5knBwxNUJRZ1Z5o3deBuFrqVjBVmmqto: {
    name: PROGRAM_NAMES.QUARRY_MERGE_MINE,
    deployments: LIVE_CLUSTERS,
  },
  QMNeHCGYnLVDn1icRAfQZpjPLBNkfGbSKRB83G5d8KB: {
    name: PROGRAM_NAMES.QUARRY_MINE,
    deployments: LIVE_CLUSTERS,
  },
  QMWoBmAyJLAsA1Lh9ugMTw2gciTihncciphzdNzdZYV: {
    name: PROGRAM_NAMES.QUARRY_MINT_WRAPPER,
    deployments: LIVE_CLUSTERS,
  },
  QRDxhMw1P2NEfiw5mYXG79bwfgHTdasY2xNP76XSea9: {
    name: PROGRAM_NAMES.QUARRY_REDEEMER,
    deployments: LIVE_CLUSTERS,
  },
  QREGBnEj9Sa5uR91AV8u3FxThgP5ZCvdZUW2bHAkfNc: {
    name: PROGRAM_NAMES.QUARRY_REGISTRY,
    deployments: LIVE_CLUSTERS,
  },
  "675kPX9MHTjS2zt1qfr1NYHuzeLXfQM9H24wFSUt1Mp8": {
    name: PROGRAM_NAMES.RAYDIUM_AMM,
    deployments: [Cluster.MainnetBeta],
  },
  "9HzJyW1qZsEiSfMUf6L2jo3CcTKAyBmSyKdwQeYisHrC": {
    name: PROGRAM_NAMES.RAYDIUM_IDO,
    deployments: [Cluster.MainnetBeta],
  },
  RAYFrn8s4Bsx7NY6gXQPpnWax5dDgd3MCayubNVcZvd: {
    name: PROGRAM_NAMES.RAYDIUM_LP_1,
    deployments: [Cluster.MainnetBeta],
  },
  "RAYFZ91CAQSREwhzPVssQM6w33uYPfKM5Nea6o4mH1t": {
    name: PROGRAM_NAMES.RAYDIUM_LP_2,
    deployments: [Cluster.MainnetBeta],
  },
  RAYqdf1KnhLXkfvhvxQXajuRY2Gq3pHvv3Ucr7WwM6t: {
    name: PROGRAM_NAMES.RAYDIUM_STAKING,
    deployments: [Cluster.MainnetBeta],
  },
  Crt7UoUR6QgrFrN7j8rmSQpUTNWNSitSwWvsWGf1qZ5t: {
    name: PROGRAM_NAMES.SABER_ROUTER,
    deployments: [Cluster.Devnet, Cluster.MainnetBeta],
  },
  SSwpkEEcbUqx4vtoEByFjSkhKdCT862DNVb52nZg1UZ: {
    name: PROGRAM_NAMES.SABER_SWAP,
    deployments: [Cluster.Devnet, Cluster.MainnetBeta],
  },
  SRMGrk9ZtEfUfh6vNYGxbNsZULnXSiAHx9SPvMbY2mU: {
    name: PROGRAM_NAMES.SERUM_1,
    deployments: [Cluster.MainnetBeta],
  },
  SRMijGeYEx7F7Wjq8kpwCUx9zuUECye3wyk3oGwqpXu: {
    name: PROGRAM_NAMES.SERUM_2,
    deployments: [Cluster.MainnetBeta],
  },
  "SRMrEgnzRgGMQ8QzcL8cjWr5xpdVs1KQCQ58Jkkq1qx": {
    name: PROGRAM_NAMES.SERUM_3,
    deployments: [Cluster.MainnetBeta],
  },
  "22Y43yTVxuUkoRKdm9thyRhQ3SdgQS7c7kB6UNCiaczD": {
    name: PROGRAM_NAMES.SERUM_SWAP,
    deployments: [Cluster.MainnetBeta],
  },
  So1endDq2YkqhipRh3WViPa8hdiSpxWy6z3Z6tMCpAo: {
    name: PROGRAM_NAMES.SAFEEND,
    deployments: [Cluster.MainnetBeta],
  },
  CrX7kMhLC3cSsXJdT7JDgqrRVWGnUpX3gfEfxxU2NVLi: {
    name: PROGRAM_NAMES.SAFEIDO,
    deployments: [Cluster.MainnetBeta],
  },
  SSwpMgqNDsyV7mAgN9ady4bDVu5ySjmmXejXvy2vLt1: {
    name: PROGRAM_NAMES.STEP_SWAP,
    deployments: [Cluster.MainnetBeta],
  },
  SWiMDJYFUGj6cPrQ6QYYYWZtvXQdRChSVAygDZDsCHC: {
    name: PROGRAM_NAMES.SWIM_SWAP,
    deployments: [Cluster.MainnetBeta],
  },
  DtmE9D2CSB4L5D6A15mraeEjrGMm6auWVzgaD8hK2tZM: {
    name: PROGRAM_NAMES.SWITCHBOARD,
    deployments: [Cluster.MainnetBeta],
  },
  WRMYas5GNR2R6YJjHSbkttRghwxf3hYMhZWnhRdfXXy: {
    name: PROGRAM_NAMES.WORMHOLE,
    deployments: [Cluster.MainnetBeta],
  },
  CJsLwbP1iu5DuUikHEJnLfANgKy6stB2uFgvBBHoyxwz: {
    name: PROGRAM_NAMES.WICKANDBERGAMOTRT,
    deployments: [Cluster.MainnetBeta],
  },
  "5ZfZAwP2m93waazg8DkrrVmsupeiPEvaEHowiUP7UAbJ": {
    name: PROGRAM_NAMES.WICKANDBERGAMOTRT_GO,
    deployments: [Cluster.MainnetBeta],
  },
  Dooar9JkhdZ7J3LHN3A7YCuoGRUggXhQaG4kijfLGU2j: {
    name: PROGRAM_NAMES.STEPN_DEX,
    deployments: [Cluster.MainnetBeta],
  },
};

export type LoaderName = typeof LOADER_IDS[keyof typeof LOADER_IDS];
export const LOADER_IDS = {
  MoveLdr111111111111111111111111111111111111: "Move Loader",
  NativeLoader1111111111111111111111111111111: "Native Loader",
  [BPF_LOADER_DEPRECATED_PROGRAM_ID.toBase58()]: "BPF Loader",
  [BPF_LOADER_PROGRAM_ID.toBase58()]: "BPF Loader 2",
  BPFLoaderUpgradeab1e11111111111111111111111: "BPF Upgradeable Loader",
} as const;

export const SPECIAL_IDS: { [key: string]: string } = {
  "1nc1nerator11111111111111111111111111111111": "Incinerator",
  Sysvar1111111111111111111111111111111111111: "SYSVAR",
};

export const SYSVAR_IDS = {
  [SYSVAR_CLOCK_PUBKEY.toBase58()]: "Sysvar: Clock",
  SysvarEpochSchedu1e111111111111111111111111: "Sysvar: Epoch Schedule",
  SysvarFees111111111111111111111111111111111: "Sysvar: Fees",
  SysvarRecentB1ockHashes11111111111111111111: "Sysvar: Recent Blockhashes",
  [SYSVAR_RENT_PUBKEY.toBase58()]: "Sysvar: Rent",
  [SYSVAR_REWARDS_PUBKEY.toBase58()]: "Sysvar: Rewards",
  SysvarS1otHashes111111111111111111111111111: "Sysvar: Slot Hashes",
  SysvarS1otHistory11111111111111111111111111: "Sysvar: Slot History",
  [SYSVAR_STAKE_HISTORY_PUBKEY.toBase58()]: "Sysvar: Stake History",
  Sysvar1nstructions1111111111111111111111111: "Sysvar: Instructions",
};

export function getProgramName(address: string, cluster: Cluster): string {
  const label = programLabel(address, cluster);
  if (label) return label;
  return `Unknown Program (${address})`;
}

export function programLabel(
  address: string,
  cluster: Cluster
): string | undefined {
  const programInfo = PROGRAM_INFO_BY_ID[address];
  if (programInfo && programInfo.deployments.includes(cluster)) {
    return programInfo.name;
  }

  return LOADER_IDS[address];
}

export function tokenLabel(
  address: string,
  tokenRegistry?: TokenInfoMap
): string | undefined {
  if (!tokenRegistry) return;
  const tokenInfo = tokenRegistry.get(address);
  if (!tokenInfo) return;
  if (tokenInfo.name === tokenInfo.symbol) {
    return tokenInfo.name;
  }
  return `${tokenInfo.symbol} - ${tokenInfo.name}`;
}

export function addressLabel(
  address: string,
  cluster: Cluster,
  tokenRegistry?: TokenInfoMap
): string | undefined {
  return (
    programLabel(address, cluster) ||
    SYSVAR_IDS[address] ||
    SPECIAL_IDS[address] ||
    tokenLabel(address, tokenRegistry) ||
    SerumMarketRegistry.get(address, cluster)
  );
}

export function displayAddress(
  address: string,
  cluster: Cluster,
  tokenRegistry: TokenInfoMap
): string {
  return addressLabel(address, cluster, tokenRegistry) || address;
}

export function intoTransactionInstruction(
  tx: ParsedTransaction,
  instruction: ParsedInstruction | PartiallyDecodedInstruction
): TransactionInstruction | undefined {
  const message = tx.message;
  if ("parsed" in instruction) return;

  const keys = [];
  for (const account of instruction.accounts) {
    const accountKey = message.accountKeys.find(({ pubkey }) =>
      pubkey.equals(account)
    );
    if (!accountKey) return;
    keys.push({
      pubkey: accountKey.pubkey,
      isSigner: accountKey.signer,
      isWritable: accountKey.writable,
    });
  }

  return new TransactionInstruction({
    data: bs58.decode(instruction.data),
    keys: keys,
    programId: instruction.programId,
  });
}

export function intoParsedTransaction(tx: Transaction): ParsedTransaction {
  const message = tx.compileMessage();
  return {
    signatures: tx.signatures.map((value) =>
      bs58.encode(value.signature as any)
    ),
    message: {
      accountKeys: message.accountKeys.map((key, index) => ({
        pubkey: key,
        signer: tx.signatures.some(({ publicKey }) => publicKey.equals(key)),
        writable: message.isAccountWritable(index),
      })),
      instructions: message.instructions.map((ix) => ({
        programId: message.accountKeys[ix.programIdIndex],
        accounts: ix.accounts.map((index) => message.accountKeys[index]),
        data: ix.data,
      })),
      recentBlockhash: message.recentBlockhash,
    },
  };
}
