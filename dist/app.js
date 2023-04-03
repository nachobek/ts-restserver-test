"use strict";
// Node modules.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Third party modules.
const dotenv_1 = __importDefault(require("dotenv"));
// Own modules.
const server_1 = __importDefault(require("./models/server"));
// Dotenv config.
dotenv_1.default.config();
// App development.
const server = new server_1.default;
server.listen();
//# sourceMappingURL=app.js.map