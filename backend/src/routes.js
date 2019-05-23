import express from 'express';
import request from 'request';
const router = express.Router();
const API_HEADER = 'X-CMC_PRO_API_KEY';
const API_KEY = '4e2860ec-99d6-40ea-84f5-4a93ccfbb99c';
router.get('/data', (req, res) => {
    request('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest?start=1&limit=50', {
        headers: {
            'X-CMC_PRO_API_KEY': API_KEY,
            Accept: 'application.json'
        }
    }, (err, resp, bod) => {
        if(err) {
            console.log(err);
            res.status(400).end();
        }

        res.json(JSON.parse(bod));
    })
});

export default router;