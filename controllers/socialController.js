import { getDB } from '../configs/db.js';

export const getSocials = async (req, res, next) => {
  try {
    const db = getDB();
    const socials = await db.collection('socials').find().sort({ id: 1 }).toArray();
    return res.status(200).json({ ok: true, socials });
  } catch (error) {
    return next(error);
  }
};

export const createSocial = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};

export const updateSocial = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};

export const deleteSocial = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};
