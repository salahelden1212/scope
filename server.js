require('dotenv').config();
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();

// إعدادات Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// إعداد CORS للسماح بالاتصالات من عدة نطاقات
app.use(cors({
    origin: ['https://scopedevelopments.com'],
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type']
}));

// الاتصال بقاعدة بيانات MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ Connected to MongoDB'))
.catch(err => {
    console.error('❌ MongoDB Connection Error:', err);
    process.exit(1);
});

// تعريف الـ Schema و الـ Model
const clientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
});

const Client = mongoose.model('Client', clientSchema);

// معالجة البيانات المرسلة عبر POST
app.post('/submit', async (req, res) => {
    try {
        const { name, phone, email } = req.body;

        if (!name || !phone || !email) {
            return res.status(400).json({ error: 'يجب ملء جميع الحقول' });
        }

        const newClient = new Client({ name, phone, email });
        await newClient.save();

        res.status(201).json({ message: 'تم حفظ البيانات بنجاح' });
    } catch (error) {
        console.error('Error occurred:', error);
        res.status(500).json({ error: 'حدث خطأ في السيرفر' });
    }
});

// إضافة مسار GET لـ /submit
app.get('/submit', (req, res) => {
    res.send('لا يمكن استخدام هذا المسار مباشرة. الرجاء استخدام الفورم.');
});

// تقديم الملفات الثابتة (مثل HTML, CSS, JS) من المجلد الرئيسي مباشرة
app.use(express.static(path.join(__dirname)));

// تقديم ملف HTML عند زيارة الـ root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// تشغيل السيرفر
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`✅ Server is running on port ${PORT}`);
});
