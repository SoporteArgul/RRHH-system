import  writeExcelFile  from 'write-excel-file/node';
import moment from "moment";



export default async(empleados:any)=>{
    try{
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
          empleados.forEach((empleado:any)=>{
          empleado.jornada.forEach((emp:any)=>{
              if (moment(emp.entrada).hours()==(6||5))ing_esperado="06:00:00",egr_esperado="14:00:00";
              if (moment(emp.entrada).hours()==(14||13))ing_esperado="14:00:00",egr_esperado="22:00:00";
              if (moment(emp.entrada).hours()==(22||21))ing_esperado="22:00:00",egr_esperado="14:00:00";
              if (emp.entrada==null)ing_esperado="00:00:00",egr_esperado="00:00:00";
              let entrada;
              let salida;      
              if (emp.entrada!=null)entrada = new Date(emp.entrada.getTime() - (3 * 60 * 60 * 1000)); // Resta 3 horas
              if(emp.salida!=null)salida = new Date(emp.salida.getTime() - (3 * 60 * 60 * 1000));
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
                            {type:Number,value:emp.diurna_enfermedad},
                            {type:Number,value:emp.nocturna_enfermedad},
                            {type:Number,value:emp.licencia_gremial},
                            {type:Number,value:emp.diurna_feriado_ley},
                            {type:Number,value:emp.nocturna_feriado_ley},
                            {type:Number,value:emp.accidente},
                            {type:Number,value:emp.vacaciones},
                            {type:Number,value:emp.licencia_maternidad},
                            {type:Number,value:emp.licencia_mudanza},
                            {type:Number,value:emp.licencia_nacimiento},
                            {type:Number,value:emp.ausente_con_aviso},
                            {type:Number,value:emp.ausente_sin_aviso},
                            {type:Number,value:emp.licencia_examen},
                            {type:Number,value:emp.horas_suspension},
                            {type:Number,value:emp.licencia_fallecimiento},
                            {type:Number,value:emp.licencia_matrimonio},
                            {type:Number,value:emp.licencia_donacion_sangre},
                            {type:Number,value:emp.ausencia_enfermadad_injustificada},
                            {type:Number,value:emp.diurna_reserva_legal_puesto},
                            {type:Number,value:emp.nocturna_reserva_legal_puesto},
                            {type:Number,value:emp.licencia_aislamiento},
                            {type:Number,value:emp.licencia_vacunacion},
                            {type:Number,value:emp.observaciones},
                          ]
              data.push(DATA_ROW);
          })
          })
           const excel=writeExcelFile(data,{filePath:`/home/mateo/Desktop/RRHH system/RRHH-system/source/infrastructure/reports/reporte.xlsx`})
          .then(() => {
            console.log('Archivo de Excel creado');
          })
          return excel ;
    }catch(e){
        return "no se pudo generar el reporte";
    }
}