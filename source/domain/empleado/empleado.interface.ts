
interface Convenio{
    plastico:string
    fuera_convenio:string
}

interface Jornadas{
   fecha: Date;
   feriado:Boolean;
   entrada:Date|null;
   salida:Date|null;
   entrada_descanso:Date|null;
   salida_descanso:Date|null;
   habilitado_horas_extra:Boolean;
   entrada_horas_extra:Date|null;
   salida_horas_extra:Date|null;
   descanso:Boolean;
   horas_diurnas:number;
   horas_nocturnas:number;
   horas_diurnas_50:number;
   horas_nocturnas_50:number;
   horas_diurnas_100:number;
   horas_nocturnas_100:number;
}

interface Contratacion{
    eventual:string
    agencia:string
    efectivo:string
    externo:string
}




interface Domicilio{
    pais:string;
    provincia:string;
    localidad:string;
    calle:string;
    numero:Number;
    codigo_postal:string;
}

interface Educacion{
    primario:Boolean;
    secundario:Boolean;
    terciario:Boolean;
    universitario:Boolean;
    titulo:string;
}

 interface Produccion{
    posicion:string
 }
interface Mantenimiento{
    posicion:string
}

interface Administracion{
    posicion:string
}

interface Categorias{
    produccion:Produccion[]
    matenimineto:Mantenimiento[]
    administracion:Administracion[]
    fuera_convenio:Boolean;
}
interface Liquidacion{
    fecha_liquidacion_horas:Date;
    total_horas_diurnas:Number;
    total_horas_nocturnas:Number;
    total_horas_diurnas_50:Number;
    total_horas_nocturnas_50:Number;
    total_horas_diurnas_100:Number;
    total_horas_nocturnas_100:Number;
}

interface Licencias{
    accidente:boolean;
    enfermedad:boolean;
    vacaciones:boolean;
    maternidad:boolean;
    mudanza:boolean;
    ausente_con_aviso:boolean;
    ausente_sin_aviso:boolean;
    examen:boolean;
    suspension:boolean;
    fallecimineto:boolean;
    matrimonio:boolean;
    donacion_de_sangre:boolean;
    ausencia_enfermedad_injustificada:boolean;
    reserva_legal_de_puesto:boolean;
    licencia_aislamiento:boolean;
    licencia_covid:boolean;
}

export {Licencias,Jornadas,Categorias,Educacion,Domicilio,Liquidacion}