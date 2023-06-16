const Userfoto = require('../models/userfoto');
const storage = require('../utils/cloud_storage');
const asyncFortEach = require('../utils/async_foreach');


module.exports = {


    async Mi_Estado(req, res, next) {
        try {

            const active = req.body;

            const data = await Userfoto.estado(active);

            return res.status(201).json({
                data,
                success: true
            })
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar seguidor ${error}`,
                success: false,
                error: error
            })
        }
    },


    async eliminarFoto(req, res, next) {
        try {
            const id = req.params.id_userfoto;
            const iduser = req.params.id_usuario;

            const data = await Userfoto.EliminarFoto(id, iduser)
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



    async fotoFavoritoNumero_Mayor(req, res, next) {
        try {
            const id_usuario = req.params.id_usuario;

            const total = await Userfoto.fotoFavoritoNumeroMayor(id_usuario);
            return res.status(201).json(total)
        } catch (error) {

            return res.status(501).json({
                essage: `Error al Contar los Megusta ${error}`,
                success: false,
                error: error
            })
        }
    },


    async AgregarVista(req, res, next) {
        try {
            const id = req.body;

            const total = await Userfoto.agregarvista(id);
            return res.status(201).json({
                total,
                success: true
            })
        } catch (error) {

            return res.status(501).json({
                essage: `Error al Contar los Megusta ${error}`,
                success: false,
                error: error
            })
        }
    },
    async TotalFotosxId(req, res, next) {
        try {
            const id_usuario = req.params.id_usuario;

            const total = await Userfoto.TotalFotosxId(id_usuario);
            return res.status(201).json(total)
        } catch (error) {

            return res.status(501).json({
                essage: `Error al Contar los Megusta ${error}`,
                success: false,
                error: error
            })
        }
    },
    async SumaTotalMegustaId(req, res, next) {
        try {
            const id_usuario = req.params.id_usuario;

            const total = await Userfoto.SumaTotalMegustaxId(id_usuario);
            return res.status(201).json(total)
        } catch (error) {

            return res.status(501).json({
                essage: `Error al Contar los Megusta ${error}`,
                success: false,
                error: error
            })
        }
    },


    async TotalMegustaxId(req, res, next) {
        try {
            const id_userfoto = req.params.id_userfoto;
            // const id_usuario = req.params.id_usuario;


            const total = await Userfoto.TotalMegustaId(id_userfoto);
            return res.status(201).json(total)
        } catch (error) {

            return res.status(501).json({
                essage: `Error al Contar los Megusta ${error}`,
                success: false,
                error: error
            })
        }
    },


    async ListarFotoxId(req, res, next) {
        try {
            const id_usuario = req.params.id_usuario;
            const data = await Userfoto.listarFotoxId(id_usuario);
            return res.status(201).json(data)

        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar fotos ${error}`,
                success: false,
                error: error
            })
        }
    },


    async ListarPersonaSexo(req, res, next) {
        try {
            const sexo = req.body;

            const data = await Userfoto.listarFotoxGenero(sexo);

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
    async Seguidoss(req, res, next) {
        try {
            const id = req.params.id_usuario;

            const data = await Userfoto.Seguidos(id);

            return res.status(201).json(data)
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar seguidor ${error}`,
                success: false,
                error: error
            })
        }
    },
    async Mis_SeguidoresxID(req, res, next) {
        try {
            const id = req.params.id_usuario_logueado;

            const data = await Userfoto.misSeguidores(id);

            return res.status(201).json(data)
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar seguidor ${error}`,
                success: false,
                error: error
            })
        }
    },

    async ListarFotoBuscar(req, res, next) {
        try {
            const sexo = req.body;

            const data = await Userfoto.listarFotoxBuscar(sexo);

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
    async usuarios_megusta(req, res, next) {
        try {
            const id = req.params.id_userfoto;

            const data = await Userfoto.usuario_dado_megusta(id);

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
    async ListarmeGustaXID(req, res, next) {
        try {
            const id = req.params.id_usuario;

            const data = await Userfoto.listarMeGustaxId(id);

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
    async ListarFotoBuscarDeTalle(req, res, next) {
        try {
            const usuario = req.params.id_usuario;

            const data = await Userfoto.listarFotoBuscarDetalle(usuario);

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
    async ListarFotosActivos(req, res, next) {
        try {
            const sexo = req.body;

            const data = await Userfoto.listarFotoActivos(sexo);

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


    async ListarImagenesPerfil(req, res, next) {
        try {
            const id_user = req.params.id_usuario;

            const data = await Userfoto.listarImagenPerfil(id_user);

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


    async ver(req, res, next) {
        try {
            const id_usuario = req.params.id_usuario;
            const id_userfoto = req.params.id_userfoto;
            const data = await Userfoto.verExisteFoto(id_usuario, id_userfoto);

            return res.status(201).json(data)
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al crear favorito',
                error: error
            })
        }
    },






    async verexisteSeguido(req, res, next) {
        try {
            const id_usuario_logueado = req.params.id_usuario_logueado;
            const id_usuario = req.params.id_usuario;
            const data = await Userfoto.verExisTeSeguidor(id_usuario_logueado, id_usuario);

            return res.status(201).json(data)
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al crear favorito',
                error: error
            })
        }
    },

    async registerSeguidor(req, res, next) {
        try {
            const foto = req.body;
            const data = await Userfoto.registrarSeguidor(foto);

            return res.status(201).json({
                success: true,
                message: 'As seguido a',
                //data: data.id
            })
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al crear favorito',
                error: error
            })
        }
    },

    async registerFavorito(req, res, next) {
        try {
            const foto = req.body;
            const data = await Userfoto.registrarFavorito(foto);

            return res.status(201).json({
                success: true,
                message: 'Favorito creado',
                //data: data.id
            })
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error al crear favorito',
                error: error
            })
        }
    },



    async SubirFoto(req, res, next) {
        try {

            const usuario = JSON.parse(req.body.foto);
            console.log(`Datos del usuariosssss ${JSON.stringify(usuario)}`);
            const files = req.files;

            if (files.length > 0) {
                const pathImage = `image_${Date.now()}`;
                const url = await storage(files[0], pathImage);
                if (url != undefined && url != null) {
                    usuario.foto = url;
                }
            }


            const data = await Userfoto.registrarFoto(usuario);

            return res.status(201).json({
                success: true,
                message: 'Imagen subida correctamente',
                data: data.id_userfoto,
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

}