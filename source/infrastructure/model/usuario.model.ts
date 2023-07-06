import { Schema,model } from "mongoose"

const ERROR="Error de validacion en el modelo!"


const UsuarioSchema=new Schema({
    nombre:{
        type:String,
        maxLength: [50, "La cantidad maxima de caracteres es 50!"],
        minLength:[2,"Al menos debe contener 2 caracteres!"]
    },
    apellido:{
        type:String,
        required: true,
        maxLength: [50, "La cantidad maxima de caracteres es 8!"],
        minLength:[2,"Al menos debe contener 2 caracteres!"]
    },
    activo:{
        type:Boolean,
        default:true,
        
    },
    rol:{
        type:String,
        enum:{
            values:["Root","Administrador","Usuario"],
            message:["elige un usario valido!"]
        },
        default:"Administrador",
    },
    email:{
        type:String,
        unique: true,
        required: true,
        maxLength: [150, "La cantidad maxima de caracteres es 150!"],
        minLength:[2,"Al menos debe contener 2 caracteres!"],
        validate: {
           validator:(v:string)=>{
              return /\S+@\S+\.\S+/.test(v);
            },
           message:`No es una direccion de email valida!`}
    },
    password:{
        type:String,
        required: true,
        maxLength: [150, "La cantidad maxima de caracteres es 150!"],
        minLength:[8,"Al menos debe contener 8 caracteres!"],
    }

},
{
    timestamps: true,
    versionKey: false
 })

UsuarioSchema.methods.toJSON =function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
 }
const UserModel=model("usuario.ts",UsuarioSchema);
export default UserModel;

