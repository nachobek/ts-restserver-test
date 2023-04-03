// Node modules.


// Third party modules.
import express, { Application } from "express";
import cors from 'cors';


// Own modules.
import userRoute from "../routes/userRoute"; // I can name the imported module as I wish, because it's defined to by default export the "router" constant (function).
import db from "../db/connection";



//Server Class development.

// export class Server {    // See note at the bottom.
class Server {

    // Although I'm initializing the app private property in the constructor, it's a good practice to define a type upon declaraction. So it's easier to tell it's type.
    // Also, in the express app case, I can either define it as "express.Application" or
    // I can destructure "Application" from the express import and use it as a standalone type, like so:
    // private app: express.Application;
    private app: Application;
    private port: string;
    private apiPaths = {
        users: '/api/users'
    }

    constructor() {
        this.app = express();
        this.port = process.env.PORT || "8000"; // Since I defined port as string, this declaraction will throw an error given that PORT could be undefined, therefore we can also assign a default value ("8000" in this case) to workaround this.
    
        // Initial methods.
        this.dbConnection();
        this.middlewares();
        this.routes();
    }


    // TODO: Connect DB.
    async dbConnection() {
        try {
            await db.authenticate();
            console.log('DB online');
        } catch (error) {
            throw new Error(`Failure while connecting to the DB:\n${error}`);
        }
    }
    

    middlewares() {
        //CORS
        this.app.use(cors());


        // Read Body - Express automatically parses the Request body into JSON.
        this.app.use(express.json());


        // Public folder - To deliver static content, like when a route is not found.
        this.app.use(express.static('public'));
    }

    routes() {
        this.app.use(this.apiPaths.users, userRoute);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Listening at port:', this.port);
        });
    }
}

export default Server; // If I only have 1 (one) class to expose/export. It can be done this way. Else we can also add "export" to the class declaration to make it "public".