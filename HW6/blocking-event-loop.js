function repeat(operation, num) {
    if (!num) return;
    operation();

    return setTimeout(function() {
        repeat(operation, --num);
    }, 0);
}

module.exports = repeat;
