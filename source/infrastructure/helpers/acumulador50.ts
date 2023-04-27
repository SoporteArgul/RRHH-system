const jornadaComun=async(entrada:number,salida:number,f:boolean,acumulador_1:number,acumulador_2:number,acumulador_3:number,acumulador_4:number,a:number,b:number,c:number,)=>{
    if (entrada==a && salida==b){
        if(f){
            acumulador_4+=8  
        }else{
            acumulador_1+=8
        }};
    if (entrada==b && salida==c){
        acumulador_1+=7
        acumulador_2+=1
        };
    if (entrada==c && salida==a){
        if(f){
            acumulador_2+=2
            acumulador_3+=6
        }else{
            acumulador_2+=8
        }};
    return {acumulador_1,acumulador_2,acumulador_3,acumulador_4}
}

const jornadaExtra1=async(entrada_salida:number,f:boolean,acumulador_1:number,acumulador_2:number,a:number,b:number,c:number,d:number)=>{
    if(f){
        if(entrada_salida==a){
            acumulador_2+=1
        }
        if(entrada_salida==b){
            acumulador_2+=2
        }
        if(entrada_salida==c){
            acumulador_2+=3
        }
        if (entrada_salida==d){
            acumulador_2+=4
        }
    }else{
        if(entrada_salida==a){
            acumulador_1+=1
        }
        if(entrada_salida==b){
            acumulador_1+=2
        }
        if(entrada_salida==c){
            acumulador_1+=3
        }
        if (entrada_salida==d){
            acumulador_1+=4
        }
    }
}





export default{jornadaComun,jornadaExtra1}