const UsersController = require("../controllers/usersController");
const passport = require("passport");

module.exports = (app, upload) => {
    app.put("/api/users/updateCorreo", UsersController.updateCorreo);
    app.put("/api/users/updatePassword", UsersController.updatePassword);
    app.post("/api/users/recuperar", UsersController.ContraeRecuparar);
    app.post("/api/users/verificarPassword", UsersController.verificarContrasen);
    app.post("/api/users/crear", UsersController.Crear);
    app.post("/api/users/login", UsersController.login);
    app.post("/api/users/logout", UsersController.logout);
};