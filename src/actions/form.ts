import z from 'zod';

import { MyFormSchema } from '@/lib/schema/form';

import type { MyFormSchemaType } from '@/types/form';

// server action
export async function myFormAction(data: MyFormSchemaType) {
  const result = MyFormSchema.safeParse(data);
  if (!result.success) {
    return {
      success: result.success,
      error: z.flattenError(result.error),
    };
  }
  return result;
}
