const expressJwt = require('express-jwt');
const config = require('config.json');
const userService = require('../Services/UserService');

module.exports = jwt;

function jwt(roles = []) {
    const secret = config.secret;
    if (typeof roles === 'string') {
        roles = [roles];
    }
    return [
        expressJwt({ secret, algorithms: ['HS256'], isRevoked }).unless({
            path: [
                // public routes that don't require authentication
                '/users/authenticate',
                '/users/register'
            ]
        }),
        (req, res, next) => {
            if (roles.length && !roles.includes(req.user.role)) {
                // user's role is not authorized
                return res.status(401).json({ message: 'Unauthorized' });
            }

        // authentication and authorization successful
        next();
        }
    ];
}

async function isRevoked(req, payload, done) {
    const user = await userService.getById(payload.sub);

    // revoke token if user no longer exists
    if (!user) {
        return done(null, true);
    }

    done();
};