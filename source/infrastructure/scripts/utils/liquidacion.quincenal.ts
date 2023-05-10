import EmpleadoModel from "../../model/empleado.model";

interface ObjetoHorasJornales {
  fecha_liquidacion_horas: Date;
  total_horas_diurnas: number;
  total_horas_nocturnas: number;
  total_horas_diurnas_50: number;
  total_horas_nocturnas_50: number;
  total_horas_diurnas_100: number;
  total_horas_nocturnas_100: number;
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