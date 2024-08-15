import { TransactionInstruction } from "@wickandbergamot/web3.js";

export const PROGRAM_IDS: string[] = [
  "WRMYas5GNR2R6YJjHSbkttRghwxf3hYMhZWnhRdfXXy", // mainnet / testnet / devnet
];

const INSTRUCTION_LOOKUP: { [key: number]: string } = {
  0: "Initialize Bridge",
  1: "Transfer Assets Out",
  2: "Post VAA",
  3: "Evict Transfer Proposal",
  4: "Evict Claimed VAA",
  5: "Poke Proposal",
  6: "Verify Signatures",
  7: "Create Wrapped Asset",
};

export function isWormholeInstruction(
  instruction: TransactionInstruction
): boolean {
  return PROGRAM_IDS.includes(instruction.programId.toBase58());
}

export function parsWormholeInstructionTitle(
  instruction: TransactionInstruction
): string {
  const code = instruction.data[0];

  if (!(code in INSTRUCTION_LOOKUP)) {
    throw new Error(`Unrecognized Wormhole instruction code: ${code}`);
  }

  return INSTRUCTION_LOOKUP[code];
}
