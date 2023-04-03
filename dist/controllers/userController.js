"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.updateUser = exports.createUser = exports.getUser = exports.getUsers = void 0;
const user_1 = __importDefault(require("../models/user"));
const getUsers = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield user_1.default.findAll(); // This is a Promise. So I can either do .then().catch() OR handle it with async/await and in a trycatch statement.
        res.json({
            msg: "getUsersController",
            users
        });
    }
    catch (error) {
        console.log(error);
        res.send('error');
    }
});
exports.getUsers = getUsers;
const getUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield user_1.default.findOne({
        where: {
            id: id,
            active: 1
        }
    });
    if (!user) {
        return res.status(404).json({
            msg: "User Not Found",
            user
        });
    }
    return res.status(200).json({
        msg: "User Found",
        user
    });
});
exports.getUser = getUser;
const createUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { body } = req;
    try {
        const emailExists = yield user_1.default.findOne({
            where: {
                email: body.email
            }
        });
        if (emailExists) {
            return res.status(400).json({
                msg: "Email not allowed.",
                user: null
            });
        }
        const user = yield user_1.default.create(body);
        // await user.save(); // with .create() the .save is immediately done automatically.
        return res.status(200).json({
            msg: "postUserController",
            user
        });
    }
    catch (error) {
        console.log('Error while creating User:\n', error);
        return res.status(500).json({
            msg: "Error while creating User. See console log.",
            user: null
        });
    }
});
exports.createUser = createUser;
const updateUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { body } = req;
    try {
        const user = yield user_1.default.findOne({
            where: {
                id: id,
                active: 1
            }
        });
        if (!user) {
            return res.status(400).json({
                msg: "User invalid.",
                user: null
            });
        }
        yield user.update(body);
        return res.status(200).json({
            msg: "putUserController",
            user
        });
    }
    catch (error) {
        console.log('Error while updating a User:\n', error);
        return res.status(500).json({
            msg: "Error while updating a User. See console log.",
            user: null
        });
    }
});
exports.updateUser = updateUser;
const deleteUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    try {
        const user = yield user_1.default.findOne({
            where: {
                id: id,
                active: 1
            }
        });
        if (!user) {
            return res.status(404).json({
                msg: "User not found.",
                user: null
            });
        }
        user.update({ active: 0 });
        return res.status(200).json({
            msg: "DeleteUserController",
            user
        });
    }
    catch (error) {
        console.log('Error while deleting a User:\n', error);
        return res.status(500).json({
            msg: "Error while deleting a User. See console log.",
            user: null
        });
    }
});
exports.deleteUser = deleteUser;
//# sourceMappingURL=userController.js.map