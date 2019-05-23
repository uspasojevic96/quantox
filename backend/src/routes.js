import express from 'express';
import request from 'request';
const router = express.Router();
const API_HEADER = 'X-CMC_PRO_API_KEY';
const API_KEY = '4e2860ec-99d6-40ea-84f5-4a93ccfbb99c';

function getOptions() {
    return {
        headers: {
            'X-CMC_PRO_API_KEY': API_KEY,
            Accept: 'application.json'
        }
    };
}

router.get('/data', (req, res) => {
    request('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=50&sort=price', getOptions(), (err, resp, body) => {
        if(err) {
            console.log(err);
            res.status(400).end();
        }

        res.json(JSON.parse(body));
    })
});

router.get('/info/:id', (req, res) => {
    request(`https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?id=${req.params.id}`, getOptions(), (err, resp, body) => {
        if(err) {
            console.log(err);
            res.status(400).end();
        }

        res.json(JSON.parse(body));
    })
})

export default router;