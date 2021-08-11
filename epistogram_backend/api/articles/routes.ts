import {Router} from "express";

export const router = Router()

import {getArticles} from "./getArticles";

router.get('/getarticles', getArticles)

