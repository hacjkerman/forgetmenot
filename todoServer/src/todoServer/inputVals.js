import { logger } from "./logger/logger.js";
export function inputValidator(fn, inputs) {
  return function (req, res) {
    for (let i = 0; i < inputs.length; i++) {
      const input = req.body[inputs[i]];
      if (input === undefined || input === "") {
        logger.log({
          level: "error",
          message: "Missing required fields " + inputs[i],
        });
        return res.json({
          error: "Missing required fields: " + inputs[i],
        });
      }
    }
    return fn(req, res);
  };
}
export function getInputsValidator(fn, inputs) {
  return function (req, res) {
    for (let i = 0; i < inputs.length; i++) {
      const input = req.query[inputs[i]];
      if (input === undefined || input === "") {
        logger.log({
          level: "error",
          message: "Missing required fields" + inputs[i],
        });
        return res.json({ error: "Missing required fields" + inputs[i] });
      }
    }
    return fn(req, res);
  };
}
