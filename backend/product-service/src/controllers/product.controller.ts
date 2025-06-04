import { Request, Response } from 'express';
import { Product } from '../models/product.model';


class ProductController {
  public async createProduct (req: Request, res: Response) {
    try {
      const product = await Product.create(req.body);
      res.status(201).json(product);
    } catch (err) {
      res.status(500).json({ message: 'Failed to create product' });
    }
  }

  public async getAllProducts (req: Request, res: Response) {
    try {
    const { search, category, minPrice, maxPrice } = req.query;

    const where: any = {};
    if (search) where.name = { $like: `%${search}%` };
    if (category) where.category = category;
    if (minPrice || maxPrice) where.price = { $between: [minPrice || 0, maxPrice || 100000] };

    const products = await Product.findAll({ where });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Failed to get products' });
  }
}

public async getProductById (req: Request, res: Response) {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });
  res.json(product);
};

public async updateProduct (req: Request, res: Response) {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  await product.update(req.body);
  res.json(product);
};

public async deleteProduct (req: Request, res: Response) {
  const product = await Product.findByPk(req.params.id);
  if (!product) return res.status(404).json({ message: 'Product not found' });

  await product.destroy();
  res.json({ message: 'Deleted successfully' });
};


}
export default new ProductController();