import express from 'express';

const app = express();

app.get('/dilly', (req, res, next) => {
    res.json([
        {
            id: 1,
            username: 'test'
        },
        {
            id: 2,
            username: 'sample'
        }
    ]);
});

app.listen(3001);