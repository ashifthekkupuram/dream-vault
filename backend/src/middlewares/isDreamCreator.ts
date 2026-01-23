import { fromNodeHeaders } from 'better-auth/node';
import { eq } from 'drizzle-orm';

import asyncHandler from '../utils/asyncHandler';
import { auth } from '../lib/auth';
import { db } from '../db';
import { dreamTable, DreamType } from '../db/schema';

const isDreamCreator = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!id || typeof id !== 'string') {
    return res.status(404).json({
      success: false,
      message: 'Invalid Dream ID',
    });
  }

  const query: DreamType[] = await db
    .select()
    .from(dreamTable)
    .where(eq(dreamTable.id, id));

  const dream: DreamType = query[0];

  if (!dream) {
    return res.status(404).json({
      success: false,
      message: 'Dream Not Found!',
    });
  }

  if (dream.userId !== session?.session.userId) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  return next();
});

export default isDreamCreator;
