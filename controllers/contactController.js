/* eslint-disable object-curly-newline */
import { ObjectId } from 'mongodb';
import { getDB } from '../configs/db.js';
import sendEmail from '../configs/email.js';
import { adminEmail } from '../configs/variables.js';
import { contactTemplate } from '../email-templates/contactTemplate.js';

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

    const contactCount = await db.collection('contacts').countDocuments();

    const newContact = {
      id: contactCount + 1,
      name,
      email,
      subject,
      message,
      status: 'New',
      date: new Date(),
    };

    await db.collection('contacts').insertOne(newContact);

    return res.status(201).json({
      ok: true,
      message: 'Message sent successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const createContactEmailSent = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    await sendEmail({
      to: adminEmail,
      subject: "New Contact from DCTA's website",
      html: contactTemplate(name, email, subject, message),
    });

    return res.status(200).json({
      ok: true,
      message: 'Email sent successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const getContact = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: 'Contact ID is required',
      });
    }

    const contact = await db.collection('contacts').findOne({ _id: new ObjectId(id) });

    if (!contact) {
      return res.status(404).json({
        ok: false,
        message: 'Contact not found',
      });
    }

    return res.status(200).json({
      ok: true,
      contact,
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

export const updateContactStatus = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;
    const { status } = req.body;

    if (!id || !status) {
      return res.status(400).json({
        ok: false,
        message: 'Contact ID and status are required',
      });
    }

    const updatedContact = await db
      .collection('contacts')
      .findOneAndUpdate(
        { _id: new ObjectId(id) },
        { $set: { status } },
        { returnDocument: 'after' },
      );

    if (!updatedContact) {
      return res.status(404).json({
        ok: false,
        message: 'Contact not found',
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Contact status updated successfully',
    });
  } catch (error) {
    return next(error);
  }
};

export const deleteContact = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({
        ok: false,
        message: 'Contact ID is required',
      });
    }

    const deletedContact = await db.collection('contacts').deleteOne({ _id: new ObjectId(id) });

    if (!deletedContact.deletedCount) {
      return res.status(404).json({
        ok: false,
        message: 'Contact not found',
      });
    }

    return res.status(200).json({
      ok: true,
      message: 'Contact deleted successfully',
    });
  } catch (error) {
    return next(error);
  }
};
