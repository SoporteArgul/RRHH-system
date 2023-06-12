import { Schema, model, Document, Model } from "mongoose"
import mongoose from "mongoose";
import "dotenv/config"
import { Jornadas as IJornada, Liquidacion as ICalculoHoras } from "../../domain/empleado/empleado.interface";
import path from "path";

const MENSAJE: string = "Ingrese un valor que este en las opciones!"
interface IEmpleado extends Document {
    legajo: string,
    apellido: string,
    nombre: string,
    cuil: string,
    contratacion: string,
    fecha_ingreso: Date;
    gerencia: string,
    area: string,
    sector: string,
    centro_de_costo: string,
    convenio: string,
    categoria: string,
    dni: string,
    fecha_nacimiento: string,
    sexo: string,
    email: string,
    telefono: string,
    telefono_urgencias: string,
    pais: string,
    provincia: string,
    localidad: string,
    calle: string,
    numero: string
    departamento: string,
    piso: string;
    codigo_postal: string,
    nivel_educacion: string,
    activo: boolean,
    fecha_egreso: Date;
    estado_ambiental: string;
    examen_preocupacional: string;
    tipo_liquidacion: string;
    rotacion: string,
    turno: string,
    grupo: string,
    jornada: IJornada[][],
    liquidacion: ICalculoHoras[],
    observaciones: string,
    foto: string,
}
const EmpleadoSchema = new Schema({
    _id: {
        type: mongoose.Schema.Types.ObjectId,
        auto: true,
    },
    legajo: {
        type: String,
        minlength:2,
        maxLengh:10,
        unique: true
    },
    apellido: {
        type: String
    },
    nombre: {
        type: String
    },
    cuil: {
        type: String,
        unique: true
    },
    contratacion: {
        type: String,
        // enum: {
        //     values: ["eventual", "agencia", "efectivo", "externo"],
        //     message: MENSAJE
        // }
    },
    fecha_ingreso: {
        type: Date,
        default: new Date()
    },
    gerencia: {
        type: String
    },
    area: {
        type: String
    },
    sector: {
        type: String
    },
    centro_de_costo: {
        type: String || null
    },
    convenio: {
        type: String,
        // enum: {
        //     values: ["plastico", "fuera de convenio"],
        //     message: MENSAJE
        // }
    },
    categoria: {
        type: String || null,
        // enum: {
        //     values: ["operario", "auxiliar", "operador", "operador oalificado", "operador especializado", "oficial especializado","medio oficial mantenimiento", "oficial de mantenimiento","nivel 1", "nivel 2", "nivel 3", "nivel 4", "nivel 5", "capataz", "ayudante de chofer", "conductor de autoelevador","proveedor",null],
        //     message: MENSAJE
        // },
        default: null
    },
    dni: {
        type: String,
        unique: true
    },
    fecha_nacimiento: {
        type: Date || null
    },
    sexo: {
        type: String,
        // enum: {
        //     values: ["H", "M", "O"],
        //     message: MENSAJE
        // }
    },
    email: {
        type: String || null,

    },
    telefono: {
        type: String
    },
    telefono_urgencias: {
        type: String
    },
    pais: {
        type: String
    },
    provincia: {
        type: String
    },
    localidad: {
        type: String
    },
    calle: {
        type: String
    },
    numero: {
        type: String,
        require: false
    },
    dpto: {
        type: String
    },
    piso: {
        type: String
    },
    codigo_postal: {
        type: String
    },

    nivel_de_educacion: {
        type: String
    },
    activo: {
        type: Boolean
    },

    fecha_egreso: {
        type: String,

    },
    estado_ambiental: {
        type: String
    },
    examen_preocupacional: {
        type: String
    },
    tipo_liquidacion: {
        type: String,
        // enum: {
        //     values: ["Jornal", "Mensual"],
        //     message: MENSAJE
        // }
    },
    rotacion: {
        type: String,
        // enum: {
        //     values: ["Fijo", "6x1"],
        //     message: MENSAJE
        // }
    },
    grupo: {
        type: String,
        // enum: {
        //     values: ["A", "B", "C"],
        //     message: MENSAJE,
        // },
        default: "A"
    },
    jornada: [[[{
        fecha: {
            type: Date,
        },
        feriado: {
            type: Boolean,
            default: false
        },
        suspendido: {
            type: Boolean,
            default: false
        },
        licencia: {
            type: String,
            // emun:{
            //     values:["gremial","art","enfermedad","vacaciones","maternidad","mudanza",
            //             "nacimiento","examen","fallecimiento familiar","matrimonio","donacion sangre",
            //             "aislamiento","vacunacion COVID-19","enfermedad justificada","ausente con aviso",
            //             "ausente sin aviso","suspension","reserva legal de puesto"],
            //     message:MENSAJE
            // }
        },
        turno:{
            type:String,
            enum:{
                values:["mañana","tarde","noche","-",""],
                message:MENSAJE
            }
        },
        entrada: {
            type: Date || null,
            default: null
        },
        salida: {
            type: Date || null || String,
            default: null
        },
        entrada_descanso: {
            type: Date,
            default: null,
        },
        salida_descanso: {
            type: Date,
            default: null,
        },
        habilitado_horas_extra: {
            type: Boolean,
            default: false
        },
        entrada_horas_extra: {
            type: Date,
            default: null
        },
        salida_horas_extra: {
            type: Date,
            default: null,
        },
        descanso: {
            type: Boolean,
            default: true
        },
        horas_diurnas: {
            type: Number,
            default: 0
        },
        horas_nocturnas: {
            type: Number,
            default: 0
        },
        horas_diurnas_50: {
            type: Number,
            default: 0
        },
        horas_nocturnas_50: {
            type: Number,
            default: 0
        },
        horas_diurnas_100: {
            type: Number,
            default: 0
        },
        horas_nocturnas_100: {
            type: Number,
            default: 0
        },
        observaciones: {
            type: String,

        }
    }]]],
    liquidacion: [[[{
        fecha_liquidacion_horas: {
            type: Date,
            default: null
        },
        total_horas_diurnas: {
            type: Number,
            default: 0
        },
        total_horas_nocturnas: {
            type: Number,
            default: 0
        },
        total_horas_diurnas_50: {
            type: Number,
            default: 0
        },
        total_horas_nocturnas_50: {
            type: Number,
            default: 0
        },
        total_horas_diurnas_100: {
            type: Number,
            default: 0
        },
        total_horas_nocturnas_100: {
            type: Number,
            default: 0
        },
        total_diurna_enfermedad:{ 
            type: Number, 
            default: 0 
        },
        total_nocturna_enfermedad:{ 
            type: Number, 
            default: 0 
        },
        total_licencia_gremial: { 
            type: Number, 
            default: 0 
        },
        total_diurna_feriado_ley: { 
            type: Number, 
            default: 0 
        },
        total_nocturna_feriado_ley: { 
            type: Number, 
            default: 0 
        },
        total_accidente: { type: Number, default: 0 },
        total_vacaciones: { type: Number, default: 0 },
        total_licencia_maternidad: { type: Number, default: 0 },
        total_licencia_mudanza: { type: Number, default: 0 },
        total_licencia_nacimiento: { type: Number, default: 0 },
        total_ausente_con_aviso: { type: Number, default: 0 },
        total_ausente_sin_aviso: { type: Number, default: 0 },
        total_licencia_examen: { type: Number, default: 0 },
        total_suspension: { type: Number, default: 0 },
        total_licencia_fallecimiento: { type: Number, default: 0 },
        total_licencia_matrimonio: { type: Number, default: 0 },
        total_licencia_donacion_sangre: { type: Number, default: 0 },
        total_ausencia_enfermadad_injustificada: { type: Number, default: 0 },
        total_diurna_reserva_legal_puesto: { type: Number, default: 0 },
        total_nocturna_reserva_legal_puesto: { type: Number, default: 0 },
        total_licencia_aislamiento: { type: Number, default: 0 },
        total_licencia_vacunacion: { type: Number, default: 0 },
    }]]],
    observaciones: {
        type: String,
        default: "Sin Observaciones"
    },
    foto: {
        type: String,
        default: ""
    }
},
    {
        timestamps: true,
        versionKey: false
    });


const EmpleadoModel = model<IEmpleado>("empleado.rrhh", EmpleadoSchema)
export default EmpleadoModel