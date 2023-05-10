import  express  from "express";
import "dotenv/config"
import cors from "cors"
import morgan from "morgan";
import UserRoute from "./source/infrastructure/routes/empleado.route";
import dbInit from "./source/infrastructure/db/db";
import tareas from "./source/infrastructure/scripts/index.scripts"
import path from "path";
import bodyParser from "body-parser";


const app = express();
const port = process.env.PORT || 5001;

//-----Configuraciones de Express------
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit:'50mb', extended: true}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: '*',methods: ['POST','PUT','GET','PATCH'],allowedHeaders: 'Content-Type'}));
app.use(morgan('dev'))
app.use(UserRoute)
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