import { getDB } from '../configs/db.js';

export const getStories = async (req, res, next) => {
  try {
    const db = getDB();

    const stories = await db
      .collection('stories')
      .aggregate([
        {
          $lookup: {
            from: 'courses',
            localField: 'course',
            foreignField: 'title',
            as: 'course',
          },
        },
        { $unwind: '$course' },
        {
          $sort: { id: 1 },
        },
      ])
      .toArray();

    return res.status(200).json({ ok: true, stories });
  } catch (error) {
    return next(error);
  }
};

export const getFeaturedStories = async (req, res, next) => {
  try {
    const db = getDB();

    const featuredStories = await db
      .collection('stories')
      .aggregate([
        {
          $match: { featured: true },
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'course',
            foreignField: 'title',
            as: 'course',
          },
        },
        { $unwind: '$course' },
        {
          $sort: { id: 1 },
        },
      ])
      .toArray();

    return res.status(200).json({ ok: true, featuredStories });
  } catch (error) {
    return next(error);
  }
};

export const createStory = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};

export const updateStory = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};

export const deleteStory = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};
