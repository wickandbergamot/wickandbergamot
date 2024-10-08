/**
 * @brief Example C-based BPF program that prints out the parameters
 * passed to it
 */
#include <sol/types.h>
#include <sol/log.h>
#include <sol/deserialize_deprecated.h>

extern uint64_t entrypoint(const uint8_t *input) {
  WickandbergamotAccountInfo ka[1];
  WickandbergamotParameters params = (WickandbergamotParameters) { .ka = ka };

  sol_log(__FILE__);

  if (!sol_deserialize_deprecated(input, &params, WICKANDBERGAMOT_ARRAY_SIZE(ka))) {
    return ERROR_INVALID_ARGUMENT;
  }

  // Log the provided input parameters.  In the case of  the no-op
  // program, no account keys or input data are expected but real
  // programs will have specific requirements so they can do their work.
  sol_log_params(&params);
  return SUCCESS;
}
