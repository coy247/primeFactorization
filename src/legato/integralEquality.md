# Numerical Integration Example

In this example, integrand represents the function to be integrated. The integrate function applies the Midpoint Rule for a given integrand f, integration bounds (xMin, xMax, yMin, yMax), and number of subdivisions n. The integral function is a wrapper that calls integrate with the integrand function.
You can call the integral function with the specific x and y integration bounds and the number of subdivisions to estimate the integral's value for that region. Note that this method provides an approximation, and the accuracy improves as you increase the number of subdivisions (n).
Keep in mind that in this particular case, since the original double integral has been simplified to a closed-form expression depending only on R, this numerical integration approach is only for illustrative purposes.
