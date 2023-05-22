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
import hpp from "hpp";

const app = express();
const port = process.env.PORT || 5001;
const limiter = rateLimit({
    windowMs: 1 * 60 * 1000, // 5 minutes
                max: 300, 
  });
//-----Configuraciones de Express------
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
//-------------------------------------

//--------Ejecucion de tareas----------
tareas().then()                                                                                                                
//-------------------------------------

//------Base de datos (conector)-------
dbInit().then();
//-------------------------------------

//-----------START-APP-----------------
app.listen(port, () => console.log(`API, Listo por el puerto ${port}`));
//-------------------------------------