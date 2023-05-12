import { Schema, model, Document, Model } from "mongoose"
import mongoose from "mongoose";
import "dotenv/config"
import { Domicilio, Educacion, Categorias, Jornadas as IJornada, Liquidacion as ICalculoHoras } from "../../domain/empleado/empleado.interface";
import path from "path";

const MENSAJE: string = "Ingrese un valor que este en las opciones!"
interface IEmpleado extends Document {
    nombre: string,
    apellido: string,
    edad: number,
    cuil: string,
    dni: string,
    sexo: string,
    legajo: number,
    email: string,
    telefono: string,
    domicilio: Domicilio[],
    fecha_ingreso: string;
    fecha_egreso: string;
    nivel_educacion: Educacion[],
    activo: boolean,
    convenio: string,
    contratacion: string,
    categoria: Categorias[],
    gerencia: string,
    area: string,
    sector: string,
    puesto: string,
    rol: string,
    tipo_liquidacion: string,
    rotacion: string,
    grupo: string,
    turno: string,
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
    nombre: {
        type: String
    },
    apellido: {
        type: String
    },
    edad: {
        type: Number
    },
    cuil: {
        type: String,
        unique: true
    },
    dni: {
        type: String,
        unique: true
    },
    sexo: {
        type: String,
        enum: {
            values: ["Hombre", "Mujer", "Otro"],
            message: MENSAJE
        }
    },
    legajo: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        unique: true
    },
    telefono: {
        type: String
    },
    domicilio: [{
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
            type: Number
        }
    }],
    nivel_educacion: [{
        primario: {
            type: Boolean,
            default: false
        },
        secundario: {
            type: Boolean,
            default: false
        },
        terciario: {
            type: Boolean,
            default: false
        },
        universitario: {
            type: Boolean,
            default: false
        },
        titulo: {
            type: String
        }
    }],
    activo: {
        type: Boolean
    },
    fecha_ingreso: {
        type: Date,
        default: new Date()
    },
    fecha_egreso: {
        type: Date || null,
        default: null
    },
    convenio: {
        type: String,
        enum: {
            values: ["Plastico", "Otro"],
            message: MENSAJE
        }
    },
    contratacion: {
        type: String,
        enum: {
            values: ["Eventual", "Agencia", "Efectivo", "Externo"],
            message: MENSAJE
        }
    },
    categoria: [{
        produccion: {
            type: String,
            enum: {
                values: ["Operario", "Auxiliar", "Operador", "Operador Calificado", "Operador Especializado", "Oficial Especializado", null],
                message: MENSAJE
            },
            default: null
        },
        mantenimiento: {
            type: String,
            enum: {
                values: ["Medio Oficial Mantenimiento", "Oficial de Mantenimiento", null],
                message: MENSAJE
            },
            default: null
        },
        administracion: {
            type: String,
            enum: {
                values: ["Nivel 1", "Nivel 2", "Nivel 3", "Nivel 4", "Nivel 5", "Capataz", "Ayudante de Chofer", "Conductor de Autoelevador", null],
                message: MENSAJE
            },
            default: null
        },
        provedor: {
            type: Boolean,
            default: false
        }
    }],
    gerencia: {
        type: String
    },
    area: {
        type: String
    },
    sector: {
        type: String
    },
    puesto: {
        type: String
    },
    rol: {
        type: String
    },
    tipo_liquidacion: {
        type: String,
        enum: {
            values: ["Jornal", "Mensual"],
            message: MENSAJE
        }
    },
    rotacion: {
        type: String,
        enum: {
            values: ["Fijo", "6x1"],
            message: MENSAJE
        }
    },
    turno: {
        type: String,
        enum: {
            values: ["Mañana", "Tarde", "Noche"],
            message: MENSAJE
        },
        default: "Mañana"
    },
    grupo: {
        type: String,
        enum: {
            values: ["A", "B", "C"],
            message: MENSAJE,
        },
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
        entrada: {
            type: Date,
        },
        salida: {
            type: Date,
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
        }
    }]]],
    liquidacion: [{
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

    }],
    observaciones: {
        type: String
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


const EmpleadoModel = model<IEmpleado>("empleado.rrhh.ts", EmpleadoSchema)
export default EmpleadoModel