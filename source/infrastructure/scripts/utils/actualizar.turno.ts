import moment from "moment"
import EmpleadoModel from "../../model/empleado.model"



export default async () => {
    const empleados = await EmpleadoModel.find({ rotacion: "6x1" });
  
    if (moment().day() === 6) {
      const promesas = empleados.map((empleado) => {
        if (empleado.turno === "Mañana") empleado.turno = "Tarde";
        else if (empleado.turno === "Tarde") empleado.turno = "Noche";
        else if (empleado.turno === "Noche") empleado.turno = "Mañana";
        empleado.markModified("turno");
        return empleado.save();
      });
  
      await Promise.all(promesas);
  
      console.log("Cambios de turno realizados con éxito");
    }
  };