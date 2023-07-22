const CategoryController = require("../controllers/categoryController");
const passport = require("passport");

module.exports = (app) => {
    app.get("/api/categoria/listar", CategoryController.ListarCategoria);
    app.post("/api/categoria/create", CategoryController.create);
    app.put("/api/categoria/actualizar", CategoryController.actualizarCategory);
    app.delete(
        "/api/categoria/eliminar/:id_categoria",
        CategoryController.eliminarCategoria
    );

    app.get(
        "/api/categoria/listarIdCategoria/:id_categoria",
        CategoryController.ListarIdCategoria
    );

    app.delete(
        "/api/categoria/eliminar/:id",
        CategoryController.eliminarCategoria
    );
};