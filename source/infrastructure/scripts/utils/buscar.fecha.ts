import moment from "moment";

export default function buscarFecha(jornadas:any, fecha:any):any{
    for (let i = 0; i < jornadas.length; i++) {
      const item = jornadas[i];
      if (Array.isArray(item)) {
        const result = buscarFecha(item, fecha);
        if (result) {
          return result;
        }
      } else if (item.fecha && moment(item.fecha).isSame(fecha, 'day')) {
        return item;
      }
    }
    return null;
  }