/**
 * The function returns a number that is within a specified range of minimum and maximum values.
 * @param {number} value - The value parameter is a number that we want to ensure falls within a
 * certain range defined by the min and max parameters.
 * @param {number} min - The `min` parameter in the `intMinMax` function is a number representing the
 * minimum value that the `value` parameter can be. If the `value` parameter is less than `min`, the
 * function will return `min`.
 * @param {number} max - The "max" parameter in the "intMinMax" function is a number that represents
 * the maximum value that the "value" parameter can be. If the "value" parameter is greater than the
 * "max" parameter, the function will return the "max" parameter.
 * @returns The function `intMinMax` returns a number that is limited to a range between `min` and
 * `max`. If the `value` is less than `min`, it returns `min`. If the `value` is greater than `max`, it
 * returns `max`. Otherwise, it returns the original `value`.
 */
export function intMinMax(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}
