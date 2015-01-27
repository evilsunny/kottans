var slice = Array.prototype.slice;

function logger(namespace) {
  return function() {
    //console.log.call(console, namespace, slice.call(arguments).join(' '));
    console.log.apply(console, [namespace].concat(slice.call(arguments)));
  }
}

module.exports = logger;