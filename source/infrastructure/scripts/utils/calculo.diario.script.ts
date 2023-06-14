import EmpleadoModel from "../../model/empleado.model"
import moment from "moment"
import buscarFechas from "./buscar.fecha.2";
import Licencias from "./licencias";






export default async () => {
    const empleados = await EmpleadoModel.find({area:{ $in: ['calidad', 'deposito','produccion','matriceria','tecnicos'] }});
    for (const empleado of empleados) {
        let horasNocturnas = 0;
        let horasDiurnas = 0;
        let horasNocturnasExtra50=0;
        let horasDiurnasExtra50=0;
        let horasNocturnasExtra100=0;
        let horasDiurnasExtra100=0;
        const hoy=moment().toDate()
        const ayer=moment().subtract(1,'day').toDate()        
        const jornadas=await buscarFechas(empleado.jornada,ayer,ayer)
        const cantidad_horas=jornadas.map((obj: any) => {
         horasNocturnas = 0;
         horasDiurnas = 0;
         horasNocturnasExtra50=0;
         horasDiurnasExtra50=0;
         horasNocturnasExtra100=0;
         horasDiurnasExtra100=0;
        
        if (obj.entrada!=null && obj.salida!=null){
            const hora1 = moment(obj.entrada)
            const hora2 = moment(obj.salida)
            const diffHours = Math.round(hora2.diff(hora1, 'hours', true))
            if (hora1.hour() >= 21 || hora2.hour() < 6) {
                // Si el horario inicial es a partir de las 21:00 o el horario final es anterior a las 06:00,
                // todas las horas son nocturnas.
                if(obj.feriado)horasNocturnasExtra100=diffHours;
                else horasNocturnas = diffHours;
              } else if (hora1.hour() < 6 && hora2.hour() >= 6) {
                // Si el horario inicial es anterior a las 06:00 y el horario final es a partir de las 06:00,
                // todas las horas son diurnas.
                if(obj.feriado)horasDiurnasExtra100=diffHours;
                else horasDiurnas = diffHours;
              } else {
                // Si no se cumple ninguna de las condiciones anteriores, se tienen horas diurnas y nocturnas en el mismo turno.
                const horasNocturnasAntes = Math.max(0, 6 - hora1.hour()); // Horas nocturnas antes de las 06:00
                const horasNocturnasDespues = Math.max(0, hora2.hour() - 21); // Horas nocturnas después de las 21:00
                const horasDiurnasEnMedio = diffHours - horasNocturnasAntes - horasNocturnasDespues; // Horas diurnas entre las 06:00 y las 21:00
                if(obj.feriado)horasNocturnasExtra100=horasNocturnasAntes + horasNocturnasDespues,horasDiurnasExtra100=horasDiurnasEnMedio
                else horasNocturnas = horasNocturnasAntes + horasNocturnasDespues,horasDiurnas= horasDiurnasEnMedio;
              }
        }
        if(obj.habilitado_horas_extra&&obj.entrada_horas_extra&&obj.salida_horas_extra){
            const hora1 = moment(obj.entrada_horas_extra)
            const hora2 = moment(obj.salida_horas_extra)
            const diffHours = Math.round(hora2.diff(hora1, 'hours', true))
            if (hora1.hour() >= 21 || hora2.hour() < 6) {
                // Si el horario inicial es a partir de las 21:00 o el horario final es anterior a las 06:00,
                // todas las horas son nocturnas.
                horasNocturnasExtra50 += diffHours;
              } else if (hora1.hour() < 6 && hora2.hour() >= 6) {
                // Si el horario inicial es anterior a las 06:00 y el horario final es a partir de las 06:00,
                // todas las horas son diurnas.
                horasDiurnasExtra50 += diffHours;
              } else {
                // Si no se cumple ninguna de las condiciones anteriores, se tienen horas diurnas y nocturnas en el mismo turno.
                const horasNocturnasAntes = Math.max(0, 6 - hora1.hour()); // Horas nocturnas antes de las 06:00
                const horasNocturnasDespues = Math.max(0, hora2.hour() - 21); // Horas nocturnas después de las 21:00
                const horasDiurnasEnMedio = diffHours - horasNocturnasAntes - horasNocturnasDespues; // Horas diurnas entre las 06:00 y las 21:00
                horasNocturnasExtra50 += horasNocturnasAntes + horasNocturnasDespues;
                horasDiurnasExtra50 += horasDiurnasEnMedio;
              }
        }
        if (obj.licencia!=""&&obj.entrada==null&&obj.salida==null)Licencias(obj.licencia,obj)
        obj.horas_diurnas=horasDiurnas;
        obj.horas_nocturnas=horasNocturnas;
        obj.horas_nocturnas_100=horasNocturnasExtra100;
        obj.horas_diurnas_100=horasDiurnasExtra100;
        obj.horas_diurnas_50=horasNocturnasExtra50;
        obj.horas_nocturnas_50=horasDiurnasExtra50;
        
    })
    empleado.markModified('jornada');
    const resultado= await empleado.save() 
}
console.log("Calculo diario realizado con exito!")
        

}