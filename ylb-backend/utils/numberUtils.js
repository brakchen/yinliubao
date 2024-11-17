function string10to62(n) {
    if (n === 0) {
        return "0";
    }
    const digits = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let result = "";
    while (n > 0) {
        result = digits[n % digits.length] + result;
        n = parseInt(n / digits.length, 10);
    }
    return result;
}

module.exports = {
    string10to62
}