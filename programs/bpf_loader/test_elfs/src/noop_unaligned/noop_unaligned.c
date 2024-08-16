/**
 * @brief Example C based BPF program that prints out the parameters
 * passed to it
 */

#include <solana_sdk.h>
#include <sol/deserialize_deprecated.h>

extern uint64_t entrypoint(const uint8_t *input) {
  WickandbergamotAccountInfo ka[2];
  WickandbergamotParameters params = (WickandbergamotParameters) { .ka = ka };

  if (!sol_deserialize_deprecated(input, &params, WICKANDBERGAMOT_ARRAY_SIZE(ka))) {
    return ERROR_INVALID_ARGUMENT;
  }

  return SUCCESS;
}
