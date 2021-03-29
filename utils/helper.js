function getOffset(currentPage = 1) {
  return ((currentPage - 1) * [10]).toString();
}

module.exports = {
  getOffset
}