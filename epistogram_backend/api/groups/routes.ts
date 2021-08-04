import {Router} from "express";
export const router = Router()

import {getGroups} from './controllers/GET/getGroups'

router.get('/', getGroups);

