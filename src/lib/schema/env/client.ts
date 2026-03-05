import { createEnv } from '@t3-oss/env-nextjs';
import { z } from 'zod';

export const env = createEnv({
  client: {
    NEXT_PUBLIC_MESSAGE: z.string(),
  },
  runtimeEnv: {
    NEXT_PUBLIC_MESSAGE: process.env.NEXT_PUBLIC_DEBUG_TEST1,
  },
  skipValidation: !!process.env.SKIP_ENV_VALIDATION,
  emptyStringAsUndefined: true,
});
