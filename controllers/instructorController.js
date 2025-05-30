import { v2 as cloudinary } from 'cloudinary';
import { ObjectId } from 'mongodb';
import { getDB } from '../configs/db.js';
import { cloudinaryApiKey, cloudinaryApiSecret, cloudinaryName } from '../configs/variables.js';

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

export const getInstructors = async (req, res, next) => {
  try {
    const db = getDB();

    const instructors = await db
      .collection('instructors')
      .aggregate([
        { $unwind: '$socials' },
        {
          $lookup: {
            from: 'socials',
            localField: 'socials.name',
            foreignField: 'name',
            as: 'socialMeta',
          },
        },
        {
          $addFields: {
            socials: {
              $mergeObjects: ['$socials', { $arrayElemAt: ['$socialMeta', 0] }],
            },
          },
        },
        {
          $group: {
            _id: '$_id',
            id: { $first: '$id' },
            name: { $first: '$name' },
            nameBn: { $first: '$nameBn' },
            title: { $first: '$title' },
            titleBn: { $first: '$titleBn' },
            photo: { $first: '$photo' },
            socials: { $push: '$socials' },
          },
        },
        { $sort: { id: 1 } },
      ])
      .toArray();

    return res.status(200).json({ ok: true, instructors });
  } catch (error) {
    return next(error);
  }
};

export const createInstructor = async (req, res, next) => {
  try {
    const db = getDB();

    const lastInstructor = (await db
      .collection('instructors')
      .findOne({}, { sort: { id: -1 } })) || {
      id: 0,
    };

    cloudinary.uploader
      .upload_stream({ folder: 'dcta/instructors' }, async (error, result) => {
        if (error) {
          return res.status(500).json({ ok: false, message: 'Failed to upload image' });
        }

        await db.collection('instructors').insertOne({
          id: lastInstructor.id + 1,
          ...req.body,
          photo: result?.secure_url,
          socials: JSON.parse(req.body.socials),
        });
        return res.status(201).json({ ok: true, message: 'Instructor created successfully' });
      })
      .end(req.file.buffer);

    return null;
  } catch (error) {
    return next(error);
  }
};

export const updateInstructor = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const instructor = await db.collection('instructors').findOne({ _id: new ObjectId(id) });
    if (!instructor) {
      return res.status(404).json({ ok: false, message: 'Instructor not found' });
    }

    const updateData = { ...req.body, socials: JSON.parse(req.body.socials) };

    if (req.file) {
      try {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'dcta/instructors' },
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

        updateData.photo = uploadResult.secure_url;
      } catch (err) {
        return res.status(500).json({ ok: false, message: 'Failed to upload image' });
      }
    }

    const result = await db
      .collection('instructors')
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.modifiedCount === 0) {
      return res
        .status(404)
        .json({ ok: false, message: 'Instructor not found or no changes made' });
    }

    return res.status(200).json({ ok: true, message: 'Instructor updated successfully' });
  } catch (error) {
    return next(error);
  }
};

export const deleteInstructor = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db.collection('instructors').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ ok: false, message: 'Instructor not found' });
    }

    return res.status(200).json({ ok: true, message: 'Instructor deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
