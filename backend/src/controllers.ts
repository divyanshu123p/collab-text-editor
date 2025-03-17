import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import prisma from './db';
import { genToken } from './auth-services';
import { PrismaClient } from '@prisma/client';
import { v4 as uuidv4 } from 'uuid';

const loginfn = async function (req, res) {
    try {
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

        res.cookie('token_', tkn, {
            sameSite: "strict",
            httpOnly: false,
            expires: new Date(
                Date.now() + 30 * 24 * 60 * 60 * 1000
            )
        });

        res.status(201).json({ message: 'Login successful', userStored });
        // res.status(201).json({"token_": tkn});
    }
    catch (error) {
        console.log(error);
        res.status(400).json({ message: 'Wrong Username/Password' });
    }
};

const registerfn = async function (req: Request, res: Response) {
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

const documentfn = async (req, res) => {
    console.log('document fn provoked');

    const { token, iat } = req.user;

    let docs = await prisma.document.findMany({
        where: {
            OR: [
                { userOneId: token },
                { userTwoId: token }
            ]
        }
    });

    // console.log(docs);

    res.json(docs);
};

const invitefn = async (req, res) => {
    console.log('invite fn provoked');
    let { username_ } = req.body;
    console.log(username_);

    let user2Id = await prisma.user.findFirst({
        where: {
            name: username_
        }
    });

    const newId = uuidv4();
    console.log(newId)

    // console.log(req.user);

    try {
        let newDoc = await prisma.document.create({
            data: {
                id: newId,
                title: 'Untitled',
                textBody: "",
                // userOneId: req.user?.id,
                // userTwoId: user2Id.id,

                userOne: { connect: { id: req.user?.token } },
                userTwo: { connect: { id: user2Id.id } }
            },
        });

        console.log('Document created successfully');

        res.json({ 'documentId': newDoc.id });
    }
    catch (error) {
        console.log('Document creation error: ' + error);
    }
};

const retrievedocfn = async (req, res) => {
    let { documentId } = req.body;

    // console.log('docuemnt id: ' + documentId);
    let docu = await prisma.document.findFirst({
        where: {
            id: documentId
        }
    });

    // console.log('retrieved document: ', JSON.stringify(docu));

    res.json(docu);
};

const savefn = async (req, res) => {
    const { id, textBody, title } = req.body;

    try {
        // console.log('text body: ' + textBody + 'id : ' + id);
        let upd = await prisma.document.update({
            where: {
                id: id
            },
            data: {
                title: title,
                textBody: textBody
            }
        });

        // console.log('document saved' + JSON.stringify(upd));
    }
    catch (error) {
        console.log(error);
    }
}

const logoutfn = async (req, res) => {
    console.log('kick out fn provoked');

    res.clearCookie('token_', {
        sameSite: "strict",
        httpOnly: false
    });

    console.log('Logged out, token deleted');

    res.status(200).json({ message: 'logout successful' });
}

export { loginfn, logoutfn, registerfn, documentfn, invitefn, retrievedocfn, savefn };