import moment from "moment"
import EmpleadoModel from "../../model/empleado.model"



export default async () => {
    const empleados = await EmpleadoModel.find({ rotacion: "6x1" });
  
    if (moment().day() === 6) {
      const promesas = empleados.map((empleado) => {
        if (empleado.turno === "mañana") empleado.turno = "tarde";
        else if (empleado.turno === "tarde") empleado.turno = "noche";
        else if (empleado.turno === "noche") empleado.turno = "mañana";
        empleado.markModified("turno");
        return empleado.save();
      });
  
      await Promise.all(promesas);
  
      console.log("Cambios de turno realizados con éxito");
    }
  };