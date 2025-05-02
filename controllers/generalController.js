/* eslint-disable import/prefer-default-export */
import { getDB } from '../configs/db.js';

export const getAdminStats = async (req, res, next) => {
  try {
    const db = getDB();
    const applicationsCount = await db.collection('applications').countDocuments();
    const contactsCount = await db.collection('contacts').countDocuments();
    const newApplicationsCount = await db
      .collection('applications')
      .countDocuments({ status: 'New' });
    const newContactsCount = await db.collection('contacts').countDocuments({ status: 'New' });

    return res.status(200).json({
      ok: true,
      stats: {
        applicationsCount,
        contactsCount,
        newApplicationsCount,
        newContactsCount,
      },
    });
  } catch (error) {
    return next(error);
  }
};
