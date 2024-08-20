#pragma once
/**
 * @brief Wickandbergamot Public key
 */

#include <sol/types.h>

#ifdef __cplusplus
extern "C" {
#endif

/**
 * Size of Public key in bytes
 */
#define SIZE_PUBKEY 32

/**
 * Public key
 */
typedef struct {
  uint8_t x[SIZE_PUBKEY];
} WickandbergamotPubkey;

/**
 * Prints the hexadecimal representation of a public key
 *
 * @param key The public key to print
 */
/* DO NOT MODIFY THIS GENERATED FILE. INSTEAD CHANGE sdk/bpf/c/inc/sol/inc/pubkey.inc AND RUN `cargo run --bin gen-headers` */
#ifndef WICKANDBERGAMOT_SBFV2
void sol_log_pubkey(const WickandbergamotPubkey *);
#else
typedef void(*sol_log_pubkey_pointer_type)(const WickandbergamotPubkey *);
static void sol_log_pubkey(const WickandbergamotPubkey * arg1) {
  sol_log_pubkey_pointer_type sol_log_pubkey_pointer = (sol_log_pubkey_pointer_type) 2129692874;
  sol_log_pubkey_pointer(arg1);
}
#endif

/**
 * Compares two public keys
 *
 * @param one First public key
 * @param two Second public key
 * @return true if the same
 */
static bool WickandbergamotPubkey_same(const WickandbergamotPubkey *one, const WickandbergamotPubkey *two) {
  for (int i = 0; i < sizeof(*one); i++) {
    if (one->x[i] != two->x[i]) {
      return false;
    }
  }
  return true;
}

/**
 * Seed used to create a program address or passed to sol_invoke_signed
 */
typedef struct {
  const uint8_t *addr; /** Seed bytes */
  uint64_t len; /** Length of the seed bytes */
} WickandbergamotSignerSeed;

/**
 * Seeds used by a signer to create a program address or passed to
 * sol_invoke_signed
 */
typedef struct {
  const WickandbergamotSignerSeed *addr; /** An array of a signer's seeds */
  uint64_t len; /** Number of seeds */
} WickandbergamotSignerSeeds;

/**
 * Create a program address
 *
 * @param seeds Seed bytes used to sign program accounts
 * @param seeds_len Length of the seeds array
 * @param program_id Program id of the signer
 * @param program_address Program address created, filled on return
 */
/* DO NOT MODIFY THIS GENERATED FILE. INSTEAD CHANGE sdk/bpf/c/inc/sol/inc/pubkey.inc AND RUN `cargo run --bin gen-headers` */
#ifndef Wickandbergamot_SBFV2
uint64_t sol_create_program_address(const WickandbergamotSignerSeed *, int, const WickandbergamotPubkey *, WickandbergamotPubkey *);
#else
typedef uint64_t(*sol_create_program_address_pointer_type)(const WickandbergamotSignerSeed *, int, const WickandbergamotPubkey *, WickandbergamotPubkey *);
static uint64_t sol_create_program_address(const WickandbergamotSignerSeed * arg1, int arg2, const WickandbergamotPubkey * arg3, WickandbergamotPubkey * arg4) {
  sol_create_program_address_pointer_type sol_create_program_address_pointer = (sol_create_program_address_pointer_type) 2474062396;
  return sol_create_program_address_pointer(arg1, arg2, arg3, arg4);
}
#endif

/**
 * Try to find a program address and return corresponding bump seed
 *
 * @param seeds Seed bytes used to sign program accounts
 * @param seeds_len Length of the seeds array
 * @param program_id Program id of the signer
 * @param program_address Program address created, filled on return
 * @param bump_seed Bump seed required to create a valid program address
 */
/* DO NOT MODIFY THIS GENERATED FILE. INSTEAD CHANGE sdk/bpf/c/inc/sol/inc/pubkey.inc AND RUN `cargo run --bin gen-headers` */
#ifndef WICKANDBERGAMOT_SBFV2
uint64_t sol_try_find_program_address(const WickandbergamotSignerSeed *, int, const WickandbergamotPubkey *, WickandbergamotPubkey *, uint8_t *);
#else
typedef uint64_t(*sol_try_find_program_address_pointer_type)(const WickandbergamotSignerSeed *, int, const WickandbergamotPubkey *, WickandbergamotPubkey *, uint8_t *);
static uint64_t sol_try_find_program_address(const WickandbergamotSignerSeed * arg1, int arg2, const WickandbergamotPubkey * arg3, WickandbergamotPubkey * arg4, uint8_t * arg5) {
  sol_try_find_program_address_pointer_type sol_try_find_program_address_pointer = (sol_try_find_program_address_pointer_type) 1213221432;
  return sol_try_find_program_address_pointer(arg1, arg2, arg3, arg4, arg5);
}
#endif

#ifdef Wickandbergamot_TEST
/**
 * Stub functions when building tests
 */
#include <stdio.h>

void sol_log_pubkey(
  const WickandbergamotPubkey *pubkey
) {
  printf("Program log: ");
  for (int i = 0; i < SIZE_PUBKEY; i++) {
    printf("%02 ", pubkey->x[i]);
  }
  printf("\n");
}

#endif

#ifdef __cplusplus
}
#endif

/**@}*/
