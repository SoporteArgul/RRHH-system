import EmpleadoModel from "../../model/empleado.model"
import moment from "moment"

export default async (id:string) => {
  try {
    const empleados = await EmpleadoModel.findOne({_id:id});
    const anioActual = moment().year();
    const jornadasAnuales = [];

    for (let mes = 0; mes < 12; mes++) {
      const diasMes = moment([anioActual, mes]).daysInMonth();
      const jornadasMensuales = [];

      for (let dia = 1; dia <= diasMes; dia++) {
        const fecha = moment([anioActual, mes, dia]).format("l");
        jornadasMensuales.push({
          fecha,
          feriado: false,
          suspendido:false,
          licencia:"",
          entrada: null,
          salida: null,
          entrada_descanso:null,
          salida_descanso:null,
          habilitado_horas_extra: false,
          entrada_horas_extra: null,
          salida_horas_extra: null,
          horas_diurnas: 0,
          horas_nocturnas: 0,
          horas_diurnas_50: 0,
          horas_nocturnas_50: 0,
          horas_diuras_100: 0,
          horas_nocturnas_100: 0,
          observaciones:"",
        });
      }

      jornadasAnuales.push(jornadasMensuales);
    }
    const jornadasPorAnio = [];
    jornadasPorAnio.push(jornadasAnuales);
    await EmpleadoModel.updateOne(
      {_id:id},
      {
        $set: {
          jornada: jornadasPorAnio,
        },
      },
      { upsert: true }
    );

    console.log("Documentos de jornada diarios creados exitosamente.");
  } catch (error) {
    console.error(error);
  }
};