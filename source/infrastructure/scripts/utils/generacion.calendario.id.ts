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
          turno:"-",
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
          diurna_enfermedad: 0,
          nocturna_enfermedad: 0,
          licencia_gremial: 0,
          diurna_feriado_ley: 0,
          nocturna_feriado_ley: 0,
          accidente: 0,
          vacaciones: 0,
          licencia_maternidad: 0,
          licencia_mudanza: 0,
          licencia_nacimiento: 0,
          ausente_con_aviso: 0,
          ausente_sin_aviso: 0,
          licencia_examen: 0,
          horas_suspension: 0,
          licencia_fallecimiento: 0,
          licencia_matrimonio: 0,
          licencia_donacion_sangre: 0,
          ausencia_enfermadad_injustificada: 0,
          diurna_reserva_legal_puesto: 0,
          nocturna_reserva_legal_puesto: 0,
          licencia_aislamiento: 0,
          licencia_vacunacion: 0,
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