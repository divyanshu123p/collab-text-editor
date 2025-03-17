import jsonwebtoken from 'jsonwebtoken';

function verifyToken(req, res, next){
    try{
        const token = req.cookies?.token_;
        let decrypt = jsonwebtoken.verify(token, process.env.JWT_SEC);
        if(!decrypt){
            res.status(401).send('Access Denied! Please login first');
        }
        else{
            req.user = decrypt;
            next();
        }
    }
    catch{
        console.log('Error in token verification');
    }
};

export { verifyToken };