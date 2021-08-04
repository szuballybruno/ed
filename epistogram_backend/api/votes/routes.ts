import {Router} from "express";
export const router = Router()

import {getVotes} from './controllers/GET/getVotes'
import {getVote, updateVote, uploadVote} from './controller';

router.get('/getvote', getVote);
router.get('/getvotes', getVotes)
router.post('/uploadvote', uploadVote);
router.get('/updatevote', updateVote);

