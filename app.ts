import express, {Application, NextFunction, Request, Response} from "express";
import { createServer, Server as HTTPServer } from "http";

require('dotenv').config({path: './config/.env'})

const helmet = require("helmet");
const cors = require('cors')


const port = normalizePort(process.env.PORT || '4201');
/**
 * Packages & Modules
 */

const debug = require("debug")("CMS");
import bodyParser from "body-parser";

import path from 'path';
import cookieParser from 'cookie-parser';
import lessMiddleware from 'less-middleware';
//  import Gap from "./lib/Gap";

/**
 * @IORedis
 * @Github https://github.com/luin/ioredis
import Redis from "ioredis"
const redis = new Redis()
const redisPlay = async ()=>{
    await redis.hset("Bahram:RaamAllah","key","Value")
}
 */

/**
 * @Test Chai
 * @LINK https://www.chaijs.com/api/bdd/
 */

/**
 * Cors Options
 */
const whitelist = ['http://localhost:80000', 'http://localhost:4000', 'http://localhost:3000', 'http://localhost:6001']
const corsOptions = {
    origin: function (origin, callback) {
        if(!origin){//for bypassing postman req with  no origin
            return callback(null, true);
        }
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            // callback(null, true)
            callback(new Error('Not allowed by CORS'))
        }
    }
};


/**
 * @Class SERVER
 */
export class Server {
    private httpServer: HTTPServer;
    private app: Application;

    private readonly DEFAULT_PORT = port;

    constructor() {
        this.initialize();
    }

    private initialize(): void {
        this.app = express();
        this.app.set("port", this.DEFAULT_PORT)
        this.httpServer = createServer(this.app);

        this.handleSecurity();
        this.configureApp();
        this.handleRoutes();
        this.handleGap();

    }


    private configureApp(): void {
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(bodyParser.json());
        this.app.use(express.json({}));
        this.app.use(express.urlencoded({extended: false}));
        this.app.use(cookieParser());
        this.app.use(lessMiddleware(path.join(__dirname, 'public')));
        this.app.use(express.static(path.join(__dirname, 'public')));
    }

    private handleSecurity(): void {
        this.app.use(
            helmet({
                contentSecurityPolicy: false,
            })
        );
        this.app.use(cors(corsOptions))
    }


    private handleRoutes(): void {
       // this.app.use("/api/v1", user_routes);
        this.app.use("/raam",  async (req: Request, res: Response, next: NextFunction)=> {
            return res.status(200).send({
                SUCCESS: true,
                Owner: "Bahram",
                Power: "Raam Allah"
            })
        })
/*
        this.app.use("/gap/bahram",  async (req: Request, res: Response, next: NextFunction)=> {
            console.log(`Bot Token is -> `, process.env.BOT_TOKEN)
            console.log(`Chat_Id is -> `, req.body.chat_id)
            console.log(`🎬 Received something from user to bot: `, req.body)

            const gapApi = new Gap(process.env.BOT_TOKEN)
            if (req.body.type === "join") {
                gapApi.joinHandler(req.body);
            } else if (req.body.type === "triggerButton") {
                gapApi.triggerButtonHandler(req.body);
            } else if (req.body.type === "submitForm") {
                gapApi.submitFormHandler(req.body);
            } else if (req.body.type === "paycallback") {
                const params = JSON.parse(req.body.data);
                gapApi.paidHandler(params);
            } else {    // main handler ->
                try{
                    console.log(`Here`, 0)
                    const sent = await gapApi.sendText({chat_id: req.body.chat_id, data: "salam nazanin"})
                    console.log(`Sent?`, sent)
                }catch (e) {
                    console.log(`Here`, e)
                    return res.status(500).send({Error: true})
                }
                gapApi.mainHandler(req.body);
                if (gapApi.textHandlers.length) {
                    gapApi.findTextHandler(req.body);
                }
            }
            res.send();
        })
        this.app.get("/gap/send/:text",  async (req: Request, res: Response, next: NextFunction)=> {
            console.log(`Bot Token is -> `, process.env.BOT_TOKEN)
            console.log(`🎬 Received text: `, req.params.text)

            const gapApi = new Gap(process.env.BOT_TOKEN)
            if (req.body.type === "join") {
                gapApi.joinHandler(req.body);
            } else if (req.body.type === "triggerButton") {
                gapApi.triggerButtonHandler(req.body);
            } else if (req.body.type === "submitForm") {
                gapApi.submitFormHandler(req.body);
            } else if (req.body.type === "paycallback") {
                const params = JSON.parse(req.body.data);
                gapApi.paidHandler(params);
            } else {    // main handler ->
                gapApi.mainHandler(req.body);
                if (gapApi.textHandlers.length) {
                    gapApi.findTextHandler(req.body);
                }
            }
            res.send();
        })
 */

     //   this.app.use(ErrorHandlerMiddleware);

    }

    private handleGap(): void {
    }

    /**
     * Listen
     * @param callback
     */
    public listen( callback: (port: number) => void ): void {
        //this.httpServer.listen(this.DEFAULT_PORT);
       // this.httpServer.on('error', onError);
       // this.httpServer.on('listening', this.onListening);
        this.httpServer.listen( this.DEFAULT_PORT, () =>
            callback(parseInt(this.DEFAULT_PORT)
        ))
        this.httpServer.on('error', onError);
       // this.httpServer.on('listening', this.onListening);

    }



    private onListening() : void{
        const addr = this.httpServer.address();
        const bind = typeof addr === 'string'
            ? 'pipe ' + addr
            : 'port ' + addr.port;
        debug('Listening on ' + bind);
    }
}



/**
 * Normalize a port into a number, string, or false.
 */
function normalizePort(val) {
    const port = parseInt(val, 10);

    if (isNaN(port)) {
        // named pipe
        return val;
    }

    if (port >= 0) {
        // port number
        return port;
    }

    return false;
}

/**
 * Event listener for HTTP server "error" event.
 */
function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}