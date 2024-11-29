import { describe, it, before } from "mocha";

describe("Prime Factor Sorting Tests", () => {
  let sortFactors,
    toPrimeExponentForm,
    findCommonFactors,
    findCommonPrimeFactors;
  let expect;

  before(async () => {
    const chai = await import("chai");
    expect = chai.expect;
    const primeSort = await import("./primeSort.js");
    const index = await import("./index.js");
    sortFactors = primeSort.sortFactors;
    toPrimeExponentForm = primeSort.toPrimeExponentForm;
    findCommonFactors = primeSort.findCommonFactors;
    findCommonPrimeFactors = index.findCommonPrimeFactors;
  });

  describe("Basic Function Tests", () => {
    it("should sort factors in ascending order", () => {
      expect(sortFactors([5, 2, 3, 2])).to.deep.equal([2, 2, 3, 5]);
    });

    it("should convert to prime exponent form", () => {
      expect(toPrimeExponentForm([2, 2, 3, 3, 3, 5])).to.equal(
        "2^2 * 3^3 * 5^1"
      );
    });

    it("should find common factors with counts", () => {
      const result = findCommonFactors([
        [2, 2, 3],
        [2, 3, 3],
        [2, 2, 3],
      ]);
      expect([...result.entries()]).to.deep.equal([
        [2, 1],
        [3, 1],
      ]);
    });
  });

  describe("Integration with Prime Factorization", () => {
    it("should process prime factors of [10, 20]", () => {
      const primeFactors = findCommonPrimeFactors([10, 20]);
      expect(sortFactors(primeFactors)).to.deep.equal([2, 5]);
      expect(toPrimeExponentForm(primeFactors)).to.equal("2^1 * 5^1");
    });

    it("should process prime factors of [12, 18]", () => {
      const primeFactors = findCommonPrimeFactors([12, 18]);
      expect(sortFactors(primeFactors)).to.deep.equal([2, 3]);
      expect(toPrimeExponentForm(primeFactors)).to.equal("2^1 * 3^1");
    });

    it("should find common factors across multiple numbers", () => {
      const numbers = [10, 20, 30, 40, 50];
      const primeFactors = findCommonPrimeFactors(numbers);
      const commonFactors = findCommonFactors(
        numbers.map((n) => findCommonPrimeFactors([n]))
      );
      expect([...commonFactors.keys()].sort()).to.deep.equal([2, 5]);
    });
  });
});
