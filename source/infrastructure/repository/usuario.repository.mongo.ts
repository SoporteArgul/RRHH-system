import { User } from "../../domain/usuario/usuario.entity";
import { UsuarioRepository } from "../../domain/usuario/usuario.repository";
import UserModel from "../model/usuario.model";


const ERROR=new Error("Error de repositorio");

export class UsuarioMongoRepository implements UsuarioRepository{
    async login(email: string): Promise<any> {
        try{
            const user= await UserModel.findOne({email});
            return user;
        }catch(e){
            return ERROR;
        }};

    async register(usuario: User): Promise<any> {
        try{
            const user= await UserModel.create(usuario);
            return user;
        }catch(e){
            return ERROR;
            
        }};

    async update(id: string, usuario: User): Promise<any> {
        try{
            const user=await UserModel.findByIdAndUpdate(id,usuario)
            return user;
        }catch(e){
            return ERROR;    
        }};

    async delete(id: string): Promise<any> {
        try{
            const user= await UserModel.findByIdAndDelete(id);    
            return user; 
        }catch(e){
            return ERROR;
            
        }};

    async list(): Promise<any> {
        try{
            const user=await UserModel.find({}).exec()
            return user; 
        }catch(e){
            return ERROR;

        }};

    async listById(id:string):Promise<any>{
        try{
            const user =await UserModel.findById({_id:id});
            return user;
        }catch(e){
            return ERROR;
        }
    }
}