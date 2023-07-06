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
import { Application } from 'express-serve-static-core';
import http from "http"



const limiter = rateLimit({
  windowMs: 1 * 60 * 1000, // 5 minutes
              max: 300, 
});
class APP{
    
    constructor(){
      this.startServer();
    }
    private startServer(){
      try{
        //configuraciones
        const app=express()
        const port = process.env.PORT || 5001;
        app.use(express.json());
        app.disable('x-powered-by')
        app.use(limiter);
        app.use(bodyParser.json({limit: '50mb'}));
        app.use(bodyParser.urlencoded({limit:'50mb', extended: true}));
        app.use(express.urlencoded({ extended: false }));
        app.use(cors({origin: '*',methods: ['POST','PUT','GET','DELETE'],allowedHeaders: ['Content-Type','Authorization'],}));
        app.use(morgan('dev'));
        app.use(UserRoute);
        app.use(usuarioRoute);
        app.use(`/uploads`,express.static(path.join(__dirname,"uploads")))
        //scripts y db
        tareas().then();  
        dbInit().then();
        // const server=http.createServer(app);
        app.listen(port)
        console.log(`API lista!\nURL:${process.env.APP_HOST}${port}`)
      }catch(e){
          console.log(e)
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