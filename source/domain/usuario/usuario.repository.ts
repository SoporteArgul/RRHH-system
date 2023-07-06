import { User } from "./usuario.entity";

export interface UsuarioRepository{
    login(email:string):Promise<any>;
    register(usuario:User):Promise<any>;
    update(id:string,usuario:User):Promise<any>;
    delete(id:string):Promise<any>;
    list():Promise<any>;
    listById(id:string):Promise<any>;
}