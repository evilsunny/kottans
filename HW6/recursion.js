function reduce(arr, callback, initial) {
  if (!arr.length) return initial;

  var index = 0;
  var head = arr[index];
  var tail = arr.slice(1);

  return reduce(tail, callback, callback.call(null, initial, head, index, arr));

}

module.exports = reduce
