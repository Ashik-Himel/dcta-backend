import { getDB } from '../configs/db.js';

export const getInstructors = async (req, res, next) => {
  try {
    const db = getDB();

    const instructors = await db
      .collection('instructors')
      .aggregate([
        { $unwind: '$socials' },
        {
          $lookup: {
            from: 'socials',
            localField: 'socials.name',
            foreignField: 'name',
            as: 'socialMeta',
          },
        },
        {
          $addFields: {
            socials: {
              $mergeObjects: ['$socials', { $arrayElemAt: ['$socialMeta', 0] }],
            },
          },
        },
        {
          $group: {
            _id: '$_id',
            id: { $first: '$id' },
            name: { $first: '$name' },
            nameBn: { $first: '$nameBn' },
            title: { $first: '$title' },
            titleBn: { $first: '$titleBn' },
            photo: { $first: '$photo' },
            socials: { $push: '$socials' },
          },
        },
        { $sort: { id: 1 } },
      ])
      .toArray();

    return res.status(200).json({ ok: true, instructors });
  } catch (error) {
    return next(error);
  }
};

export const createInstructor = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};

export const updateInstructor = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};

export const deleteInstructor = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};
