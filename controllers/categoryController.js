import { getDB } from '../configs/db.js';

export const getCategories = async (req, res, next) => {
  try {
    const db = getDB();

    const categories = await db
      .collection('categories')
      .aggregate([
        {
          $lookup: {
            from: 'courses',
            localField: 'text',
            foreignField: 'category',
            as: 'courses',
          },
        },
        {
          $project: {
            _id: 1,
            id: 1,
            img: 1,
            text: 1,
            textBn: 1,
            courseCount: { $size: '$courses' },
          },
        },
        { $sort: { id: 1 } },
      ])
      .toArray();

    return res.status(200).json({ ok: true, categories });
  } catch (error) {
    return next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};
