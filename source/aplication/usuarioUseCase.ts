import { UsuarioValue } from '../domain/usuario/usuario.value';
import { encrypt } from '../infrastructure/helpers/handleByCrypt';
import { UsuarioRepository } from './../domain/usuario/usuario.repository';

const ERROR=new Error("Error de Case!")

export class UsuarioUseCase{
    constructor(private readonly usuarioRepository:UsuarioRepository){}
    public login=async(email:string)=>{
        try{
            const user=await this.usuarioRepository.login(email)
            return user
        }catch(e){
            return ERROR;
        }
    };
    public register=async({nombre,apellido,rol,activo,email,password_1}:{nombre:string,apellido:string,rol:string,activo:boolean,email:string,password_1:string,password_2:string})=>{
        try{
            const passwordHash=await encrypt(password_1);
            const usuario=new UsuarioValue({nombre,apellido,rol,activo,email,password:passwordHash});
            const user=await this.usuarioRepository.register(usuario)
            return user
        }catch(e){
            return ERROR;
        }
    };
    public update=async(id:string,{nombre,apellido,rol,activo,email,password}:{nombre:string,apellido:string,rol:string,activo:boolean,email:string,password:string})=>{
        try{
            const usuario=new UsuarioValue({nombre,apellido,rol,activo,email,password});
            const user=await this.usuarioRepository.update(id,usuario);
            return user
        }catch(e){
            return ERROR;
        }
    };
    public delete=async(id:string)=>{
        try{
            const usuario= await this.usuarioRepository.delete(id);
            return usuario;
        }catch(e){
            return ERROR;
        }
    };
    public list=async()=>{
        try{
            const usuario=await this.usuarioRepository.list();
            return usuario;
        }catch(e){
            return ERROR;
        }
    };
}