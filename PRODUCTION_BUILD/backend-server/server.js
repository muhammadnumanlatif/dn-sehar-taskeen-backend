require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse');
const path = require('path');
const admin = require('firebase-admin');

// 1. Initialize Firebase Admin
// It will try to load from environment variable first, then fallback to local file
const serviceAccountPath = process.env.FIREBASE_SERVICE_ACCOUNT || './firebase-service-account.json';
try {
    const serviceAccount = require(serviceAccountPath);
    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
    });
    console.log("✅ Firebase Admin Initialized");
} catch (e) {
    console.warn("⚠️ Firebase Admin could not be initialized. Admin user management will be disabled. Error:", e.message);
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, '../next_app/public/uploads/')
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
        cb(null, uniqueSuffix + path.extname(file.originalname))
    }
});

const upload = multer({ storage: storage });
const uploadMemory = multer();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 5000;

// --- USER MANAGEMENT ENDPOINTS ---

app.post('/api/admin/create-user', async (req, res) => {
    const { email, password, name, role } = req.body;
    try {
        if (!admin.apps.length) throw new Error("Firebase Admin not initialized");

        // Create user in Firebase Auth
        const userRecord = await admin.auth().createUser({
            email,
            password: password || 'Default123!', // You can change this or handle it better
            displayName: name,
        });

        // Set custom claims for roles
        await admin.auth().setCustomUserClaims(userRecord.uid, { role });

        res.json({ success: true, uid: userRecord.uid });
    } catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/admin/delete-user', async (req, res) => {
    const { email } = req.body;
    try {
        if (!admin.apps.length) throw new Error("Firebase Admin not initialized");
        const user = await admin.auth().getUserByEmail(email);
        await admin.auth().deleteUser(user.uid);
        res.json({ success: true });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- EXISTING ENDPOINTS (CLEANED) ---

app.post('/api/upload-image', upload.single('image'), (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    const imageUrl = `/uploads/${req.file.filename}`;
    res.json({ success: true, imageUrl });
});

app.post('/api/parse-cv', uploadMemory.single('cv'), async (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });
    try {
        const data = await pdf(req.file.buffer);
        const text = data.text;
        const lines = text.split('\n').map(l => l.trim()).filter(l => l);
        let education = [];
        let experience = [];
        let currentSection = '';

        lines.forEach(line => {
            const lowerLine = line.toLowerCase();
            if (lowerLine.includes('education')) currentSection = 'edu';
            else if (lowerLine.includes('experience') || lowerLine.includes('employment')) currentSection = 'exp';
            else if (lowerLine.includes('skills')) currentSection = '';

            if (currentSection === 'edu' && line.length > 5 && !lowerLine.includes('education')) {
                education.push({ id: Date.now() + Math.random(), title: line, sub: 'Extracted from CV', desc: '' });
            }
            if (currentSection === 'exp' && line.length > 5 && !lowerLine.includes('experience')) {
                experience.push({ id: Date.now() + Math.random(), title: line, desc: 'Extracted from CV' });
            }
        });

        res.json({
            success: true,
            data: {
                name: lines[0] || 'Dr. Sehar Taskeen',
                education: education.slice(0, 5),
                experience: experience.slice(0, 5)
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: 'Failed to parse PDF' });
    }
});

const startServer = (port) => {
    const portNum = parseInt(port, 10);
    app.listen(portNum, () => {
        console.log(`✅ Backend Server running on http://localhost:${portNum}`);
    }).on('error', (err) => {
        if (err.code === 'EADDRINUSE') startServer(portNum + 1);
        else console.error(err);
    });
};

startServer(PORT);
