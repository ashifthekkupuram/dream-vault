import { fromNodeHeaders } from 'better-auth/node';

import { auth } from '../lib/auth';
import asyncHandler from '../utils/asyncHandler';

const isAuthenticated = asyncHandler(async (req, res, next) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  if (!session?.session) {
    return res.status(403).json({
      success: false,
      message: 'Unauthorized',
    });
  }

  next();
});

export default isAuthenticated;
