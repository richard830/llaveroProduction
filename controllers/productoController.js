const Product = require('../models/product');
const storage = require('../utils/cloud_storage');
const asyncFortEach = require('../utils/async_foreach');
const Category = require('../models/category');


module.exports = {


    async ListarProductEcxel(req, res, next) {
        try {
            const id = req.params.id;

            const data = await Product.listarExel(id);

            return res.status(201).json(data)
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar los producto de las user ${error}`,
                success: false,
                error: error
            })
        }
    },

    async updateProduct(req, res, next) {
        try {

            const producto = req.body;

            // console.log(`Datos actualizados: ${JSON.stringify(producto)}`);

            await Product.updateProducto(producto);

            return res.status(201).json({
                success: true,
                message: 'Datos actualizado',
            });
        }
        catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                success: false,
                message: 'Hubo un error con la actualizacion  de producto',
                error: error
            });
        }
    },


    async eliminarProduct(req, res, next) {
        try {
            const id = req.params.id

            const data = await Product.Eliminar(id)
            // console.log(`Usuarios eliminado: ${data}`);
            return res.status(201).json(
                {

                    success: true,
                    message: 'Producto eliminado',
                    data
                }
            )
        } catch (error) {
            console.log(`Error: ${error}`)
            return res.status(501).json({

                success: false,
                message: 'Error al eliminar Producto'
            })
        }
    },


    async ListarPoduct(req, res, next) {
        try {
            //const id_user = req.params.id_user;


            const data = await Product.listarProductos();
            //const total = await Product.ContarProductos(id_user);
            return res.status(201).json(data

            )
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar los producto de las user ${error}`,
                success: false,
                error: error
            })
        }
    },
    async TotalProducto(req, res, next) {
        try {
            const id_user = req.params.id_user;


            const total = await Product.TotalProductos(id_user);
            return res.status(201).json(total)
        } catch (error) {

            return res.status(501).json({
                essage: `Error al Contar los producto de las user ${error}`,
                success: false,
                error: error
            })
        }
    },
    async CantidadProductoCategory(req, res, next) {
        try {
            const id_category = req.params.id_category;


            const total = await Product.ContarProductosCategori(id_category);
            return res.status(201).json(total)
        } catch (error) {

            return res.status(501).json({
                essage: `Error al Contar los producto de las user ${error}`,
                success: false,
                error: error
            })
        }
    },

    async finByproductUser(req, res) {

        try {
            const id_user = req.params.id_user;
            const id_category = req.params.id_category;

            const total = await Product.ContarProductos();

            const data = await Product.findByProductUser(id_user, id_category);

            return res.status(201).json(
                {

                    total,
                    data
                }
            )
        } catch (error) {
            console.log(`Error: ${error}`);
            return res.status(501).json({
                essage: `Error al listar los producto de las user ${error}`,
                success: false,
                error: error
            })
        }
    },


    async createproducto(req, res, next) {
        try {
            const product = req.body;
            const data = await Product.create(product);

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


}

