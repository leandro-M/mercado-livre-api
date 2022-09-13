import 'babel-polyfill';

import app from './app';

const API_PORT = process.env.API_PORT

app.listen(API_PORT || 3001, () => {
    console.log(`mercado livre api serving on port ${API_PORT || 3001}`)
})