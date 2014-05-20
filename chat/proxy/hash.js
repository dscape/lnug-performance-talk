module.exports = function (seed) {
  return function hash(ip) {
  var h =  ip.reduce(function (r, num) {
    r += parseInt(num, 10);
    r %= 2147483648;
    r += (r << 10);
    r %= 2147483648;
    r ^= r >> 6;
    return r;
  }, seed);

  h += h << 3;
  h %= 2147483648;
  h ^= h >> 11;
  h += h << 15;
  h %= 2147483648;

  return h >>> 0;
  };
};