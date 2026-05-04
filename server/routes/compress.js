import express from 'express';
import cors from 'cors';
import multer from 'multer';
import sharp from 'sharp';

const router = express.Router();

// Configure multer for memory storage
const storage = multer.memoryStorage();
const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

router.post('/', upload.single('image'), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No image file provided' });
    }

    const { quality = 80, format = 'webp' } = req.body;

    // Process image with sharp
    let imageTransformer = sharp(req.file.buffer);

    // Apply format and quality
    switch (format) {
      case 'jpeg':
      case 'jpg':
        imageTransformer = imageTransformer.jpeg({ quality: parseInt(quality) });
        break;
      case 'png':
        imageTransformer = imageTransformer.png({ quality: parseInt(quality) });
        break;
      case 'webp':
      default:
        imageTransformer = imageTransformer.webp({ quality: parseInt(quality) });
        break;
    }

    const processedBuffer = await imageTransformer.toBuffer();

    res.set('Content-Type', `image/${format}`);
    res.set('Content-Disposition', `attachment; filename="compressed.${format}"`);
    res.send(processedBuffer);

  } catch (error) {
    console.error('Error compressing image:', error);
    res.status(500).json({ error: 'Failed to compress image' });
  }
});

export default router;
