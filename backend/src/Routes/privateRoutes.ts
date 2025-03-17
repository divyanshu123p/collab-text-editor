import { Router } from "express";
import { documentfn, invitefn, logoutfn, retrievedocfn, savefn } from "../controllers";
import { verifyToken } from "../Middlewares/tokenVerification";

const privateRoute = Router();

privateRoute.use(verifyToken);

privateRoute.post('/documents', documentfn);
privateRoute.post('/invite', invitefn);
privateRoute.post('/retreivedoc', retrievedocfn);
privateRoute.post('/savedoc', savefn);
privateRoute.get('/logout', logoutfn);

export default privateRoute;