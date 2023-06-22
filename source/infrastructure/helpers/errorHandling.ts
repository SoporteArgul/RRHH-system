const createError=function(name:string){
    return class BusinessError extends Error {
        constructor(message:string){
            super(message)
            this.name=name
        }
    }
}

export const ConnectionError=createError("ConnectionError");
export const ValidationError=createError("ValidationError");