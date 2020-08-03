const multer = require("multer");
const path = require("path");

module.exports = {
  storage: multer.diskStorage({
    destination: path.resolve(__dirname, "..", "..", "uploads"),
    filename: (req, file, cb) => {
      let fileName = file.originalname;
      let newName;
      if (fileName.includes(" ")) {
        newName = fileName.replace(" ", "-");
      } else {
        newName = fileName;
      }
      const ext = path.extname(newName);
      const name = path.basename(newName, ext);
      cb(null, `${name}-${Date.now()}${ext}`);
    },
  }),
};
