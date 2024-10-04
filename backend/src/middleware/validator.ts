import { RequestHandler } from "express";
import * as yup from "yup";
export const validator =
  (schema: any): RequestHandler =>
  async (req, res, next): Promise<any> => {
    try {
      if (!req.body) {
        return res.json({ error: "Invalid request" });
      }
      // console.log(req.body);
      const schemaToValidate = yup.object({
        body: schema,
      });

      // await schema.validate(req.body);
      await schemaToValidate.validate({ body: req.body }, { abortEarly: true });

      return next();
    } catch (err) {
      if (err instanceof Error) {
        return res.status(400).json({ error: err.message });
      }
      return res.status(400).send(err);
    }
  };
