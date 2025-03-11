/**
 * A middleware to handle asynchronous route handler exceptions.
 *
 * This function takes an async function and returns a new function
 * that handles any rejected promises by passing the error to the
 * next middleware.
 *
 * @param {Function} fn - The asynchronous function to be wrapped.
 * @returns {Function} A new function that wraps the original async function
 * and catches any errors.
 */

export const asyncHandler = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch((err) => next(err));
  };
};
