import EmpleadoModel from "../../model/empleado.model"
import moment from "moment";

export default async function calculoQuincenal(){
    const hoy = moment().date(15);
    let fechaInicio, fechaFin:any;
    
    if (hoy <= moment().date(15)) {
      // Hoy es 1-15 del mes
      fechaInicio = moment().date(1).toDate();
      fechaFin = moment().date(15).toDate();
    } else {
      // Hoy es 16-fin de mes
      fechaInicio = moment().date(16).toDate();
      fechaFin = moment().endOf('month').toDate();
    }
    const empleados=await EmpleadoModel.aggregate([
        { $unwind: "$jornada" },
        { $unwind: "$jornada" },
        { $unwind: "$jornada" },
        { $match: { "jornada.fecha": { $gte: fechaInicio, $lte: fechaFin } } },
        { $match: { "rotacion": "6x1" } },
        {
          $group: {
            _id: "$_id",
            nombre: { $first: "$nombre" },
            apellido: { $first: "$apellido" },
            edad: { $first: "$edad" },
            legajo: { $first: "$legajo" },
            email: { $first: "$email" },
            liquidacion_mensual: { $first: "$liquidacion_mensual" },
            liquidacion_jornal: { $first: "$liquidacion_jornal" },
            rotacion: { $first: "$rotacion" },
            grupo: { $first: "$grupo" },
            jornada: { $push: "$jornada" },
            total_horas_trabajadas:{$first:"$total_horas_trabajadas"}
          }
        },
        {
          $project: {
            _id: 1,
            nombre: 1,
            apellido: 1,
            edad: 1,
            legajo: 1,
            email: 1,
            liquidacion_mensual: 1,
            liquidacion_jornal: 1,
            jornada:1,
            rotacion: 1,
            grupo: 1,
            total_horas_trabajadas: 1
          }
        }
      ]);
 
   empleados.forEach((empleado)=>{
        let diurnas=0,diurnas_50=0,diurnas_100=0;
        let nocturnas=0,nocturnas_50=0,nocturnas_100=0;
        empleado.jornada.forEach((jornada:any)=>{
            //acumuladores horas diurnas
            diurnas+=jornada.horas_diurnas;
            diurnas_50+=jornada.horas_diurnas_50;
            diurnas_100+=jornada.horas_diurnas_100;
            //acumuladores horas nocturnas
            nocturnas+=jornada.horas_nocturnas;
            nocturnas_50+=jornada.horas_nocturnas_50;
            nocturnas_100+=jornada.horas_nocturnas_100;
        })
        empleado.total_horas_trabajadas.forEach(async(total:any)=>{
            if (moment(total.fecha_liquidacion_horas).format("YY-MM-DD")==moment(fechaFin).format("YY-MM-DD")){
                total.total_horas_diurnas=diurnas;
                total.total_horas_diurnas_50=diurnas_50;
                total.total_horas_diurnas_100=diurnas_100;
                total.total_horas_nocturnas=nocturnas;
                total.total_horas_nocturnas_50=nocturnas_50;
                total.total_horas_nocturnas_100=nocturnas_100;               
                const empleadoActualizado = await EmpleadoModel.findOneAndUpdate(
                    { _id: empleado._id, "total_horas_trabajadas._id": total._id },
                    {
                    $set: {
                        "total_horas_trabajadas.$.total_horas_diurnas": total.total_horas_diurnas,
                        "total_horas_trabajadas.$.total_horas_diurnas_50": total.total_horas_diurnas_50,
                        "total_horas_trabajadas.$.total_horas_diurnas_100": total.total_horas_diurnas_100,
                        "total_horas_trabajadas.$.total_horas_nocturnas": total.total_horas_nocturnas,
                        "total_horas_trabajadas.$.total_horas_nocturnas_50": total.total_horas_nocturnas_50,
                        "total_horas_trabajadas.$.total_horas_nocturnas_100": total.total_horas_nocturnas_100,
                    },
                    },
                    { new: true });
                console.log("Empleado actualizado con éxito:",empleado.nombre,empleado.apellido);
                  
            
            }});  
        });
}