import { getDB } from '../configs/db.js';

export const getRecentContacts = async (req, res, next) => {
  try {
    const db = getDB();
    const recentContacts = await db
      .collection('contacts')
      .find()
      .sort({ date: -1 })
      .limit(5)
      .toArray();

    return res.status(200).json({
      ok: true,
      recentContacts,
    });
  } catch (error) {
    return next(error);
  }
};

export const getAllContacts = async (req, res, next) => {
  try {
    const db = getDB();
    const allContacts = await db.collection('contacts').find().sort({ date: -1 }).toArray();

    return res.status(200).json({
      ok: true,
      allContacts,
    });
  } catch (error) {
    return next(error);
  }
};
