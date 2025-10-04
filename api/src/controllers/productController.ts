import { Request, Response } from "express";
import * as productService from "../services/productService";

export const createProduct = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const product = await productService.createProduct({
      ...req.body,
      createdById: req.user.userId,
      organizationId: req.user.organizationId,
    });

    res.status(201).json({ data: product });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getProducts = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    const products = await productService.getProductsByOrg(req.user.organizationId);
    res.json({ data: products });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getProduct = async (req: Request, res: Response) => {
  try {
    const product = await productService.getProductById(req.params.id);
    if (!product) return res.status(404).json({ error: "Product not found" });

    res.json({ data: product });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const updateProduct = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const data = req.body;

    const updated = await productService.updateProduct(id, data);

    res.json({ data: updated });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  try {
    if (!req.user) return res.status(401).json({ error: "Unauthorized" });

    await productService.deleteProduct(req.params.id, req.user.userId);
    res.json({ message: "Product deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await productService.getAllCategories();
    res.json({ data: categories.map((c) => c.category) });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
