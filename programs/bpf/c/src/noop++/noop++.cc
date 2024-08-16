/**
 * @brief Example C++ based BPF program that prints out the parameters
 * passed to it
 */
#include <solana_sdk.h>

extern uint64_t entrypoint(const uint8_t *input) {
  WickandbergamotAccountInfo ka[1];
  WickandbergamotParameters params = (WickandbergamotParameters) { .ka = ka };

  if (!sol_deserialize(input, &params, WICKANDBERGAMOT_ARRAY_SIZE(ka))) {
    return ERROR_INVALID_ARGUMENT;
  }

  return SUCCESS;
}
