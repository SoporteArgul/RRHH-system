interface Jornadas{
   fecha: Date;
   suspension:Boolean;
   licencia:string;
   feriado:Boolean;
   turno:string;
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
   observaciones:string;
}

interface Liquidacion{
    fecha_liquidacion_horas:Date;
    total_horas_diurnas:Number;
    total_horas_nocturnas:Number;
    total_horas_diurnas_50:Number;
    total_horas_nocturnas_50:Number;
    total_horas_diurnas_100:Number;
    total_horas_nocturnas_100:Number;
    total_diurna_enfermedad:Number;
    total_nocturna_enfermedad:Number;
    total_licencia_gremial:Number;
    total_diurna_feriado_ley:Number;
    total_nocturna_feriado_ley:Number;
    total_accidente:Number;
    total_vacaciones:Number;
    total_licencia_maternidad:Number;
    total_licencia_mudanza:Number;
    total_licencia_nacimiento:Number;
    total_ausente_con_aviso:Number;
    total_ausente_sin_aviso:Number;
    total_licencia_examen:Number;
    total_suspension:Number;
    total_licencia_fallecimiento:Number;
    total_licencia_matrimonio:Number;
    total_licencia_donacion_sangre:Number;
    total_ausencia_enfermadad_injustificada:Number;
    total_diurna_reserva_legal_puesto:Number;
    total_nocturna_reserva_legal_puesto:Number;
    total_licencia_aislamiento:Number;
    total_licencia_vacunacion:Number;
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

export {Licencias,Jornadas,Liquidacion}