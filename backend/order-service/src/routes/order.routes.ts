import { Router } from "express";
import { placeOrder, getAllOrders, getUserOrders, updateOrderStatus } from "../controllers/order.controller";
import { verifyToken } from "../middleware/auth.middleware";

const router=Router();

router.post('/', verifyToken, placeOrder);
router.get('/my', verifyToken, getUserOrders);
router.put('/:id/status', updateOrderStatus); // Optional: protect as admin
router.get('/', getAllOrders); // Optional: protect as admin

export default router;