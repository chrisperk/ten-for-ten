import express from 'express';
import jwt from 'jwt-simple';
import Score from '../models/ScoreModel';
import bcrypt from 'bcrypt';
import passport from 'passport';
import '../services/passport';

const router = express.Router();

router.get('/api/scores', (req, res, next) => {
    Score.find().exec()
        .then(scores => res.json(scores))
        .catch(err => next(err));
});

router.post('/api/score', (req, res, next) => {
    const { username, score } = req.body;

    const scoreRecord = new Score({ username, score });

    scoreRecord.save()
        .then(score => res.json(score))
        .catch(err => next(err));
});

export default router;