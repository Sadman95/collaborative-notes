import * as jose from 'jose';

/**
 *
 * @param {string} token
 */
const validateJwt = (token) => {
    const data = jose.decodeJwt(token);

    const isValid = Date.now() < data.exp * 1000;

    if (!isValid) return null;

    const { email, userId, name } = data;

    return {
        email,
        userId,
        name
    };
};

export { validateJwt };
