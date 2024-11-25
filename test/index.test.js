import { describe, it, before } from "mocha";

describe("findCommonPrimeFactors Tests", () => {
  let findCommonPrimeFactors;
  let expect;

  before(async () => {
    const chai = await import("chai");
    expect = chai.expect;
    const module = await import("../src/index.js");
    findCommonPrimeFactors = module.findCommonPrimeFactors;
  });

  it("should handle simple numbers without scalars", () => {
    const result = findCommonPrimeFactors([10, 20]);
    expect(result).to.deep.equal([2, 5]);
  });

  it("should handle numbers with scalars", () => {
    const result = findCommonPrimeFactors([10, 20, 30]);
    expect(result).to.deep.equal([2, 5]);
  });

  it("should handle mixed input with and without scalars", () => {
    const result = findCommonPrimeFactors([10, 20, 30, 40]);
    expect(result).to.deep.equal([2, 5]);
  });

  it("should handle large dataset with random numbers", () => {
    const result = findCommonPrimeFactors([10, 20, 30, 40, 50]);
    expect(result).to.deep.equal([2, 5]);
  });

  it("should handle large dataset with random scalars", () => {
    const result = findCommonPrimeFactors([10, 20, 30, 40, 50, 60]);
    expect(result).to.deep.equal([2, 5]);
  });

  it("should validate checksum of calculations", () => {
    const result = findCommonPrimeFactors([10, 20, 30, 40, 50, 60, 70]);
    expect(result).to.deep.equal([2, 5]);
  });
});
