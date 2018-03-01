require('dotenv').config();
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import passport from 'passport';
import AuthRouter from './routes/AuthRoutes';
import './services/passport';
import ScoreRouter from './routes/ScoreRoutes';

mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://chrisperk2:iAmADB!@ds161493.mlab.com:61493/ten-for-ten')
  .then(() => console.log('[mongoose] Connected to MongoDB'))
  .catch(() => console.log('[mongoose] Error connecting to MongoDB'));

const app = express();

const authStrategy = passport.authenticate('authStrategy', { session: false });

app.use(bodyParser.json());
app.use(AuthRouter, ScoreRouter);

app.get('/api/secret', authStrategy, (req, res) => {
    res.send(`The current user is ${req.user.username}`);
});

const port = 3001;
app.listen(port, () => {
    console.log(`Listening on port:${port}`);
});