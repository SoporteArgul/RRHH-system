import { User } from "../../domain/usuario/usuario.entity";
import { UsuarioRepository } from "../../domain/usuario/usuario.repository";
import { Modelo } from "../model/usuario.model";

const UserModel=Modelo()


export class UsuarioMongoRepository implements UsuarioRepository{
    async login(email: string): Promise<any> {
        try{
            const user= await UserModel.findOne({email})
            return user
        }catch(e){
            
        }
    }
    async register(usuario: User): Promise<any> {
        try{

        }catch(e){
            
        }
    }
    async update(id: string, usuario: User): Promise<any> {
        try{

        }catch(e){
            
        }
    }
    async delete(id: string): Promise<any> {
        try{

        }catch(e){
            
        }
    }
    async list(): Promise<any> {
        try{

        }catch(e){

        }
    }
}