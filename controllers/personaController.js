const Persona = require('../models/persona');
const storage = require('../utils/cloud_storage');
const asyncFortEach = require('../utils/async_foreach');
const Category = require('../models/category');


module.exports = {


    async eliminarFoto(req, res, next) {
        try {
            const id = req.params.id;
            const iduser = req.params.iduser;

            const data = await Persona.EliminarFoto(id, iduser)
                //console.log(`Usuarios eliminado: ${data.id}`);
            return res.status(201).json({

                success: true,
                message: 'Foto Eliminada',
                data: data
            })
        } catch (error) {
            console.log(`Error: ${error}`)
            return res.status(501).json({

                success: false,
                message: 'Error al eliminar Producto'
            })
        }
    },


    async totaldeMegusta(req, res, next) {
        try {
            const id_user = req.params.user_id;


            const total = await Persona.TotalMegusta(id_user);
            return res.status(201).json(total)
        } catch (error) {

            return res.status(501).json({
                essage: `Error al Contar los me gusta ${error}`,
                success: false,
                error: error
            })
        }
    },


    async fotoTotal(req, res, next) {
        try {
            const id_user = req.params.iduser;


            const total = await Persona.TotalFotos(id_user);
            return res.status(201).json(total)
        } catch (error) {

            return res.status(501).json({
                essage: `Error al Contar las imagenes ${error}`,
                success: false,
                error: error
            })
        }
    },


    async likesFoto(req, res, next) {
        try {
            const foto = req.body;
            const data = await Persona.Crearlikefoto(foto);

            return res.status(201).json({
                success: true,
                message: 'Likes CREADO',
                //data: data.id
            })
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al DAR LIKES',
                error: error
            })
        }
    },


    async verExisteLink(req, res, next) {
        try {
            const id_user = req.params.user_id;
            const userfoto_id = req.params.userfoto_id;


            const total = await Persona.ExisteLink(id_user, userfoto_id);
            return res.status(201).json(total)
        } catch (error) {

            return res.status(501).json({
                essage: `Error al Contar las imagenes ${error}`,
                success: false,
                error: error
            })
        }
    },


    async CreateUsuario(req, res, next) {
        try {

            const usuario = JSON.parse(req.body.userfoto);
            console.log(`Datos del usuariosssss ${JSON.stringify(usuario)}`);
            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`;
                const url = await storage(files[0], pathImage);
                if (url != undefined && url != null) {
                    usuario.imageu = url;
                }
            }


            const data = await Persona.SubirUsuarioo(usuario);
            // const data2 = await Persona.SubirUsuarioSeguir();

            //await Persona.Crearlikefoto(usuario);

            return res.status(201).json({
                success: true,
                message: 'Imagen subida correctamente',
                data: data.id,
                //data: data2.id
            })
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al subir imagen',
                error: error
            })
        }
    },




    async createPersona(req, res, next) {
        try {

            const persona = JSON.parse(req.body.persona);
            console.log(`Datos del usuarios ${JSON.stringify(persona)}`);
            const files = req.files;
            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`;
                const url = await storage(files[0], pathImage);
                if (url != undefined && url != null) {
                    persona.image = url;
                }
            }

            const data = await Persona.CreatePersona(persona);

            return res.status(201).json({
                success: true,
                message: 'Datos guardado correctamente',
                data: data.id
            })
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al crear el producto',
                error: error
            })
        }
    },

    async ListarPersonaSexo(req, res, next) {
        try {
            const sexo = req.params.sexo;

            const data = await Persona.listarPersonas(sexo);

            return res.status(201).json(data)
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar persona ${error}`,
                success: false,
                error: error
            })
        }
    },



    async ListarImagenesporUsuario(req, res, next) {
        try {
            const id_user = req.params.user_id;

            const data = await Persona.listarImagenPosUsuario(id_user);

            return res.status(201).json(data)
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar Imagen ${error}`,
                success: false,
                error: error
            })
        }
    },


    async ListarImagenes(req, res, next) {
        try {
            const id_user = req.params.user_id;

            const data = await Persona.listarImagenPosUsuario(id_user);

            return res.status(201).json(data)
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar Imagen ${error}`,
                success: false,
                error: error
            })
        }
    },



    // async updateProduct(req, res, next) {
    //     try {

    //         const producto = req.body;

    //         // console.log(`Datos actualizados: ${JSON.stringify(producto)}`);

    //         await Product.updateProducto(producto);

    //         return res.status(201).json({
    //             success: true,
    //             message: 'Datos actualizado',
    //         });
    //     }
    //     catch (error) {
    //         console.log(`Error: ${error}`);
    //         return res.status(501).json({
    //             success: false,
    //             message: 'Hubo un error con la actualizacion  de producto',
    //             error: error
    //         });
    //     }
    // },




    // async ListarPoduct(req, res, next) {
    //     try {
    //         //const id_user = req.params.id_user;


    //         const data = await Product.listarProductos();
    //         //const total = await Product.ContarProductos(id_user);
    //         return res.status(201).json(data

    //         )
    //     } catch (error) {
    //         console.log(`Error: ${error}`);
    //         return res.status(501).json({
    //             essage: `Error al listar los producto de las user ${error}`,
    //             success: false,
    //             error: error
    //         })
    //     }
    // },
    // async TotalProducto(req, res, next) {
    //     try {
    //         const id_user = req.params.id_user;


    //         const total = await Product.TotalProductos(id_user);
    //         return res.status(201).json(total)
    //     } catch (error) {

    //         return res.status(501).json({
    //             essage: `Error al Contar los producto de las user ${error}`,
    //             success: false,
    //             error: error
    //         })
    //     }
    // },
    // async CantidadProductoCategory(req, res, next) {
    //     try {
    //         const id_category = req.params.id_category;


    //         const total = await Product.ContarProductosCategori(id_category);
    //         return res.status(201).json(total)
    //     } catch (error) {

    //         return res.status(501).json({
    //             essage: `Error al Contar los producto de las user ${error}`,
    //             success: false,
    //             error: error
    //         })
    //     }
    // },

    // async finByproductUser(req, res) {

    //     try {
    //         const id_user = req.params.id_user;
    //         const id_category = req.params.id_category;

    //         const total = await Product.ContarProductos();

    //         const data = await Product.findByProductUser(id_user, id_category);

    //         return res.status(201).json(
    //             {

    //                 total,
    //                 data
    //             }
    //         )
    //     } catch (error) {
    //         console.log(`Error: ${error}`);
    //         return res.status(501).json({
    //             essage: `Error al listar los producto de las user ${error}`,
    //             success: false,
    //             error: error
    //         })
    //     }
    // },





}