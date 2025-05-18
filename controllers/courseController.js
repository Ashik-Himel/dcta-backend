import { getDB } from '../configs/db.js';

export const getCourses = async (req, res, next) => {
  try {
    const db = getDB();

    const courses = await db
      .collection('courses')
      .aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: 'text',
            as: 'category',
          },
        },
        { $unwind: '$category' },
        {
          $lookup: {
            from: 'badges',
            localField: 'badge',
            foreignField: 'text',
            as: 'badge',
          },
        },
        {
          $unwind: {
            path: '$badge',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { id: 1 },
        },
      ])
      .toArray();

    return res.status(200).json({ ok: true, courses });
  } catch (error) {
    return next(error);
  }
};

export const getPopularCourses = async (req, res, next) => {
  try {
    const db = getDB();

    const popularCourses = await db
      .collection('courses')
      .aggregate([
        {
          $match: { featured: true },
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: 'text',
            as: 'category',
          },
        },
        { $unwind: '$category' },
        {
          $lookup: {
            from: 'badges',
            localField: 'badge',
            foreignField: 'text',
            as: 'badge',
          },
        },
        {
          $unwind: {
            path: '$badge',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { id: 1 },
        },
      ])
      .toArray();

    return res.status(200).json({ ok: true, popularCourses });
  } catch (error) {
    return next(error);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};
