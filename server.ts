import express from 'express'
import { connect } from './model/dbConnect'
const app = express();
import { router } from './routes/route'
import { initGlobals } from './global'
app.use(express.json())

const init = async () => {
    connect();
    app.use("/elastic", router)
    app.listen(8000, () => {
        console.log('******server connected on port 8000*****')
    });
    initGlobals()
    // console.log("server", global.io)
}

init();
 