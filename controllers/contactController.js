/* eslint-disable object-curly-newline */
import { getDB } from '../configs/db.js';
import sendEmail from '../configs/email.js';
import { adminEmail } from '../configs/variables.js';

export const createContact = async (req, res, next) => {
  try {
    const db = getDB();
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        ok: false,
        message: 'All fields are required',
      });
    }

    const newContact = {
      name,
      email,
      message,
      status: 'New',
      date: new Date(),
    };

    await db.collection('contacts').insertOne(newContact);

    await sendEmail({
      to: adminEmail,
      subject: "Contact from DCTA's website",
      html: `
            <h3>Here is the contact details:</h3>
            <p><span style:"font-weight:bold">Name:</span> ${name}</p>
            <p><span style:"font-weight:bold">Email:</span> ${email}</p>
            <p><span style:"font-weight:bold">Subject:</span> ${subject}</p>
            <p style:"font-weight:bold">Message:</p>
            <p>${message}</p>
          `,
    });

    return res.status(201).json({
      ok: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    return next(error);
  }
};

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
