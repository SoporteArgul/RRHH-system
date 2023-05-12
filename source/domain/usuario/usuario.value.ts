import { User } from "./usuario.entity";

export class UsuarioValue implements User{
    nombre:string;
    apellido:string;
    activo:boolean;
    rol:string;
    email:string;
    password:string;
    constructor({nombre,apellido,activo,rol,email,password}:{nombre:string,apellido:string,activo:boolean,rol:string,email:string,password:string}){
        this.nombre=nombre;
        this.apellido=apellido;
        this.activo=activo;
        this.rol=rol;
        this.email=email;
        this.password=password;
    }

}