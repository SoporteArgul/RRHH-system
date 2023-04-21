import EmpleadoModel from "../model/empleado.model";

export default async()=>{
  const empleado=await EmpleadoModel.find({rotacion:"6x1"})
  empleado.forEach((emp)=>{
    emp.jornada.forEach(element => {
      console.log(element)
    });
  })
}