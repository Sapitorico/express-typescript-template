/**
 * This helper wraps async promises to handle errors and avoid direct try/catch blocks,
 * improving readability and reducing code repetition.
 *
 * @template T The type of data the promise resolves with.
 * @param {Promise<T>} promise The promise to wrap and handle.
 * @returns {Promise<[T, null] | [null, Error]>} A promise that resolves with an array containing the result and null on success, or null and the error on failure.
 *
 * @example
 * const [data, error] = await catchErrorAsync(fetch('/api/users'));
 * if (error) {
 *   console.error('Error fetching users:', error);
 * } else {
 *   console.log('Users:', data);
 * }
 */
export const catchErrorAsync = async <T>(promise: Promise<T>): Promise<[T, null] | [null, Error]> => {
  try {
    const data = await promise
    return [data, null]
  } catch (error) {
    if (error instanceof Error) {
      return [null, error]
    } else {
      return [null, new Error(String(error))]
    }
  }
}
