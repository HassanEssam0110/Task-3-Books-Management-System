import { AppError } from "../utils/index.utils.js";

const reqKeys = ["body", "query", "params", "headers", "file", "files"];

const validator = (schema) => {
  return (req, res, next) => {
    const errors = reqKeys.reduce((acc, key) => {
      const { error } =
        schema[key]?.validate(req[key], { abortEarly: false }) || {};

      if (error) {
        acc.push(
          ...error.details.map((err) => ({
            label: err.context.label,
            message: err.message,
          }))
        );
      }

      return acc;
    }, []);

    return errors.length
      ? next(new AppError(422, "Validation Error", errors))
      : next();
  };
};

export { validator };
