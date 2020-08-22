var jwt = require("jsonwebtoken");

const getToken = function(userID, res){
    const payload = {
        user: {
            id: userID
        }
    };

    var token = undefined;
    jwt.sign(
        payload,
        "rndmStr", {
            expiresIn: 100000
        },
        (err, token) => {
            if (err) throw err;
            return res.status(200).json({
                        token
                   });
        });
}

module.exports = getToken;

