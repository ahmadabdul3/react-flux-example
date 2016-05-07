var passwordManager = {
    checkStrength: function (password, callback) {
        var stati = {
            weak: 'weak',
            ok: 'ok',
            strong: 'strong'
        };
        var result = {
            status: ''
        };
        var length = password.length;

        if(length < 6) {
            result.status = stati.weak;
        } else if (length > 5 && length < 12) {
            result.status = stati.ok;
        } else {
            result.status = stati.strong;
        }
        callback(null, result);
    }
}

module.exports = passwordManager;