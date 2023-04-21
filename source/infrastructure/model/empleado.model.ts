import { Schema, model, Document, Model } from "mongoose"
import moment from "moment"
import mongoose from "mongoose";


interface IJornada {
    fecha: Date;
    feriado:boolean;
    entrada: Date | null;
    salida: Date | null;
    habilitado_horas_extra:boolean
    entrada_horas_extra:Date | null;
    salida_horas_extra:Date| null;
    horas_diurnas:number
    horas_nocturnas:number
    horas_diuras_50:number
    horas_nocturnas_50:number
    horas_diurnas_100:number
    horas_nocturnas_100:number
  }

interface ICalculoHoras{
    fecha_liquidacion_horas:Date
    total_horas_diurnas:number,
    total_horas_nocturnas:number,
    total_horas_diurnas_50:number,
    total_horas_nocturnas_50:number,
    total_horas_diurnas_100:number,
    total_horas_nocturnas_100:number
}

interface IEmpleado extends Document {
    nombre: string;
    apellido: string;
    edad: number;
    sexo: string;
    legajo: number;
    email: string;
    liquidacion_jornal:boolean
    liquidacion_mensual:boolean
    rotacion:string
    grupo:string
    jornada: IJornada[];
    total_horas_trabajadas:ICalculoHoras[]
    jornada_extra:IJornada[]
}
const EmpleadoSchema= new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
      },
    nombre:{
        type:String
    },
    apellido:{
        type:String
    },
    edad:{
        type:Number
    },
    legajo:{
        type:Number
    },
    email:{
        type:String
    },
    liquidacion_mensual:{
        type:Boolean
    },
    liquidacion_jornal:{
        type:Boolean,
        default:true
    },
    rotacion:{
        type:String,
        default:"6x1"
    },
    grupo:{
        type:String,
        default:"A"
    },
    jornada: [[[{
        fecha:{
            type:Date,
                   
        },
        feriado:{
            type:Boolean,
            default:false
            
        },
        entrada: {
            type: Date,
        },
        salida: {
            type: Date,
        },
        habilitado_horas_extra:{
            type:Boolean,
            default:false
        },
        entrada_horas_extra:{
            type:Date,
            default:null
        },
        salida_horas_extra:{
            type:Date,
            default:null,
        },
        horas_diuras:{
            type:Number,
            default:0   
        },
        horas_nocturnas:{
            type:Number,
            default:0
        },
        horas_diurnas_50:{
            type:Number,
            default:0
        },
        horas_nocturnas_50:{
            type:Number,
            default:0
        },
        horas_diurnas_100:{
            type:Number,
            default:0
        },
        horas_nocturnas_100:{
            type:Number,
            default:0
        }  
    }]]],

    total_horas_trabajadas:[{
        fecha_liquidacion_horas:{
            type:Date,
            default:null
        },
        total_horas_diurnas:{
            type:Number,
            default:0   
        },
        total_horas_nocturnas:{
            type:Number,
            default:0
        },
        total_horas_diurnas_50:{
            type:Number,
            default:0
        },
        total_horas_nocturnas_50:{
            type:Number,
            default:0
        },
        total_horas_diurnas_100:{
            type:Number,
            default:0
        },
        total_horas_nocturnas_100:{
            type:Number,
            default:0
        },

    }] 
},
{
    timestamps: true,
    versionKey: false
});



const EmpleadoModel = model<IEmpleado>("empleado.rrhh.ts", EmpleadoSchema)
export default EmpleadoModel