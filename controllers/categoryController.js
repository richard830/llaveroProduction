const Category = require('../models/category');

module.exports ={


    async eliminarCategoria (req, res, next) {
        try {
          const id = req.params.id
    
          const data = await Category.Eliminar(id)
          // console.log(`Usuarios eliminado: ${data}`);
          return res.status(201).json(
            {
              success: true,
              message: 'Categoria eliminada',
              data
            }
          )
        } catch (error) {
          console.log(`Error: ${error}`)
          return res.status(501).json({
    
            success: false,
            message: 'Error al eliminar Categoria'
          })
        }
      },


    async ListarCategoNombr(req, res, next){
        try {
            const id_user = req.params.id_user;
            const data = await Category.listarNombr(id_user);
           // console.log(`Mi Data....: ${JSON.stringify(data)}`);
            return res.status(201).json(data);  
            
        } catch (error) {
            console.log(`Error ${error}`);
            return res.status(201).json({
                message: 'Error al Obtener las categorias',
                error: error,
                success: false
            })
        }
    },
   
    async ListarCateg(req, res, next){
        try {
            const id_user = req.params.id_user;
            
            
            const data = await Category.listarComboBox(id_user);
            
            return res.status(201).json(data)
            } catch (error) {
                console.log(`Error: ${error}`);
                return res.status(501).json({
                    essage: `Error al listar los producto de las user ${error}`,
                    success: false,
                    error:error
                })
            }
    },

    async ListarProductxIdCategory(req, res, next){
        try {
            const id = req.params.id;
            
            const data = await Category.listarDATOS(id);
            
            return res.status(201).json(data)
            } catch (error) {
                console.log(`Error: ${error}`);
                return res.status(501).json({
                    essage: `Error al listar los producto de las user ${error}`,
                    success: false,
                    error:error
                })
            }
    },



  async create(req, res, next){
    try {
        const category = req.body;
        const data = await Category.create(category);

        return res.status(201).json({
            success: true,
            message: 'Categoria creada',
            data: data.id
        })
    } catch (error) {
        console.log(`Error: ${error}`);
        return res.status(501).json({
            success: false,
            message: 'Hubo un error al crear la caetgoria',
            error:error
        })
    }
},





}