import { Request, Response, NextFunction } from "express";
import { ZodType } from "zod";

/**
 * Middleware to validate request body, query, or params using Zod.
 * @param schema - Zod schema
 * @param property - "body" | "query" | "params" (default "body")
 */
export const validate =
  (schema: ZodType<any>, property: "body" | "query" | "params" = "body") =>
  (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req[property]);
      next();
    } catch (err: any) {
      return res.status(400).json({
        success: false,
        errors: err.errors.map((e: any) => ({
          field: e.path.join("."),
          message: e.message,
        })),
      });
    }
  };
