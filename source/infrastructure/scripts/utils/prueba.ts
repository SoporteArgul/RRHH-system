import EmpleadoModel from "../../model/empleado.model";
import moment from "moment";
import writeExcelFile from 'write-excel-file/node'

export default async()=>{
  
  let motivos=[,
    "diurna enfermedad",
    "nocturna enfermedad",
    "licencia gremial",
    "diurna feriado ley",
    "nocturna feriado ley",
    "accidente",
    "vacaciones",
    "licencia maternidad",
    "licencia mudanza",
    "licencia nacimiento",
    "ausente con aviso",
    "ausente sin aviso",
    "licencia examen",
    "suspension",
    "licencia fallecimiento",
    "licencia matrimonio",
    "licencia donacion sangre",
    "ausencia enfermadad injustificada",
    "diurna reserva legal puesto",
    "nocturna reserva legal puesto",
    "licencia aislamiento",
    "licencia vacunacion",
  ]
  
  const hoy = moment().date(15);
  let fechaInicio, fechaFin:any;
  
  if (hoy <= moment().date(15)) {
    fechaInicio = moment().date(0).toDate();
    fechaFin = moment().date(15).toDate();
  } else {
    fechaInicio = moment().date(16).toDate();
    fechaFin = moment().endOf('month').toDate();
  }
  const empleados=await EmpleadoModel.aggregate([
      { $unwind: "$jornada" },
      { $unwind: "$jornada" },
      { $unwind: "$jornada" },
      { $match: { "jornada.fecha": { $gte: fechaInicio, $lte: fechaFin } } },
      { $match: { "tipo_liquidacion": { $in: ["jornal", "jornal nacion"] }  } },
      {
        $group: {
          _id: "$_id",
          nombre: { $first: "$nombre" },
          apellido: { $first: "$apellido" },
          legajo: { $first: "$legajo" },
          tipo_liquidacion:{ $first:"$tipo_liquidacion"},
          jornada: { $push: "$jornada" },
        }
      },
      {
        $project: {
          _id: 1,
          nombre: 1,
          apellido: 1,
          legajo: 1,
          tipo_liquidacion:1,
          jornada:1,
        }
      },
      { $sort: { legajo: 1 } }
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
  ];
      
  let ing_esperado="";
  let egr_esperado="";
  let data:Array<Array<Object>>=[]
  data.push(HEADER_ROWS)
  empleados.forEach((empleado)=>{
  empleado.jornada.forEach((emp:any)=>{
      if (moment(emp.entrada).hours()==6)ing_esperado="06:00:00",egr_esperado="14:00:00";
      if (moment(emp.entrada).hours()==14)ing_esperado="14:00:00",egr_esperado="22:00:00";
      if (moment(emp.entrada).hours()==22)ing_esperado="22:00:00",egr_esperado="14:00:00";
      if (emp.entrada==null)ing_esperado="00:00:00",egr_esperado="00:00:00";
      let entrada;
      let salida;      
      let licencia=0;
      if (emp.entrada!=null)entrada = new Date(emp.entrada.getTime() - (3 * 60 * 60 * 1000)); // Resta 3 horas
      if(emp.salida!=null)salida = new Date(emp.salida.getTime() - (3 * 60 * 60 * 1000));
        
      

      // for(let i of motivos){
      //   if(emp.licencia==i)licencia+=8;
      // }
      let DATA_ROW=[{type:String,value:empleado.legajo, alignVertical:"center"},
                    {type:String,value:empleado.nombre.concat(empleado.apellido)},
                    {type:Date,value:emp.fecha,format: 'yyyy-mm-dd'},
                    {type:String,value:ing_esperado},
                    {type:String,value:egr_esperado},
                    {type:Date,value:entrada,format: 'hh:mm:ss'},
                    {type:Date,value:salida,format: 'hh:mm:ss'},
                    {type:Number,value:emp.horas_diurnas},
                    {type:Number,value:emp.horas_nocturnas},
                    {type:String,value:emp.observaciones},
                    {type:Number,value:emp.horas_diurnas_100},
                    {type:Number,value:emp.horas_nocturnas_100},
                    {type:Number,value:emp.horas_diurnas_50},
                    {type:Number,value:emp.horas_nocturnas_50},
                    {type:Number,value:emp.horas_diurnas_100},
                    {type:Number,value:emp.horas_nocturnas_100},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                    {type:Number,value:licencia},
                  ]
      data.push(DATA_ROW)
  })
  })
 
  writeExcelFile(data,{filePath:"/pruebas/reporte3.xlsx"})
  .then(() => {
    console.log('Archivo de Excel creado');
  })
  .catch((error) => {
    console.error(error);
  });
}

   

