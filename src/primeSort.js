// Sorting the factors within each list: This could help you quickly identify the prime factors and their relative magnitudes.
// Converting the list of factors to prime exponent form: This form represents the prime factorization of a number by expressing each prime factor as a base with its corresponding exponent, such as 2^2 * 3^3 * 5^1 instead of [2, 2, 3, 3, 3, 5].
// Identifying patterns or relationships between different factorizations: Depending on the context and purpose of this data, you might be interested in exploring how these factorizations relate to one another or whether they share common factors.

function sortFactors(factors) {
  return factors.sort((a, b) => a - b);
}

function toPrimeExponentForm(factors) {
  const counts = {};
  factors.forEach((factor) => {
    counts[factor] = (counts[factor] || 0) + 1;
  });

  return Object.entries(counts)
    .map(([base, exponent]) => `${base}^${exponent}`)
    .join(" * ");
}

function findCommonFactors(factorLists) {
  if (!Array.isArray(factorLists)) {
    return new Map();
  }

  if (!factorLists.length) {
    return new Map();
  }

  const commonFactors = new Map();
  const firstList = Array.isArray(factorLists[0]) 
    ? [...new Set(factorLists[0])]
    : [factorLists[0]];

  firstList.forEach((factor) => {
    if (factorLists.every((list) => 
      Array.isArray(list) ? list.includes(factor) : list === factor
    )) {
      commonFactors.set(
        factor,
        Math.min(
          ...factorLists.map((list) => 
            Array.isArray(list) 
              ? list.filter((n) => n === factor).length 
              : (list === factor ? 1 : 0)
          )
        )
      );
    }
  });

  return commonFactors;
}

console.log('src/primeSort loaded successfully!')

export {
  sortFactors,
  toPrimeExponentForm,
  findCommonFactors
};
