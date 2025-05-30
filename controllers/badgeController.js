import { getDB } from '../configs/db.js';

export const getBadges = async (req, res, next) => {
  try {
    const db = getDB();
    const badges = await db.collection('badges').find().sort({ id: 1 }).toArray();
    return res.status(200).json({ ok: true, badges });
  } catch (error) {
    return next(error);
  }
};

export const createBadge = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};

export const updateBadge = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};

export const deleteBadge = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};
