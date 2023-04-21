import  express  from "express";
import "dotenv/config"
import cors from "cors"
import morgan from "morgan";
import UserRoute from "./source/infrastructure/routes/empleado.route";
import dbInit from "./source/infrastructure/db/db";
import tarea from"./source/infrastructure/scripts/fichada.script"
import cron from "node-cron"
import calculoHorasScript from "./source/infrastructure/scripts/calculo.horas.script";
import totalHorasJornal from "./source/infrastructure/scripts/jornal.script"
import resultado from "./source/infrastructure/scripts/prueba";


const app = express();
const port = process.env.PORT || 5001;

//-----Configuraciones de Express------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({origin: '*',methods: 'POST',allowedHeaders: 'Content-Type'}));
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.header('Access-Control-Allow-Credentials', 'true');
    next();
  });
app.use(morgan('dev'))
app.use(UserRoute)
//-------------------------------------

//--------Ejecucion de tareas----------
// cron.schedule('0 0 1 * *',tarea) //una vez al mes crea un calendario con los objetos de entrada y salida para cada empleado.
tarea()
calculoHorasScript()
//-------------------------------------

//------Base de datos (conector)-------
dbInit().then();
//-------------------------------------

//-----------START-APP-----------------
app.listen(port, () => console.log(`API, Listo por el puerto ${port}`));
//-------------------------------------