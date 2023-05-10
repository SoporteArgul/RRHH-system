import EmpleadoModel from "../../model/empleado.model";
import moment from "moment";
import jornadaComun from "../../helpers/acumulador50"
import writeExcelFile from 'write-excel-file/node'

//{jornada:{$elemMatch: { $elemMatch: { $elemMatch: { fecha: { $eq: fechaActual } } } } } }
export default async()=>{
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
  


  let HEADER_ROWS=[
    {value:"Legajo",fontWeight: 'bold'},
    {value:"Nombre",fontWeight: 'bold'},
    {value:"Fecha",fontWeight: 'bold'},
    {value:"Hora Ingreso esperado",fontWeight: 'bold'},
    {value:"Hora Egreso esperado",fontWeight: 'bold'},
    {value:"Hora Ingreso",fontWeight: 'bold'},
    {value:"Hora Egreso",fontWeight: 'bold'},
    {value:"Hs Diurna",fontWeight: 'bold'},
    {value:"Hs Nocturna",fontWeight: 'bold'},
    {value:"Observaciones",fontWeight: 'bold'},
    {value:"Diurna Feriado",fontWeight: 'bold'},
    {value:"Nocturna Feriado",fontWeight: 'bold'},
    {value:"HHEE Diurna 50%",fontWeight: 'bold'},
    {value:"HHEE Nocturna 50%",fontWeight: 'bold'},
    {value:"HHEE Diurna 100%",fontWeight: 'bold'},
    {value:"HHEE Nocturna 100%",fontWeight: 'bold'},
    {value:"Diurna Enfermedad",fontWeight: 'bold'},
    {value:"Nocturna Enfermedad",fontWeight: 'bold'},
    {value:"Licencia Gremial",fontWeight: 'bold'},
    {value:"Diurna Feriado Ley",fontWeight: 'bold'},
    {value:"Accidente",fontWeight: 'bold'},
    {value:"Vacaciones",fontWeight: 'bold'},
    {value:"Licencia Maternidad",fontWeight: 'bold'},
    {value:"Licencia Mudanza",fontWeight: 'bold'},
    {value:"Licencia Nacimiento",fontWeight: 'bold'},
    {value:"Ausente con Aviso",fontWeight: 'bold'},
    {value:"Ausente sin Aviso",fontWeight: 'bold'},
    {value:"Licencia Examen",fontWeight: 'bold'},
    {value:"Suspension",fontWeight: 'bold'},
    {value:"Licencia Fallecimiento",fontWeight: 'bold'},
    {value:"Licencia Matrimonio",fontWeight: 'bold'},
    {value:"Licencia Donacion de Sangre",fontWeight: 'bold'},
    {value:"Ausencia Enfermedad Injustificada",fontWeight: 'bold'},
    {value:"Diurna Reserva Legal de Puesto",fontWeight: 'bold'},
    {value:"Nocturna Reserva Legal de Puesto",fontWeight: 'bold'},
    {value:"Licencia Aislamiento",fontWeight: 'bold'},
    {value:"Licencia Vacunacion COVID",fontWeight: 'bold'},
    {value:"hs Adicionales 50% Diurnas",fontWeight: 'bold'},
    {value:"hs Adicionales 50% Nocturnas",fontWeight: 'bold'},
    {value:"hs Adicionales 100% Diurnas",fontWeight: 'bold'},
    {value:"hs Adicionales 100% Nocturnas",fontWeight: 'bold'},
    {value:"Vacaciones trabajadas Diurnas",fontWeight: 'bold'},
    {value:"Vacaciones Trabajadas Nocturnas",fontWeight: 'bold'},
    {value:"hs Guardia(Hs 100%)",fontWeight: 'bold'}
  ];
      
      let ing_esperado="";
      let egr_esperado="";
      let objeto:any=[];
      let rows:any=[];
      let data:Array<Array<Object>>=[]

      data.push(HEADER_ROWS)
      empleados.forEach((empleado)=>{
      empleado.jornada.forEach((emp:any)=>{
        if (moment(emp.entrada).hours()==6)ing_esperado="06:00",egr_esperado="14:00";
          if (moment(emp.entrada).hours()==14)ing_esperado="14:00",egr_esperado="22:00";
          if (moment(emp.entrada).hours()==22)ing_esperado="22:00",egr_esperado="14:00";
          if (emp.entrada==null)ing_esperado="00:00:00",egr_esperado="00:00:00";
          let entrada;
          let salida;
          if (emp.entrada!=null) {
            entrada = new Date(emp.entrada.getTime() - (3 * 60 * 60 * 1000)); // Resta 3 horas en milisegundos
          };
          if(emp.salida!=null){
            salida = new Date(emp.salida.getTime() - (3 * 60 * 60 * 1000));
          };
          
         
          let DATA_ROW=[{type:Number,value:empleado.legajo, alignVertical:"center"},
                        {type:String,value:empleado.nombre.concat(empleado.apellido)},
                        {type:Date,value:emp.fecha,format: 'yyyy-mm-dd'},
                        {type:String,value:ing_esperado},
                        {type:String,value:egr_esperado},
                        {type:Date,value:entrada,format: 'hh:mm:ss'},
                        {type:Date,value:salida,format: 'hh:mm:ss'}]
          data.push(DATA_ROW)
      })
  })
 
  writeExcelFile(data,{filePath:"/pruebas/reporte2.xlsx"})
  .then(() => {
    console.log('Archivo de Excel creado');
  })
  .catch((error) => {
    console.error(error);
  });
}

   

