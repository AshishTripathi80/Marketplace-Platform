import { Json } from './../../node_modules/sequelize/types/utils.d';
import { Request, Response } from "express";
import { Order } from "../models/order.model";
import { AuthRequest } from "../types/auth";

export const placeOrder= async (req:AuthRequest, res:Response)=>{
    try{
        const {products, totalAmount} =req.body
        const userId=(req.user as any)?.id;

        const order= await Order.create({userId,products,totalAmount});

        res.status(201).json(order);

    }catch(error){
        res.status(500).json({error: 'Failed to place order'})
    }
}

export const getUserOrders= async (req:AuthRequest, res: Response)=>{
    const userId=(req.user as any)?.id;
    const orders= await Order.findAll({where:{userId}});
    res.json(orders);
}

export const updateOrderStatus = async (req: Request, res: Response)=>{
    const {id} =req.params;
    const {status} =req.body;
    const order =await Order.findByPk(id);
    if(!order) return res.status(404).json({message:'Order not found'});

    (order as any).status=status;
    await order.save();
    res.json(order);
}

export const getAllOrders= async (req: Request, res:Response)=>{
    const orders = await Order.findAll();
    res.status(200).json(orders);
}