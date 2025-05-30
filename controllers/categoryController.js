import { v2 as cloudinary } from 'cloudinary';
import { ObjectId } from 'mongodb';
import { getDB } from '../configs/db.js';
import { cloudinaryApiKey, cloudinaryApiSecret, cloudinaryName } from '../configs/variables.js';

cloudinary.config({
  cloud_name: cloudinaryName,
  api_key: cloudinaryApiKey,
  api_secret: cloudinaryApiSecret,
});

export const getCategories = async (req, res, next) => {
  try {
    const db = getDB();

    const categories = await db
      .collection('categories')
      .aggregate([
        {
          $lookup: {
            from: 'courses',
            localField: 'text',
            foreignField: 'category',
            as: 'courses',
          },
        },
        {
          $project: {
            _id: 1,
            id: 1,
            img: 1,
            text: 1,
            textBn: 1,
            courseCount: { $size: '$courses' },
          },
        },
        { $sort: { id: 1 } },
      ])
      .toArray();

    return res.status(200).json({ ok: true, categories });
  } catch (error) {
    return next(error);
  }
};

export const createCategory = async (req, res, next) => {
  try {
    const db = getDB();

    const lastCategory = (await db.collection('categories').findOne({}, { sort: { id: -1 } })) || {
      id: 0,
    };

    cloudinary.uploader
      .upload_stream({ folder: 'dcta/categories' }, async (error, result) => {
        if (error) {
          return res.status(500).json({ ok: false, message: 'Failed to upload image' });
        }

        await db.collection('categories').insertOne({
          id: lastCategory.id + 1,
          ...req.body,
          img: result?.secure_url,
        });
        return res.status(201).json({ ok: true, message: 'Category created successfully' });
      })
      .end(req.file.buffer);

    return null;
  } catch (error) {
    return next(error);
  }
};

export const updateCategory = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const category = await db.collection('categories').findOne({ _id: new ObjectId(id) });
    if (!category) {
      return res.status(404).json({ ok: false, message: 'Category not found' });
    }

    const updateData = { ...req.body };

    if (req.file) {
      try {
        const uploadResult = await new Promise((resolve, reject) => {
          const stream = cloudinary.uploader.upload_stream(
            { folder: 'dcta/categories' },
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
        updateData.img = uploadResult.secure_url;
      } catch (err) {
        return res.status(500).json({ ok: false, message: 'Failed to upload image' });
      }
    }

    const result = await db
      .collection('categories')
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    if (result.modifiedCount === 0) {
      return res.status(404).json({ ok: false, message: 'Category not found or no changes made' });
    }

    return res.status(200).json({ ok: true, message: 'Category updated successfully' });
  } catch (error) {
    return next(error);
  }
};

export const deleteCategory = async (req, res, next) => {
  try {
    const db = getDB();
    const { id } = req.params;

    const result = await db.collection('categories').deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ ok: false, message: 'Category not found' });
    }

    return res.status(200).json({ ok: true, message: 'Category deleted successfully' });
  } catch (error) {
    return next(error);
  }
};
