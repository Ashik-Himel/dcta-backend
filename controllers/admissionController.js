import { getDB } from '../configs/db.js';

export const getRecentApplications = async (req, res, next) => {
  try {
    const db = getDB();
    const recentApplications = await db
      .collection('applications')
      .find()
      .sort({ date: -1 })
      .limit(5)
      .toArray();

    return res.status(200).json({
      ok: true,
      recentApplications,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllApplications = async (req, res, next) => {
  try {
    const db = getDB();
    const allApplications = await db.collection('applications').find().sort({ date: -1 }).toArray();

    return res.status(200).json({
      ok: true,
      allApplications,
    });
  } catch (error) {
    return next(error);
  }
};
