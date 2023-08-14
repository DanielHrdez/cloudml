
/**
 * This TypeScript function rounds a number to a specified number of decimal places.
 * @param {number} num - The number that needs to be rounded to a certain number of decimal places.
 * @param {number} [decimals=2] - The "decimals" parameter is a number that specifies the number of
 * decimal places to round the "num" parameter to. If the "decimals" parameter is not provided, it
 * defaults to 2.
 * @returns a number that is the result of rounding the input `num` to the specified number of
 * `decimals`.
 */
export function roundDecimals(num: number, decimals: number = 2): number {
  const factor = Math.pow(10, decimals);
  return Math.round(num * factor) / factor;
}