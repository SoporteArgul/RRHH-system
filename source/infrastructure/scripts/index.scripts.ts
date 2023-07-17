import cron from "node-cron"
import calculo_diario from  "./utils/calculo.diario.script"
import generacion_calendario from "./utils/generacion.calendario";
import calculo_mensual from "./utils/calculo.mensual.script"
import cambio_turno from "./utils/actualizar.turno"
import prueba from "./utils/prueba"
import generacionLiquidacion from "./utils/generacion.liquidacion";

const tareas=async()=>{

// Definir las tareas programadas
const tareaCalculoDiario = async () => {
  await calculo_diario();
};
const tareaGeneracionCalendario = async () => {
  await generacion_calendario();
};

const calculoMensual= async () => {
  await calculo_mensual();
}

const cambioTurno= async ()=>{
  await cambio_turno();
};



// Configurar los crones para las tareas
cron.schedule("0 10 * * *", tareaCalculoDiario);
cron.schedule("0 0 1 12 *", tareaGeneracionCalendario);
cron.schedule("0 7 1 * *",calculoMensual);
cron.schedule("0 7 16 * *",calculoMensual);
cron.schedule('0 10 * * 0',cambioTurno);


}


export default tareas