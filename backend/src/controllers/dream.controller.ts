import asyncHandler from '../utils/asyncHandler';

export const getDreams = asyncHandler(async (req, res) => {
  return res.json({
    success: true,
    message: 'GET Dreams',
  });
});

export const getDream = asyncHandler(async (req, res) => {
  return res.json({
    success: true,
    message: 'GET Dream',
  });
});

export const createDream = asyncHandler(async (req, res) => {
  return res.json({
    success: true,
    message: 'POST Dream',
  });
});

export const updateDream = asyncHandler(async (req, res) => {
  return res.json({
    success: true,
    message: 'PUT Dream',
  });
});

export const deleteDream = asyncHandler(async (req, res) => {
  return res.json({
    success: true,
    message: 'DELETE Dream',
  });
});
