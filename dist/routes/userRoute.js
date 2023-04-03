"use strict";
// Node modules.
Object.defineProperty(exports, "__esModule", { value: true });
// Third party modules.
const express_1 = require("express");
// Own modules.
const userController_1 = require("../controllers/userController");
// Router development.
const router = (0, express_1.Router)();
router.get('/', userController_1.getUsers);
router.get('/:id', userController_1.getUser);
router.post('/', userController_1.createUser);
router.put('/:id', userController_1.updateUser);
router.delete('/:id', userController_1.deleteUser);
exports.default = router;
//# sourceMappingURL=userRoute.js.map