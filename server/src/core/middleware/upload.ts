import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => {
        cb(null, 'uploads/resumes/');
    },
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        cb(null, `resume-${uniqueSuffix}${path.extname(file.originalname)}`);
    },
});

const fileFilter = (_req: any, file: any, cb: multer.FileFilterCallback) => {
    const allowedTypes = /pdf|doc|docx/;
    const ext = path.extname(file.originalname).toLowerCase();
    if (allowedTypes.test(file.mimetype) && allowedTypes.test(ext)) {
        return cb(null, true);
    }
    cb(new Error('Only PDF and DOC files are allowed'));
};

export const upload = multer({
    storage,
    limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
    fileFilter,
});
