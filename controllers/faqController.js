import { getDB } from '../configs/db.js';

export const getFaqs = async (req, res, next) => {
  try {
    const db = getDB();
    const faqs = await db.collection('faqs').find().sort({ id: 1 }).toArray();
    return res.status(200).json({ ok: true, faqs });
  } catch (error) {
    return next(error);
  }
};

export const createFaq = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};

export const updateFaq = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};

export const deleteFaq = async (req, res, next) => {
  try {
    return res.status(200).json({ ok: true, message: 'API is not ready' });
  } catch (error) {
    return next(error);
  }
};
