import { Request, Response } from "express";
import { Order } from "../models/order.model";

export const placeOrder= async (req:Request, res:Response)=>{
    try{
        const {products, totalAmount} =req.body
        const userId=req.user.id;

        const order= await Order.create({userId,products,totalAmount});

        res.status(201).json(order);

    }catch(error){
        res.status(500).json({error: 'Failed to place order'})
    }
}

export const getUserOrders= async (req:Request, res: Response)=>{
    const userId=req.user.id;
    const orders= await Order.findAll({where:{userId}});
    res.json(orders);
}

export const updateOrderStatus = async (req: Request, res: Response)=>{
    const {id} =req.params;
    const {status} =req.body;
    const order =await Order.findByPk(id);
    if(!order) return res.status(404).json({message:'Order not found'});

    order.status=status;
    await order.save();
    res.json(order);
}

export const getAllOrders= async (req: Request, res:Response)=>{
    const orders= Order.findAll();
    res.json(orders);
}