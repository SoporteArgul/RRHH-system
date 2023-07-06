import EmpleadoModel from "../../model/empleado.model";
import moment from "moment";
import buscarFechas from "./buscar.fecha.2";


export default async()=>{
    try{
      let i=moment().subtract(1,"day").set({ hour: 0, minute: 0, second: 0, millisecond:0 }).toDate()
      let f=moment().add(6,"days").set({ hour: 0, minute: 0, second: 0 ,millisecond:0}).toDate()
      let jornada:any;
      const data=await EmpleadoModel.find({grupo:{$in:["a","b","c"]}});
      const empleados=data.forEach(async (empleado)=>{
        jornada=buscarFechas(empleado.jornada,i,f)
        let turno:string;
        jornada?.map((j: any, index: number) => {
          if (index === 0) {
            turno = j.turno;
          }
          if (turno === "mañana" && index !== 0) {
            j.turno = "tarde";
          }
          if (turno === "tarde" && index !== 0) {
            j.turno = "noche";
          }
          if (turno === "noche" && index !== 0) {
            j.turno = "mañana";
          }
        });
        empleado.markModified("jornada");
        await empleado.save();
      })
      console.log("turnos asignados con exito!")
    }catch(e){
      console.log("error al asignar turnos!")
    }

  

   
}