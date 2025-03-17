import bcrypt from 'bcrypt';
import prisma from './db';
import { genToken } from './auth-services';
const loginfn = async function (req, res) {
    console.log('login fn provoked');
    const { username, password } = req.body;
    const userStored = await prisma.user.findFirst({
        where: {
            name: username
        }
    });
    const isMatch = await bcrypt.compare(password, userStored.password);
    if (!isMatch) {
        res.send('Username/Password wrong');
    }
    const tkn = genToken(userStored.id);
    res.status(201).json({ "token_": tkn });
};
const registerfn = async function (req, res) {
    console.log('register fn provoked');
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPass = await bcrypt.hash(password, salt);
    const newUser = await prisma.user.create({
        data: {
            name: username,
            email,
            password: hashPass
        },
    });
    // res.status(201).json({message: 'user registered successfully', user: newUser});
    res.writeHead(201, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ message: 'user registered successfully', user: newUser }));
};
export { loginfn, registerfn };
//# sourceMappingURL=controllers.js.map