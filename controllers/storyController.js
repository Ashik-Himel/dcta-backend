/* eslint-disable prettier/prettier */
import { v2 as cloudinary } from 'cloudinary';
import { ObjectId } from 'mongodb';
import { getDB } from '../configs/db.js';
import { cloudinaryApiKey, cloudinaryApiSecret, cloudinaryName } from '../configs/variables.js';

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

export const getStories = async (req, res, next) => {
  try {
    const db = getDB();

    const stories = await db
      .collection('stories')
      .aggregate([
        {
          $lookup: {
            from: 'courses',
            localField: 'course',
            foreignField: 'title',
            as: 'course',
          },
        },
        { $unwind: '$course' },
        {
          $sort: { id: 1 },
        },
      ])
      .toArray();

    return res.status(200).json({ ok: true, stories });
  } catch (error) {
    return next(error);
  }
};

export const getFeaturedStories = async (req, res, next) => {
  try {
    const db = getDB();

    const featuredStories = await db
      .collection('stories')
      .aggregate([
        {
          $match: { featured: true },
        },
        {
          $lookup: {
            from: 'courses',
            localField: 'course',
            foreignField: 'title',
            as: 'course',
          },
        },
        { $unwind: '$course' },
        {
          $sort: { id: 1 },
        },
      ])
      .toArray();

    return res.status(200).json({ ok: true, featuredStories });
  } catch (error) {
    return next(error);
  }
};

export const createStory = async (req, res, next) => {
  try {
    const db = getDB();

    const lastStory = (await db.collection('stories').findOne({}, { sort: { id: -1 } })) || {
      id: 0,
    };
    const newStory = {
      id: lastStory.id + 1,
      name: req.body.name,
      nameBn: req.body.nameBn,
      role: req.body.role,
      roleBn: req.body.roleBn,
      course: req.body.course,
      thumbnail: `https://img.youtube.com/vi/${req.body.videoId}/maxresdefault.jpg`,
      video: `https://youtube.com/embed/${req.body.videoId}`,
      featured: req.body.featured === 'true',
    };

    if (req.file) {
      try {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'dcta/stories' },
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

        newStory.avatar = uploadResult.secure_url;
      } catch (err) {
        return res.status(500).json({ ok: false, message: 'Failed to upload image' });
      }
    } else {
      newStory.avatar = 'https://res.cloudinary.com/dfpzmbbdm/image/upload/v1747538779/dcta/students/student.png';
    }

    await db.collection('stories').insertOne(newStory);
    return res.status(201).json({ ok: true, message: 'Success story created successfully' });
  } catch (error) {
    return next(error);
  }
};

export const updateStory = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const story = await db.collection('stories').findOne({ _id: new ObjectId(id) });
    if (!story) {
      return res.status(404).json({ ok: false, message: 'Success story not found' });
    }

    const updateData = { ...req.body, featured: req.body.featured === 'true' };

    if (req.file) {
      try {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'dcta/stories' },
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
        updateData.avatar = uploadResult.secure_url;
      } catch (err) {
        return res.status(500).json({ ok: false, message: 'Failed to upload image' });
      }
    }

    const result = await db
      .collection('stories')
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ ok: false, message: 'Success story not found or no changes made' });
    }

    return res.status(200).json({ ok: true, message: 'Success story updated successfully' });
  } catch (error) {
    return next(error);
  }
};

export const deleteStory = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db.collection('stories').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ ok: false, message: 'Success story not found' });
    }

    return res.status(200).json({ ok: true, message: 'Success story deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
