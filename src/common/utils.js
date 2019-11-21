function getFileName(filename) {
  return filename
    .split(".")
    .slice(0, -1)
    .join(".");
}

function getFileExtension(filename) {
  return filename.split(".").pop();
}

module.exports = { getFileName, getFileExtension };
