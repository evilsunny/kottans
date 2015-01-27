function repeat(operation, num) {
  for (var i = 0; i < num; i++) {
    operation();
  };
}

// the official solution:
function repeat(operation, num) {
  if (num <= 0) return
  operation()
  return repeat(operation, --num)
}

module.exports = repeat