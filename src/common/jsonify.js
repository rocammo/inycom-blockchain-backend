class Json {
  constructor(docHash, docPages, docInfo, docVersion) {
    this.hash = docHash;
    this.numpages = docPages;
    this.info = docInfo;
    this.version = docVersion;
  }
}

class Json64 {
  constructor(docBase64, docPages, docInfo, docVersion) {
    this.base64 = docBase64;
    this.numpages = docPages;
    this.info = docInfo;
    this.version = docVersion;
  }
}

module.exports = { Json, Json64 };
