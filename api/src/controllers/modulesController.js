const {Modules } = require("../db");


// Controlador para obtener todos los modulos
const getModules = async()=>{
   const modules = await Modules.findAll()
   if (modules.length < 1) {
      throw {
         name: "ApiFindError",
         type: "Module Error",
         error: {
            message: "there are no modules in the database",
            type: "data not found",
            code: 404,
         },
      };
   }
}

// Controlador para crear un modulo
const createModule = async({name, description }) => {
  const module =await Modules.create({ name, description })
  return module.save()
   
  
           
};

// Controlador para editar un modulo
const editModule = async(id, name, description) =>{
   const module = await Modules.findOne({ where: { id } });
   module.update({name , description})

}

// Controlador para obtener un modulo por ID 
const getModulesById = async (id) =>{
   const module = await Modules.findOne({ where: { id } })

   if (!module) {
      throw{
        error: {
          name: "ApiFindError",
          type: "Module Error",
          errors: [
            {
              message: "module does not exist in the database",
              type: "not found",
              value: null,
            },
          ],
        },
      };
    }
}

// Controlador para eliminar un modulo
const deleteModule = async (id) => {
   const module = await Modules.findOne({ where: { id } });
   await module.destroy();

   return { message: "successfully removed" };
};


module.exports ={
   getModules,
   createModule,
   deleteModule,
   editModule,
   getModulesById
}
