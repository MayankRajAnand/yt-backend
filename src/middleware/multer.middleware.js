import multer from "multer";

const storage = multer.diskStorage({
  destination: function (req, res, cb) {
    cb(null, "/public/temp");
  },

  filename: function (req, res, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.originalName + "-" + uniqueSuffix);
  },
});

export const upload = multer({ storage: storage });
