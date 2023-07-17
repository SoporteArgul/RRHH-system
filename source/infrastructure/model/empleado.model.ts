import { Schema, model, Document, Model } from "mongoose"
import mongoose from "mongoose";
import "dotenv/config"
import { Jornadas as IJornada, Liquidacion as ICalculoHoras } from "../../domain/empleado/empleado.interface";


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
        minlength: 2,
        maxLength: 10,
        unique: true,
        required:true
    },
    apellido: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
    },
    nombre: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
    },
    cuil: {
        type: String,
        unique: true,
        minlength:1,
        maxlength:100,
        required:true
    },
    contratacion: {
        type: String,
        enum: {
            values: ["eventual", "agencia", "efectivo", "externo"],
            message: MENSAJE
        },
        minlength:1,
        maxlength:100,
        required:true
    },
    fecha_ingreso: {
        type: Date,
        default: new Date(),
        minlength:1,
        maxlength:100,
        required:true
    },
    gerencia: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
        
    },
    area: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
        
    },
    sector: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
        
    },
    centro_de_costo: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
    },
    convenio: {
        type: String,
        enum: {
            values: ["plastico", "fuera de convenio"],
            message: MENSAJE
        },
        minlength:1,
        maxlength:100,
        required:true
    },
    categoria: {
        type: String,
        enum: {
            values: ["operario", "auxiliar", "operador", "operador calificado", "operador especializado", "oficial especializado","medio oficial mantenimiento", "oficial de mantenimiento","administrativo nivel 1", "administrativo nivel 2", "administrativo nivel 3", "administrativo nivel 4", "administrativo nivel 5", "capataz", "ayudante de chofer", "conductor de autoelevador","proveedor",null],
            message: MENSAJE
        },
        minlength:1,
        maxlength:100,
        required:true
    },
    dni: {
        type: String,
        unique: true,
        minlength:1,
        maxlength:100,
        required:true
    },
    fecha_nacimiento: {
        type: Date,
        minlength:1,
        maxlength:100,
        required:true
    },
    sexo: {
        type: String,
        enum: {
            values: ["hombre", "mujer", "otro"],
            message: MENSAJE
        },
        minlength:1,
        maxlength:100,
        required:true
    },
    email: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true,


    },
    telefono: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
    },
    telefono_urgencias: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
    },
    pais: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
    },
    provincia: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
    },
    localidad: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
    },
    calle: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
    },
    numero: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
    },
    dpto: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
    },
    piso: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
    },
    codigo_postal: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
    },

    nivel_de_educacion: {
        type: String,
        minlength:1,
        maxlength:100,
        enum:{
            values:["primario","secundario","terciario","universitario"],
            message:MENSAJE
        },
        required:true
    },
    activo: {
        type: Boolean,
        default:true,
        required:true
    },

    fecha_egreso: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true

    },
    estado_ambiental: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
    },
    examen_preocupacional: {
        type: String,
        minlength:1,
        maxlength:100,
        required:true
    },
    tipo_liquidacion: {
        type: String,
        enum: {
            values: ["jornal", "mensual","jornal nacion","mensual nacion"],
            message: MENSAJE
        },
        minlength:1,
        maxlength:100,
        required:true
    },
    rotacion: {
        type: String,
        enum: {
            values: ["fijo", "6x1"],
            message: MENSAJE
        },
        minlength:1,
        maxlength:100,
        required:true
    },
    grupo: {
        type: String,
        enum: {
            values: ["a", "b", "c","-"],
            message: MENSAJE,
        },
        minlength:1,
        maxlength:100,
        required:true
    },
    jornada: [[[{
        fecha: {
            type: Date,
        },
        feriado: {
            type: Boolean,
            default: false
        },
        suspension: {
            type: Boolean,
            default: false
        },
        licencia: {
            type: String,
            emun:{
                values:[
                    "enfermedad diurna",
                    "enfermedad nocturna",
                    "enfermedad diurna/nocturna",
                    "licencia gremial",
                    "diurna feriado ley",
                    "nocturna feriado ley",
                    "diurna/nocturna feriado ley",
                    "accidente",
                    "vacaciones",
                    "maternidad",
                    "mudanza",
                    "nacimiento",
                    "ausente con aviso",
                    "ausente sin aviso",
                    "examen",
                    "suspension",
                    "fallecimiento",
                    "matrimonio",
                    "donacion de sangre",
                    "ausencia enfermedad injustificada",
                    "diurna reserva legal de puesto",
                    "nocturna reserva legal puesto",
                    "diurna/nocturna reserva legal puesto",
                    "aislamiento COVID",
                    "licencia vacunacion"
                  ],
                message:MENSAJE
            }
        },
        turno: {
            type: String,
            enum: {
                values: ["mañana", "tarde", "noche", "-", ""],
                message: MENSAJE
            },
            default:"-"
        },
        entrada: {
            type: Date || null,
            default: null
        },
        salida: {
            type: Date || null,
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
        diurna_enfermedad: {
            type: Number,
            default: 0
        },
        nocturna_enfermedad: {
            type: Number,
            default: 0
        },
        licencia_gremial: {
            type: Number,
            default: 0
        },
        diurna_feriado_ley: {
            type: Number,
            default: 0
        },
        nocturna_feriado_ley: {
            type: Number,
            default: 0
        },
        accidente: {
            type: Number,
            default: 0
        },
        vacaciones: {
            type: Number,
            default: 0
        },
        licencia_maternidad: {
            type: Number,
            default: 0
        },
        licencia_mudanza: {
            type: Number,
            default: 0
        },
        licencia_nacimiento: {
            type: Number,
            default: 0
        },
        ausente_con_aviso: {
            type: Number,
            default: 0
        },
        ausente_sin_aviso: {
            type: Number,
            default: 0
        },
        licencia_examen: {
            type: Number,
            default: 0
        },
        horas_suspension: {
            type: Number,
            default: 0
        },
        licencia_fallecimiento: {
            type: Number,
            default: 0
        },
        licencia_matrimonio: {
            type: Number,
            default: 0
        },
        licencia_donacion_sangre: {
            type: Number,
            default: 0
        },
        ausencia_enfermadad_injustificada: {
            type: Number,
            default: 0
        },
        diurna_reserva_legal_puesto: {
            type: Number,
            default: 0
        },
        nocturna_reserva_legal_puesto: {
            type: Number,
            default: 0
        },
        licencia_aislamiento: {
            type: Number,
            default: 0
        },
        licencia_vacunacion: {
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
        total_diurna_enfermedad: {
            type: Number,
            default: 0
        },
        total_nocturna_enfermedad: {
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
        total_accidente: {
            type: Number,
            default: 0
        },
        total_vacaciones: {
            type: Number,
            default: 0
        },
        total_licencia_maternidad: {
            type: Number,
            default: 0
        },
        total_licencia_mudanza: {
            type: Number,
            default: 0
        },
        total_licencia_nacimiento: {
            type: Number,
            default: 0
        },
        total_ausente_con_aviso: {
            type: Number,
            default: 0
        },
        total_ausente_sin_aviso: {
            type: Number,
            default: 0
        },
        total_licencia_examen: {
            type: Number,
            default: 0
        },
        total_suspension: {
            type: Number,
            default: 0
        },
        total_licencia_fallecimiento: {
            type: Number,
            default: 0
        },
        total_licencia_matrimonio: {
            type: Number,
            default: 0
        },
        total_licencia_donacion_sangre: {
            type: Number,
            default: 0
        },
        total_ausencia_enfermadad_injustificada: {
            type: Number,
            default: 0
        },
        total_diurna_reserva_legal_puesto: {
            type: Number,
            default: 0
        },
        total_nocturna_reserva_legal_puesto: {
            type: Number,
            default: 0
        },
        total_licencia_aislamiento: {
            type: Number,
            default: 0
        },
        total_licencia_vacunacion: {
            type: Number,
            default: 0
        },
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