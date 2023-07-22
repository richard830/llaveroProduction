const PasswordController = require("../controllers/passwordController");
const passport = require("passport");

module.exports = (app) => {
    app.get(
        "/api/password/listar",
        passport.authenticate("jwt", { session: false }),
        PasswordController.ListarPassword
    );
    app.get("/api/password/total", PasswordController.TotalPassword);
    app.post("/api/password/create", PasswordController.create);
    app.put("/api/password/editar", PasswordController.updatePassword);
    app.delete(
        "/api/password/eliminar/:id_password",
        PasswordController.eliminarPassword
    );
};