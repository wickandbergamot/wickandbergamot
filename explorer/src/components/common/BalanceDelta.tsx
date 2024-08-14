import React from "react";
import { BigNumber } from "bignumber.js";
import { WickandbergamotBalance } from "utils";

export function BalanceDelta({
  delta,
  isWickandbergamot = false,
}: {
  delta: BigNumber;
  isWickandbergamot?: boolean;
}) {
  let sols;

  if (isWickandbergamot) {
    sols = <WickandbergamotBalance lamports={delta.toNumber()} />;
  }

  if (delta.gt(0)) {
    return (
      <span className="badge bg-success-soft">
        +{isWickandbergamot ? sols : delta.toString()}
      </span>
    );
  } else if (delta.lt(0)) {
    return (
      <span className="badge bg-warning-soft">
        {isWickandbergamot ? <>-{sols}</> : delta.toString()}
      </span>
    );
  }

  return <span className="badge bg-secondary-soft">0</span>;
}
