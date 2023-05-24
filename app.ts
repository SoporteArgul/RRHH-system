import { ServerOptions } from 'https';
import  express  from "express";
import "dotenv/config"
import cors from "cors"
import morgan from "morgan";
import UserRoute from "./source/infrastructure/routes/empleado.route";
import dbInit from "./source/infrastructure/db/db";
import tareas from "./source/infrastructure/scripts/index.scripts"
import path from "path";
import bodyParser from "body-parser";
import { rateLimit } from "express-rate-limit";
import usuarioRoute from "./source/infrastructure/routes/usuario.route"
import fs from "node:fs"
import https from "https"
import { IncomingMessage, ServerResponse } from 'http';


const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 5 minutes
              max: 300, 
});
class APP{
    public express:any
    constructor(){
      this.startServer();
    }
    private startServer(){
      try{
        //configuraciones
        this.express=express();
        const port = process.env.PORT || 5001;
        this.express.use(express.json());
        this.express.disable('x-powered-by')
        this.express.use(limiter);
        this.express.use(bodyParser.json({limit: '50mb'}));
        this.express.use(bodyParser.urlencoded({limit:'50mb', extended: true}));
        this.express.use(express.urlencoded({ extended: false }));
        this.express.use(cors({origin: '*',methods: ['POST','PUT','GET','DELETE'],allowedHeaders: ['Content-Type','Authorization'],}));
        this.express.use(morgan('dev'));
        this.express.use(UserRoute);
        this.express.use(usuarioRoute);
        this.express.use(`/uploads`,express.static(path.join(__dirname,"uploads")))
        //scripts y db
        tareas().then();  
        dbInit().then();
        //server
        const options:ServerOptions={
          key:fs.readFileSync("./key-rsa.pem"),
          cert:fs.readFileSync("./cert.pem")
        }
        const server=https.createServer(options,(req:IncomingMessage,res:ServerResponse)=>{
          res.end("SSL ADDED")
          this.express
        });
        server.listen(port)
        console.log(`API lista!\nURL:${process.env.APP_HOST}${port}`)
      }catch(e){
          console.log("Internal server error!")
          process.exit();
      }
     
      
    }

}

const app= new APP()
app











//-----Configuraciones de Express------

//-------------------------------------

//--------Ejecucion de tareas----------
                                                                                                              
//-------------------------------------

//------Base de datos (conector)-------

//-------------------------------------

//-----------START-APP-----------------



//-------------------------------------