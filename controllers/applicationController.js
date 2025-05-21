/* eslint-disable object-curly-newline */
import { ObjectId } from 'mongodb';
import { getDB } from '../configs/db.js';
import sendEmail from '../configs/email.js';
import { adminEmail } from '../configs/variables.js';
import { applicationTemplateAdmin } from '../email-templates/applicationTemplateAdmin.js';
import { applicationTemplateStudent } from '../email-templates/applicationTemplateStudent.js';

export const createApplication = async (req, res, next) => {
  try {
    const db = getDB();
    const { fullName, email, phone, address, message, course, batch } = req.body;

    if (!fullName || !email || !phone || !address || !course || !batch) {
      return res.status(400).json({
        ok: false,
        message: 'All fields are required',
      });
    }

    const applicationCount = await db.collection('applications').countDocuments();

    const newApplication = {
      id: applicationCount + 1,
      fullName,
      email,
      phone,
      address,
      message,
      course,
      batch,
      status: 'New',
      date: new Date(),
    };

    await db.collection('applications').insertOne(newApplication);

    return res.status(201).json({
      ok: true,
      message: 'Application created successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const createApplicationEmailSent = async (req, res, next) => {
  try {
    const { fullName, email, course } = req.body;

    await sendEmail({
      to: email,
      subject: 'Application Submitted to DCTA',
      html: applicationTemplateStudent(fullName, course),
    });

    await sendEmail({
      to: adminEmail,
      subject: 'New Application Received',
      html: applicationTemplateAdmin(course),
    });

    return res.status(200).json({
      ok: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const getApplication = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: 'Application ID is required',
      });
    }

    const application = await db.collection('applications').findOne({ _id: new ObjectId(id) });

    if (!application) {
      return res.status(404).json({
        ok: false,
        message: 'Application not found',
      });
    }

    return res.status(200).json({
      ok: true,
      application,
    });
  } catch (error) {
    return next(error);
  }
};

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

export const updateApplicationStatus = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).json({
        ok: false,
        message: 'Application ID and status are required',
      });
    }

    const updatedApplication = await db
      .collection('applications')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { status } },
        { returnDocument: 'after' },
      );

    if (!updatedApplication) {
      return res.status(404).json({
        ok: false,
        message: 'Application not found',
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Application status updated successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const updateAdminNote = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const { adminNote } = req.body;

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: 'Application ID is required',
      });
    }

    const updatedApplication = await db
      .collection('applications')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { adminNote } },
        { returnDocument: 'after' },
      );

    if (!updatedApplication) {
      return res.status(404).json({
        ok: false,
        message: 'Application not found',
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Admin Note updated successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteApplication = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: 'Application ID is required',
      });
    }

    const deletedApplication = await db
      .collection('applications')
      .deleteOne({ _id: new ObjectId(id) });

    if (!deletedApplication.deletedCount) {
      return res.status(404).json({
        ok: false,
        message: 'Application not found',
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Application deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
};
