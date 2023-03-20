const path = require("path");
const fs = require("fs");

function createPath() {
  const uploadPath = path.join(__dirname, "..", "..", "public");
  fs.mkdirSync(uploadPath, { recursive: true });
  console.log(uploadPath)
}
