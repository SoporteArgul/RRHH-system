import EmpleadoModel from "../../model/empleado.model";

interface ObjetoHorasJornales {
  fecha_liquidacion_horas: Date;
  total_horas_diurnas: number;
  total_horas_nocturnas: number;
  total_horas_diurnas_50: number;
  total_horas_nocturnas_50: number;
  total_horas_diurnas_100: number;
  total_horas_nocturnas_100: number;
  total_diurna_enfermedad:number;
  total_nocturna_enfermedad:number;
  total_licencia_gremial:number;
  total_diurna_feriado_ley:number;
  total_nocturna_feriado_ley:number;
  total_accidente:number;
  total_vacaciones:number;
  total_licencia_maternidad:number;
  total_licencia_mudanza:number;
  total_licencia_nacimiento:number;
  total_ausente_con_aviso:number;
  total_ausente_sin_aviso:number;
  total_licencia_examen:number;
  total_suspension:number;
  total_licencia_fallecimiento:number;
  total_licencia_matrimonio:number;
  total_licencia_donacion_sangre:number;
  total_ausencia_enfermadad_injustificada:number;
  total_diurna_reserva_legal_puesto:number;
  total_nocturna_reserva_legal_puesto:number;
  total_licencia_aislamiento:number;
  total_licencia_vacunacion:number;
}

export default async (userId: string) => {
  const usuario = await EmpleadoModel.findById({ _id: userId });
  if (!usuario) {
    console.log('El usuario no existe o no tiene liquidación de jornal habilitada');
    return;
  }
  if(!(usuario.rotacion=="6x1")){
    console.log("el usuario es fijo")
    return;
  }
  const fechaActual = new Date();
  const year = fechaActual.getFullYear();
  const objetosPorGuardar: ObjetoHorasJornales[] = [];

  for (let i = 0; i < 12; i++) {
    const fecha_liquidacion_horas_15 = new Date(year, i, 15);
    const fecha_liquidacion_horas_ultimo_dia = new Date(year, i + 1, 0);

    const objetoExistente_15 = usuario.liquidacion.find(
      (objeto) => objeto.fecha_liquidacion_horas.toDateString() === fecha_liquidacion_horas_15.toDateString()
    );

    if (!objetoExistente_15) {
      const nuevoObjeto: ObjetoHorasJornales = {
        fecha_liquidacion_horas: fecha_liquidacion_horas_15,
        total_horas_diurnas: 0,
        total_horas_nocturnas: 0,
        total_horas_diurnas_50: 0,
        total_horas_nocturnas_50: 0,
        total_horas_diurnas_100: 0,
        total_horas_nocturnas_100: 0,
        total_diurna_enfermedad:0,
        total_nocturna_enfermedad:0,
        total_licencia_gremial:0,
        total_diurna_feriado_ley:0,
        total_nocturna_feriado_ley:0,
        total_accidente:0,
        total_vacaciones:0,
        total_licencia_maternidad:0,
        total_licencia_mudanza:0,
        total_licencia_nacimiento:0,
        total_ausente_con_aviso:0,
        total_ausente_sin_aviso:0,
        total_licencia_examen:0,
        total_suspension:0,
        total_licencia_fallecimiento:0,
        total_licencia_matrimonio:0,
        total_licencia_donacion_sangre:0,
        total_ausencia_enfermadad_injustificada:0,
        total_diurna_reserva_legal_puesto:0,
        total_nocturna_reserva_legal_puesto:0,
        total_licencia_aislamiento:0,
        total_licencia_vacunacion:0,
      };
      objetosPorGuardar.push(nuevoObjeto);
    }

    const objetoExistente_ultimo_dia = usuario.liquidacion.find(
      (objeto) => objeto.fecha_liquidacion_horas.toDateString() === fecha_liquidacion_horas_ultimo_dia.toDateString()
    );

    if (!objetoExistente_ultimo_dia) {
      const nuevoObjeto: ObjetoHorasJornales = {
        fecha_liquidacion_horas: fecha_liquidacion_horas_ultimo_dia,
        total_horas_diurnas: 0,
        total_horas_nocturnas: 0,
        total_horas_diurnas_50: 0,
        total_horas_nocturnas_50: 0,
        total_horas_diurnas_100: 0,
        total_horas_nocturnas_100: 0,
        total_diurna_enfermedad:0,
        total_nocturna_enfermedad:0,
        total_licencia_gremial:0,
        total_diurna_feriado_ley:0,
        total_nocturna_feriado_ley:0,
        total_accidente:0,
        total_vacaciones:0,
        total_licencia_maternidad:0,
        total_licencia_mudanza:0,
        total_licencia_nacimiento:0,
        total_ausente_con_aviso:0,
        total_ausente_sin_aviso:0,
        total_licencia_examen:0,
        total_suspension:0,
        total_licencia_fallecimiento:0,
        total_licencia_matrimonio:0,
        total_licencia_donacion_sangre:0,
        total_ausencia_enfermadad_injustificada:0,
        total_diurna_reserva_legal_puesto:0,
        total_nocturna_reserva_legal_puesto:0,
        total_licencia_aislamiento:0,
        total_licencia_vacunacion:0,
      };
      objetosPorGuardar.push(nuevoObjeto);
    }
  }

  if (objetosPorGuardar.length > 0) {
    usuario.liquidacion.push(...objetosPorGuardar);
    usuario.markModified('total_horas_trabajadas');
    const resultado = await usuario.save();
    console.log(`Se crearon ${objetosPorGuardar.length} objetos de horas jornales para el usuario con ID ${userId}`);
    return resultado;
  } else {
    console.log(`No se crearon objetos de horas jornales para el usuario con ID ${userId}`);
  }
};