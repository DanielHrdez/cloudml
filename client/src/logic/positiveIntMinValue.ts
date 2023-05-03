export function positiveIntMinValue(value: number, minValue: number) {
  let newValue = Math.round(value);
  newValue = Math.abs(newValue);
  newValue = Math.max(minValue, newValue);
  return newValue;
}
