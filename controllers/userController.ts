import { Request, Response } from "express";
import User from "../models/user";


export const getUsers = async (req: Request, res: Response) => {
    
    try {
        const users = await User.findAll(); // This is a Promise. So I can either do .then().catch() OR handle it with async/await and in a trycatch statement.
    
        res.json({
            msg: "getUsersController",
            users
        });
    } catch (error) {
        console.log(error);
        res.send('error');
    }
}


export const getUser = async (req: Request, res: Response) => {
    const {id} = req.params;

    const user = await User.findOne({
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
}


export const createUser = async (req: Request, res: Response) => {
    const {body} = req;

    try {
        const emailExists = await User.findOne({
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

        const user = await User.create(body);
        // await user.save(); // with .create() the .save is immediately done automatically.
        
        return res.status(200).json({
            msg: "postUserController",
            user
        });
    } catch (error) {
        console.log('Error while creating User:\n', error);
                
        return res.status(500).json({
            msg: "Error while creating User. See console log.",
            user: null
        });
    }

}


export const updateUser = async (req: Request, res: Response) => {
    const {id} = req.params;
    const {body} = req;

    try {
        const user = await User.findOne({
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

        await user.update(body);
        
        return res.status(200).json({
            msg: "putUserController",
            user
        });
    } catch (error) {
        console.log('Error while updating a User:\n', error);
                
        return res.status(500).json({
            msg: "Error while updating a User. See console log.",
            user: null
        });
    }
}


export const deleteUser = async (req: Request, res: Response) => {
    const {id} = req.params;

    try {
        const user = await User.findOne({
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

        user.update({active: 0});
        
        return res.status(200).json({
            msg: "DeleteUserController",
            user
        });
    } catch (error) {
        console.log('Error while deleting a User:\n', error);
                
        return res.status(500).json({
            msg: "Error while deleting a User. See console log.",
            user: null
        });
    }
}