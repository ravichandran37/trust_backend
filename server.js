require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');
const path = require('path');
const multer = require('multer');

const prisma = new PrismaClient();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Serve uploaded files statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Configure Multer for image uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});
const upload = multer({ storage: storage });

// --- UPLOAD ENDPOINT ---
app.post('/api/upload', upload.single('image'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No image file provided' });
  }
  
  // Construct the URL to access the uploaded file
  // E.g. http://localhost:5000/uploads/123456789.png
  const fileUrl = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
  res.json({ url: fileUrl });
});

// --- DONATIONS ---
app.get('/api/donations', async (req, res) => {
  try {
    const donations = await prisma.donation.findMany({ orderBy: { date: 'desc' } });
    res.json(donations);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/donations', async (req, res) => {
  try {
    const donation = await prisma.donation.create({ data: req.body });
    res.status(201).json(donation);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- QUERIES ---
app.get('/api/queries', async (req, res) => {
  try {
    const queries = await prisma.query.findMany({ orderBy: { date: 'desc' } });
    res.json(queries);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/queries', async (req, res) => {
  try {
    const query = await prisma.query.create({ data: req.body });
    res.status(201).json(query);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/queries/:id/reply', async (req, res) => {
  try {
    const { id } = req.params;
    const { reply } = req.body;
    const query = await prisma.query.update({
      where: { id },
      data: {
        status: 'Resolved',
        reply,
        replyDate: new Date()
      }
    });
    res.json(query);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- CAMPAIGNS ---
app.get('/api/campaigns', async (req, res) => {
  try {
    const campaigns = await prisma.campaign.findMany();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.patch('/api/campaigns/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { target } = req.body;
    const campaign = await prisma.campaign.update({
      where: { id },
      data: { target: Number(target) }
    });
    res.json(campaign);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- GALLERY CATEGORIES ---
app.get('/api/gallery-categories', async (req, res) => {
  try {
    const cats = await prisma.galleryCategory.findMany();
    res.json(cats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/gallery-categories', async (req, res) => {
  try {
    const cat = await prisma.galleryCategory.create({ data: req.body });
    res.status(201).json(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/gallery-categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const cat = await prisma.galleryCategory.update({
      where: { id },
      data: req.body
    });
    res.json(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/gallery-categories/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.galleryCategory.delete({ where: { id } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- GALLERY ITEMS ---
app.get('/api/gallery-items', async (req, res) => {
  try {
    const items = await prisma.galleryItem.findMany({ orderBy: { id: 'desc' } });
    res.json(items);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/gallery-items', async (req, res) => {
  try {
    const item = await prisma.galleryItem.create({ data: req.body });
    res.status(201).json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/gallery-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const item = await prisma.galleryItem.update({
      where: { id: parseInt(id) },
      data: req.body
    });
    res.json(item);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/gallery-items/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.galleryItem.delete({ where: { id: parseInt(id) } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- SERVICES ---
app.get('/api/services', async (req, res) => {
  try {
    const svcs = await prisma.service.findMany();
    res.json(svcs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/services', async (req, res) => {
  try {
    const svc = await prisma.service.create({ data: req.body });
    res.status(201).json(svc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const svc = await prisma.service.update({
      where: { id },
      data: req.body
    });
    res.json(svc);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/services/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.service.delete({ where: { id } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- MENU OPTIONS ---
app.get('/api/menu-options', async (req, res) => {
  try {
    const options = await prisma.menuOption.findMany();
    res.json(options);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/menu-options', async (req, res) => {
  try {
    const option = await prisma.menuOption.create({ data: req.body });
    res.status(201).json(option);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/menu-options/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const option = await prisma.menuOption.update({
      where: { id },
      data: req.body
    });
    res.json(option);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/menu-options/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.menuOption.delete({ where: { id } });
    res.json({ message: 'Deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// --- PAGE CONTENT ---
app.get('/api/pages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const page = await prisma.pageContent.findUnique({
      where: { id }
    });
    res.json(page || null);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/pages/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { title, content, heroImage, contentImage } = req.body;
    
    // Upsert (Create if not exists, update if exists)
    const page = await prisma.pageContent.upsert({
      where: { id },
      update: { title, content, heroImage, contentImage },
      create: { id, title, content, heroImage, contentImage }
    });
    res.json(page);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// --- Board Members API ---
app.get('/api/board-members', async (req, res) => {
  try {
    const members = await prisma.boardMember.findMany({ orderBy: { createdAt: 'asc' }});
    res.json(members);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/board-members', async (req, res) => {
  try {
    const { name, role, photo } = req.body;
    const newMember = await prisma.boardMember.create({
      data: { name, role, photo }
    });
    res.status(201).json(newMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.put('/api/board-members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, role, photo } = req.body;
    const updatedMember = await prisma.boardMember.update({
      where: { id },
      data: { name, role, photo }
    });
    res.json(updatedMember);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/board-members/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.boardMember.delete({ where: { id } });
    res.json({ message: 'Board member deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Mother Teresa Home API Server is running on port ${PORT}`);
});
