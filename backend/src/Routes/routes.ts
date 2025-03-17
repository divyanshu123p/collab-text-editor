import { Router } from "express";
import { loginfn, registerfn } from "../controllers";

const route = Router();

route.post('/login', loginfn);
route.post('/register', registerfn);

export default route;