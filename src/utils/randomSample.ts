/**
 * Chooses n unique random elements from a given array.
 * @param {Array} arr - Array to sample from
 * @param {Number} n - Size of the sample
 * @returns {Array} Returns n random elements from the array
 */
export function randomSample<T>(arr: T[], n: number): T[] {
  if (n > arr.length)
    throw new Error("Sample size cannot be greater than array length.");

  const result = [];
  const copy = [...arr];
  for (let i = 0; i < n; i++) {
    const index = Math.floor(Math.random() * copy.length);
    result.push(copy[index]);
    copy.splice(index, 1);
  }
  return result;
}

export default randomSample;
