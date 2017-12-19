module.exports = class BaseIncoming {
  constructor (keyword = '') {
    this.keyword = keyword;
  }

  isMatch (keyword = '') {
    return keyword && keyword === this.keyword;
  }
};
