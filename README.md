# CryptoTrack App

## Usage

* Install node modules in `backend` directory and start it:
```text
cd backend
npm install
npm run start
```
* Install node_modules in root directory and serve frontend:
```text
cd ..
npm install
npm run start
```

## Defaults
Backend is on port 3600, frontend is on port 4200

## Notes
* In case that you need to replace the API key for coinmarketcap, it is located in `backend/src/routes.js` 
* In case that you need to change backend port it is located in `backend/src/index.js`
* In case that you change the backend port from above then you need to update the port in `src/app/services/api.service.ts`
