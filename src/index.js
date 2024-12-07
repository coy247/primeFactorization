import {
  sortFactors,
  toPrimeExponentForm,
  findCommonFactors,
} from "./primeSort.js";

import { data } from "./input.js";

function primeSort() {
  // const testArray = [5, 2, 3, 2];
  const testArray = data;
  const sorted = sortFactors(testArray);
  const primeForm = toPrimeExponentForm(testArray);
  const common = findCommonFactors([testArray]); // Pass array of arrays

  console.log('Sorted factors:', sorted);
  console.log('Prime exponent form:', primeForm);
  console.log('Common factors:', common);

  return { sorted, primeForm, common };
}

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

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  const testArray = [5, 2, 3, 2];
  console.log('Sorted factors:', sortFactors(testArray));
  console.log('Prime exponent form:', toPrimeExponentForm(testArray));
  console.log('Common factors:', findCommonFactors([testArray]));
}

export { findCommonPrimeFactors };

console.log("src/index loaded successfully!");

async function startAndMonitorServer() {
  try {
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    const serverStartPromise = new Promise((resolve, reject) => {
      console.log("Starting server...");
      // Server startup simulation
      setTimeout(() => {
        resolve("Server started successfully");
      }, 1000);
    });

    const result = await Promise.race([
      serverStartPromise,
      wait(5000).then(() => Promise.reject("Server startup timed out")),
    ]);

    console.log(result);
    return true;
  } catch (error) {
    console.error(error);
    console.log("Attempting to restart server...");
    await startAndMonitorServer();
    return true;
  }
}

// Main execution
if (import.meta.url === `file://${process.argv[1]}`) {
  startAndMonitorServer()
    .then(() => {
      process.on("SIGINT", () => {
        console.log("Shutting down server...");
        process.exit(0);
      });
    })
    .catch((error) => {
      console.error("Failed to start server:", error);
    });
}

primeSort();
export default startAndMonitorServer;
