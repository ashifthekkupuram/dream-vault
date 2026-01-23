import { fromNodeHeaders } from 'better-auth/node';
import { eq } from 'drizzle-orm';

import { auth } from '../lib/auth';
import asyncHandler from '../utils/asyncHandler';
import { dreamTable, DreamType, NewDreamType } from '../db/schema';
import { db } from '../db';
import { DreamBodyType } from '../types/dream.type';

export const getDreams = asyncHandler(async (req, res) => {
  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  const dreams: DreamType[] = await db
    .select()
    .from(dreamTable)
    .where(eq(dreamTable.userId, session?.session.userId || ''));

  return res.json({
    success: true,
    message: 'Dreams Retrieved',
    data: dreams,
  });
});

export const getDream = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const [dream]: DreamType[] = await db
    .select()
    .from(dreamTable)
    .where(eq(dreamTable.id, id));

  return res.json({
    success: true,
    message: 'Dream Retrieved',
    data: dream,
  });
});

export const createDream = asyncHandler(async (req, res) => {
  const body: DreamBodyType = req.body;

  const session = await auth.api.getSession({
    headers: fromNodeHeaders(req.headers),
  });

  const values: NewDreamType = {
    ...body,
    userId: session?.session.userId || '',
  };

  const [newDream]: DreamType[] = await db
    .insert(dreamTable)
    .values(values)
    .returning();

  if (!newDream) {
    return res.status(400).json({
      success: false,
      message: 'Dream creation failed',
    });
  }

  return res.status(201).json({
    success: true,
    message: 'Dream created successfully',
    data: newDream,
  });
});

export const updateDream = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);
  const body: DreamBodyType = req.body;

  const [updatedDream]: DreamType[] = await db
    .update(dreamTable)
    .set(body)
    .where(eq(dreamTable.id, id))
    .returning();

  if (!updatedDream) {
    return res.status(400).json({
      success: false,
      message: 'Dream updation failed',
    });
  }

  return res.json({
    success: true,
    message: 'Dream updated',
    data: updatedDream,
  });
});

export const deleteDream = asyncHandler(async (req, res) => {
  const id = Number(req.params.id);

  const [deletedDream]: DreamType[] = await db
    .delete(dreamTable)
    .where(eq(dreamTable.id, id))
    .returning();

  if (!deletedDream) {
    return res.status(400).json({
      success: false,
      message: 'Dream deletion failed',
    });
  }

  return res.json({
    success: true,
    message: 'DELETE Dream',
    data: deletedDream,
  });
});
