const multer = require('multer');

// Konfigurasi penyimpanan
const storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, 'uploads/'); // direktori tujuan
  },
  filename: function(req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // nama file
  }
});

// Filter file berdasarkan tipe
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
    cb(null, true); // terima file
  } else {
    cb(null, false); // tolak file
  }
};

// Inisialisasi multer
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5 // batas ukuran file dalam bytes (5MB)
  },
  fileFilter: fileFilter
});

module.exports = upload;
