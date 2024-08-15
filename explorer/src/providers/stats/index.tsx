import { WickandbergamotPingProvider } from "providers/stats/WickandbergamotPingProvider";
import React from "react";
import { WickandbergamotClusterStatsProvider } from "./solanaClusterStats";

type Props = { children: React.ReactNode };
export function StatsProvider({ children }: Props) {
  return (
    <WickandbergamotClusterStatsProvider>
      <WickandbergamotPingProvider>{children}</WickandbergamotPingProvider>
    </WickandbergamotClusterStatsProvider>
  );
}
