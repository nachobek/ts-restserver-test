"use strict";
// Node modules.
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
// Third party modules.
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
// Own modules.
const userRoute_1 = __importDefault(require("../routes/userRoute")); // I can name the imported module as I wish, because it's defined to by default export the "router" constant (function).
const connection_1 = __importDefault(require("../db/connection"));
//Server Class development.
// export class Server {    // See note at the bottom.
class Server {
    constructor() {
        this.apiPaths = {
            users: '/api/users'
        };
        this.app = (0, express_1.default)();
        this.port = process.env.PORT || "8000"; // Since I defined port as string, this declaraction will throw an error given that PORT could be undefined, therefore we can also assign a default value ("8000" in this case) to workaround this.
        // Initial methods.
        this.dbConnection();
        this.middlewares();
        this.routes();
    }
    // TODO: Connect DB.
    dbConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                yield connection_1.default.authenticate();
                console.log('DB online');
            }
            catch (error) {
                throw new Error(`Failure while connecting to the DB:\n${error}`);
            }
        });
    }
    middlewares() {
        //CORS
        this.app.use((0, cors_1.default)());
        // Read Body - Express automatically parses the Request body into JSON.
        this.app.use(express_1.default.json());
        // Public folder - To deliver static content, like when a route is not found.
        this.app.use(express_1.default.static('public'));
    }
    routes() {
        this.app.use(this.apiPaths.users, userRoute_1.default);
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log('Listening at port:', this.port);
        });
    }
}
exports.default = Server; // If I only have 1 (one) class to expose/export. It can be done this way. Else we can also add "export" to the class declaration to make it "public".
//# sourceMappingURL=server.js.map