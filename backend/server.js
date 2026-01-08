require('dotenv').config();
const express = require('express');
const cors = require('cors');
const multer = require('multer');
const pdf = require('pdf-parse');
const path = require('path');
const admin = require('firebase-admin');

// 1. Initialize Firebase Admin
// It will try to load from environment variable first, then fallback to local file
// 1. Initialize Firebase Admin
let serviceAccount;
try {
    if (process.env.FIREBASE_SERVICE_ACCOUNT_BASE64) {
        // Production: Use Base64 string from Vercel Env Vars
        const decoded = Buffer.from(process.env.FIREBASE_SERVICE_ACCOUNT_BASE64, 'base64').toString('utf-8');
        serviceAccount = JSON.parse(decoded);
    } else {
        // Local: Use the JSON file
        const serviceAccountPath = path.resolve(__dirname, './firebase-service-account.json');
        serviceAccount = require(serviceAccountPath);
    }

    admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
        storageBucket: serviceAccount.project_id + ".firebasestorage.app" // Auto-detect bucket
    });
    console.log("✅ Firebase Admin & Storage Initialized");
} catch (e) {
    console.warn("⚠️ Firebase Admin could not be initialized. Error:", e.message);
}

const upload = multer({ storage: multer.memoryStorage() }); // Switch to memory for Cloud Uploads
const uploadMemory = multer();
const app = express();

// 2. Production CORS
const allowedOrigins = [
    'http://localhost:3000',
    'https://drsehartaskeen.online',
    /\.vercel\.app$/ // Allows all Vercel previews
];

app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.some(o => typeof o === 'string' ? o === origin : o.test(origin))) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}));
app.use(express.json());

const PORT = process.env.PORT || 5001;

// --- USER MANAGEMENT ENDPOINTS ---

app.post('/api/admin/create-user', async (req, res) => {
    const { email, password, name, role } = req.body;
    try {
        if (!admin.apps.length) throw new Error("Firebase Admin not initialized");

        // 1. Create user in Firebase Auth
        const userRecord = await admin.auth().createUser({
            email,
            password: password || 'Default123!',
            displayName: name,
        });

        // 2. Set custom claims for roles
        await admin.auth().setCustomUserClaims(userRecord.uid, { role });

        // 3. Save metadata to Firestore (Bypassing rules)
        const db = admin.firestore();
        await db.collection('admins').doc(email.toLowerCase()).set({
            name,
            email: email.toLowerCase(),
            role: role || 'admin',
            createdAt: new Date().toISOString(),
            uid: userRecord.uid
        });

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

        // 1. Delete from Firebase Auth
        const user = await admin.auth().getUserByEmail(email);
        await admin.auth().deleteUser(user.uid);

        // 2. Delete from Firestore
        const db = admin.firestore();
        await db.collection('admins').doc(email.toLowerCase()).delete();

        res.json({ success: true });
    } catch (error) {
        console.error("Error deleting user:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

app.post('/api/admin/sync-admins', async (req, res) => {
    try {
        if (!admin.apps.length) throw new Error("Firebase Admin not initialized");
        const listUsersResult = await admin.auth().listUsers();
        const db = admin.firestore();
        const batch = db.batch();

        for (const user of listUsersResult.users) {
            const adminDoc = db.collection('admins').doc(user.email.toLowerCase());
            batch.set(adminDoc, {
                name: user.displayName || user.email.split('@')[0],
                email: user.email.toLowerCase(),
                role: user.customClaims?.role || 'admin',
                uid: user.uid,
                lastSync: new Date().toISOString()
            }, { merge: true });
        }
        await batch.commit();
        res.json({ success: true, count: listUsersResult.users.length });
    } catch (error) {
        console.error("Sync Error:", error);
        res.status(500).json({ success: false, message: error.message });
    }
});

// --- EXISTING ENDPOINTS (CLEANED) ---

app.post('/api/upload-image', upload.single('image'), async (req, res) => {
    if (!req.file) return res.status(400).json({ success: false, message: 'No file uploaded' });

    try {
        const bucket = admin.storage().bucket();
        const blob = bucket.file(`uploads/${Date.now()}-${req.file.originalname}`);
        const blobStream = blob.createWriteStream({
            metadata: { contentType: req.file.mimetype },
            resumable: false
        });

        blobStream.on('error', (err) => res.status(500).json({ success: false, message: err.message }));

        blobStream.on('finish', async () => {
            // Make public and get URL
            await blob.makePublic();
            const publicUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;
            res.json({ success: true, imageUrl: publicUrl });
        });

        blobStream.end(req.file.buffer);
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
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

// Export for Vercel
module.exports = app;

// Only start the server if running locally (not as a Vercel function)
if (require.main === module) {
    const startServer = (port) => {
        const portNum = parseInt(port, 10);
        app.listen(portNum, () => {
            console.log(`✅ Local Backend running on http://localhost:${portNum}`);
        }).on('error', (err) => {
            if (err.code === 'EADDRINUSE') startServer(portNum + 1);
            else console.error(err);
        });
    };
    startServer(PORT);
}
