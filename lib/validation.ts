
import { z } from 'zod';

export const courseSchema = z.object({
  title: z.string().min(2),
  code: z.string().min(2),
  credits: z.number().int().nonnegative(),
});
