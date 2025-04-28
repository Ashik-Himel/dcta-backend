/* eslint-disable object-curly-newline */
import { getDB } from '../configs/db.js';
import sendEmail from '../configs/email.js';
import { adminEmail } from '../configs/variables.js';

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

    const newApplication = {
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

    await sendEmail({
      to: email,
      subject: 'Application Received',
      html: `
        <p>Dear ${fullName},</p>
        <p>Thank you for your application for the ${course} course.</p>
        <p>We will review your application and get back to you soon.</p>
        <br />
        <p>Best regards,</p>
        <p>DCTA Team</p>
      `,
    });

    await sendEmail({
      to: adminEmail,
      subject: 'New Application Received',
      html: `
        <p>Dear Admin,</p>
        <p>A new application has been received on the ${course} course.</p>
        <p>Login to the DCTA admin panel to view details.</p>
        <br />
        <p>Thank You!</p>
      `,
    });

    await db.collection('applications').insertOne(newApplication);

    return res.status(201).json({
      ok: true,
      message: 'Application created successfully',
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
