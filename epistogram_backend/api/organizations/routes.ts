import {Router} from "express";
export const router = Router()

import {getOrganizations} from "./controllers/GET/getOrganizations";

router.get('/getorganizations', getOrganizations);