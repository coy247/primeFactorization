// 1. Identify the numbers with scalars and those without. Since only a portion of the numbers have scalars, you'll need to handle these separately.
// 2. For the numbers with scalars, factor out the scalar value, so you're left with the base number. Now you have a set of base numbers and their corresponding scalars.
// 3. For each base number in the set, find its prime factorization. There are several algorithms for prime factorization, such as trial division or the Pollard's rho algorithm. Implement one of these algorithms to find the prime factors for each base number.
// 4. Keep track of the frequency of each prime factor across all the base numbers. You can use a map or a dictionary-like data structure to store the prime factors and their frequencies.
// 5. Once you have the prime factor frequencies, identify the prime factors that occur in most or all of the base numbers. These are your common prime factors.
// 6. If needed, you can also find the common prime factors considering the scalars by multiplying the scalar value with the base number's prime factors and then finding the common prime factors among these new sets of prime factors.
// 7. Analyze and interpret the common prime factors based on your specific problem or context.

function findCommonPrimeFactors(numbers) {
  const factorFrequency = new Map();

  // Helper function to remove scalars from a number
  function removeScalar(number) {
    return parseInt(String(number).replace(/[^\d.-]/g, ""));
  }

  // Get prime factorization for each number
  function getPrimeFactors(n) {
    const factors = [];
    let num = Math.abs(n); // Ensure we work with positive numbers
    while (num > 1) {
      const factor = getSmallestPrimeFactor(num);
      factors.push(factor);
      num /= factor;
    }
    return factors;
  }

  // Helper function to find the smallest prime factor of a number
  function getSmallestPrimeFactor(n) {
    let factor = 2;

    while (n % factor) {
      factor++;
    }

    return factor;
  }

  // Process each number and track factor frequency
  numbers.forEach((num) => {
    const baseNumber = removeScalar(num);
    const factors = getPrimeFactors(baseNumber);
    factors.forEach((factor) => {
      factorFrequency.set(factor, (factorFrequency.get(factor) || 0) + 1);
    });
  });

  // Identify common prime factors
  const commonFactors = [];
  factorFrequency.forEach((frequency, factor) => {
    const commonFactorThreshold = Math.floor(numbers.length * 0.75); // Adjust the threshold based on your requirements
    if (frequency >= commonFactorThreshold) {
      commonFactors.push(factor);
    }
  });

  return commonFactors;
}

export { findCommonPrimeFactors };
