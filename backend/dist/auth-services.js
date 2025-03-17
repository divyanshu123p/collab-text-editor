import jsonwebtoken from 'jsonwebtoken';
const jwt = jsonwebtoken();
function genToken(token) {
    return jwt.sign({ token }, process.env.JWT_SEC);
}
;
function verifyToken(token) {
    return jwt.verify(token, process.env.JWT_SEC);
}
;
export { genToken, verifyToken };
//# sourceMappingURL=auth-services.js.map