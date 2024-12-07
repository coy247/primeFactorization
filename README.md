# Prime Factorization

This project provides utilities for prime factorization, sorting factors, converting to prime exponent form, and finding common factors.

## Features

- Sort factors in ascending order
- Convert factors to prime exponent form
- Find common factors across multiple lists
- Identify common prime factors

## Installation

To install the dependencies, run:

```bash
npm install
```

## Usage

To run the application, run:

```bash
npm start
```

## Examples

```javascript
const factors = [4, 2, 8, 16];
const sorted = sortFactors(factors); // [2, 4, 8, 16]
const primeForm = toPrimeExponents(factors); // 2^4

const list1 = [8, 12, 24];
const list2 = [6, 12, 18];
const common = findCommonFactors(list1, list2); // [2, 2, 3]
```

## License

MIT
