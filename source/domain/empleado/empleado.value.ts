import { EmpleadoEntity } from "./empleado.entity";
import {Contratacion,Categorias,Educacion,Domicilio,Dias,LiquidacionMeses, EntradaSalida, Convenio, movimientos} from "./empleado.interface";

export class EmpleadoValue implements EmpleadoEntity{
    nombre:string;
    apellido:string;
    edad:Number;
    cuil:string;
    dni:string;
    sexo:string;
    legajo:Number;
    email:string;
    telefono:string;
    domicilio:Domicilio[];
    nivel_educacion:Educacion[];
    activo:Boolean;
    fecha_ingreso:string;
    fecha_egreso:string;
    convenio:Convenio[];
    contratacion:Contratacion[];
    categoria:Categorias[];
    gerencia:string;
    area:string;
    sector:string;
    puesto:string;
    rol:string;
    jornada:movimientos[];
    almuerzo: Dias[];
    foto:string;
    liquidacion:LiquidacionMeses[];
    fichada: EntradaSalida[];
    observaciones:string;
    uuid:string;
    constructor({    
        nombre,
        apellido,
        edad,
        cuil,
        dni,
        sexo,
        legajo,
        email,
        telefono,
        domicilio,
        nivel_educacion,
        activo,
        fecha_ingreso,
        fecha_egreso,
        convenio,
        contratacion,
        categoria,
        gerencia,
        area,
        sector,
        puesto,
        rol,
        jornada,
        almuerzo,
        foto,
        liquidacion,
        observaciones,
        fichada,
        uuid,}:{    
        nombre:string;
        apellido:string;
        edad:Number;
        cuil:string;
        dni:string;
        sexo:string;
        legajo:Number;
        email:string;
        telefono:string;
        domicilio:Domicilio[];
        nivel_educacion:Educacion[];
        activo:Boolean;
        fecha_ingreso:string;
        fecha_egreso:string;
        convenio:Convenio[];
        contratacion:Contratacion[];
        categoria:Categorias[];
        gerencia:string;
        area:string;
        sector:string;
        puesto:string;
        rol:string;
        jornada:movimientos[];
        almuerzo:Dias[];
        foto:string;
        liquidacion:LiquidacionMeses[];
        fichada:EntradaSalida[];
        observaciones:string;
        uuid:string;}){
            this.nombre=nombre
            this.apellido=apellido
            this.edad=edad
            this.cuil=cuil
            this.dni=dni
            this.sexo=sexo
            this.legajo=legajo
            this.email=email
            this.telefono=telefono
            this.domicilio=domicilio
            this.nivel_educacion=nivel_educacion
            this.activo=activo
            this.fecha_ingreso=fecha_ingreso
            this.fecha_egreso=fecha_egreso
            this.convenio=convenio
            this.contratacion=contratacion
            this.categoria=categoria
            this.gerencia=gerencia
            this.area=area
            this.sector=sector
            this.puesto=puesto
            this.rol=rol
            this.jornada=jornada
            this.almuerzo=almuerzo
            this.foto=foto
            this.liquidacion=liquidacion
            this.fichada=fichada
            this.observaciones=observaciones
            this.uuid=uuid
        }
}