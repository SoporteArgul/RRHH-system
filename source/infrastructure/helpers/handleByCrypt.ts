import bcrypt from "bcryptjs"


export async function encrypt(textPlain:string){
    //Encriptamos 
    const hash = await bcrypt.hash(textPlain, 10)//Hasheamos
    return hash
}


export async function compare(passwordPlain:string, hashPassword:string){
    //Comparamos
    return await bcrypt.compare(passwordPlain, hashPassword)
}