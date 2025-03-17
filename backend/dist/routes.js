import { Router } from "express";
import { loginfn, registerfn } from "./controllers";
const route = Router();
route.get('/login', loginfn);
route.get('/register', registerfn);
export default route;
//# sourceMappingURL=routes.js.map