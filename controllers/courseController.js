import { v2 as cloudinary } from 'cloudinary';
import { ObjectId } from 'mongodb';
import { getDB } from '../configs/db.js';
import { cloudinaryApiKey, cloudinaryApiSecret, cloudinaryName } from '../configs/variables.js';

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

export const getCourses = async (req, res, next) => {
  try {
    const db = getDB();

    const courses = await db
      .collection('courses')
      .aggregate([
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: 'text',
            as: 'category',
          },
        },
        { $unwind: '$category' },
        {
          $lookup: {
            from: 'badges',
            localField: 'badge',
            foreignField: 'text',
            as: 'badge',
          },
        },
        {
          $unwind: {
            path: '$badge',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { id: 1 },
        },
      ])
      .toArray();

    return res.status(200).json({ ok: true, courses });
  } catch (error) {
    return next(error);
  }
};

export const getPopularCourses = async (req, res, next) => {
  try {
    const db = getDB();

    const popularCourses = await db
      .collection('courses')
      .aggregate([
        {
          $match: { featured: true },
        },
        {
          $lookup: {
            from: 'categories',
            localField: 'category',
            foreignField: 'text',
            as: 'category',
          },
        },
        { $unwind: '$category' },
        {
          $lookup: {
            from: 'badges',
            localField: 'badge',
            foreignField: 'text',
            as: 'badge',
          },
        },
        {
          $unwind: {
            path: '$badge',
            preserveNullAndEmptyArrays: true,
          },
        },
        {
          $sort: { id: 1 },
        },
      ])
      .toArray();

    return res.status(200).json({ ok: true, popularCourses });
  } catch (error) {
    return next(error);
  }
};

export const createCourse = async (req, res, next) => {
  try {
    const db = getDB();

    const lastCourse = (await db.collection('courses').findOne({}, { sort: { id: -1 } })) || {
      id: 0,
    };

    cloudinary.uploader
      .upload_stream({ folder: 'dcta/courses' }, async (error, result) => {
        if (error) {
          return res.status(500).json({ ok: false, message: 'Failed to upload image' });
        }

        await db.collection('courses').insertOne({
          id: lastCourse.id + 1,
          ...req.body,
          thumbnail: result?.secure_url,
        });
        return res.status(201).json({ ok: true, message: 'Course created successfully' });
      })
      .end(req.file.buffer);

    return null;
  } catch (error) {
    return next(error);
  }
};

export const updateCourse = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const course = await db.collection('courses').findOne({ _id: new ObjectId(id) });
    if (!course) {
      return res.status(404).json({ ok: false, message: 'Course not found' });
    }

    const updateData = { ...req.body };

    if (req.file) {
      try {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'dcta/courses' },
            (error, result) => {
              if (error) {
                reject(error);
              } else {
                resolve(result);
              }
            },
          );
          stream.end(req.file.buffer);
        });

        updateData.thumbnail = uploadResult.secure_url;
      } catch (err) {
        return res.status(500).json({ ok: false, message: 'Failed to upload image' });
      }
    }

    const result = await db
      .collection('courses')
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.modifiedCount === 0) {
      return res.status(404).json({ ok: false, message: 'Course not found or no changes made' });
    }

    return res.status(200).json({ ok: true, message: 'Course updated successfully' });
  } catch (error) {
    return next(error);
  }
};

export const deleteCourse = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db.collection('courses').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ ok: false, message: 'Course not found' });
    }

    return res.status(200).json({ ok: true, message: 'Course deleted successfully' });
  } catch (error) {
    return next(error);
  }
};

export const slugCheck = async (req, res, next) => {
  try {
    const db = getDB();
    const { slug } = req.params;
    const id = req.query?.id;

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(slug)) {
      return res.status(400).json({
        ok: false,
        message: 'Invalid slug',
      });
    }

    const course = await db.collection('courses').findOne({
      slug,
      _id: { $ne: new ObjectId(id) },
    });
    if (!course) {
      return res.status(200).json({ ok: true, message: 'Available' });
    }

    return res.status(404).json({ ok: false, message: 'Not available' });
  } catch (error) {
    return next(error);
  }
};
