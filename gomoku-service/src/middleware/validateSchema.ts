/**
 * The file is from lectures/tutorials by Yihan Lu and Le Kang
 */

import { Request, Response, NextFunction } from 'express'
import { AnyZodObject } from 'zod'

/**
 * Middleware function to validate request data against a schema.
 * @param {AnyZodObject} schema - The schema to validate against.
 * @returns {function} - Express middleware function that performs validation.
 */
const validate =
    (schema: AnyZodObject) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse({
                    body: req.body,
                    query: req.query,
                    params: req.params,
                });
                next();
            } catch (e: any) {
                return res.status(400).send(e.errors);
            }
        }

export default validate;