const Wait = function(ms) {
    return new Promise((res) => {
        setTimeout(res, ms)
    })
}
module.exports = Wait;
