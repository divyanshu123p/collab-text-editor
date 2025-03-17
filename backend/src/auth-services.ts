import jsonwebtoken from 'jsonwebtoken';

// const jwt = jsonwebtoken();

function genToken(token){
    return jsonwebtoken.sign({token}, process.env.JWT_SEC);
};

export {genToken};