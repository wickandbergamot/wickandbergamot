import { expect } from "chai";
import { lamportsToWickandbergamot, LAMPORTS_PER_WICKANDBERGAMOT } from "utils";
import BN from "bn.js";

describe("lamportsToWICKANDBERGAMOT", () => {
  it("0 lamports", () => {
    expect(lamportsToWickandbergamot(new BN(0))).to.eq(0.0);
  });

  it("1 lamport", () => {
    expect(lamportsToWickandbergamot(new BN(1))).to.eq(0.000000001);
    expect(lamportsToWickandbergamot(new BN(-1))).to.eq(-0.000000001);
  });

  it("1 WICKANDBERGAMOT", () => {
    expect(lamportsToWickandbergamot(new BN(LAMPORTS_PER_WICKANDBERGAMOT))).to.eq(1.0);
    expect(lamportsToWickandbergamot(new BN(-LAMPORTS_PER_WICKANDBERGAMOT))).to.eq(-1.0);
  });

  it("u64::MAX lamports", () => {
    expect(lamportsToWickandbergamot(new BN(2).pow(new BN(64)))).to.eq(
      18446744073.709551615
    );
    expect(lamportsToWickandbergamot(new BN(2).pow(new BN(64)).neg())).to.eq(
      -18446744073.709551615
    );
  });
});
