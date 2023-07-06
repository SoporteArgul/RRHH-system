import moment from "moment";
import EmpleadoModel from "../../model/empleado.model";

export default function buscarFechas(jornadas: any, fechaInicio: any, fechaFin: any): any[] | null {
  const resultados: any[] = [];
  
  for (let i = 0; i < jornadas.length; i++) {
    const item = jornadas[i];
    
    if (Array.isArray(item)) {
      const resultadosHijos = buscarFechas(item, fechaInicio, fechaFin);
      if (resultadosHijos !== null) {
        resultados.push(...resultadosHijos);
      }
    } else if (item.fecha && moment(item.fecha).isBetween(fechaInicio, fechaFin, 'day', '[]')) {
      resultados.push(item);
    }
  }
  
  if (resultados.length === 0) {
    return null;
  }
  
  return resultados;
}
