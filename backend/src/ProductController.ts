import { Request, Response } from 'express';
import prisma from './config/database';
import { Product } from '@prisma/client';

export const createProduct = async (req: Request, res: Response) => {
  console.log(req.body)
  res.end()
  /* const { body } = req

  try {
    const product: Product = await prisma.product.create({
      data: {
        name: body.name,
        brand: body.brand,
        model: body.model,
        price: body.price,
        stock: body.stock,
        imgS3Key: body.imgS3Key,
        imgS3Url: body.imgS3Url
      }
    });

    res.json(product);
  } catch (error: any) {
    res.json(error.message);
  } */
};

export const updateProduct = async (req: Request, res: Response) => {
  const { params } = req;
  const { body } = req;

  try {
    const product: Product = await prisma.product.update({
      where: { id: Number(params.id) },
      data: {
        name: body.name,
        brand: body.brand,
        model: body.model,
        price: body.price,
        stock: body.stock,
        imgS3Key: body.imgS3Key,
        imgS3Url: body.imgS3Url
      }
    });

    res.json(product);
  } catch (error: any) {
    res.json(error.message);
  }
};

export const deleteProduct = async (req: Request, res: Response) => {
  const { params } = req;

  try {
    const product: Product = await prisma.product.delete({
      where: {
        id: Number(params.id)
      }
    });

    res.json(product);
  } catch (error: any) {
    res.json(error.message);
  }
};

export const findManyProducts = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await prisma.product.findMany({});
    res.json(products);
  } catch (error: any) {
    res.json(error.message);
  }
};

export const findFirstProduct = async (req: Request, res: Response) => {
  const { params } = req;

  try {
    const product: Product | null = await prisma.product.findFirst({
      where: {
        id: Number(params.id)
      }
    });

    return res.json(product);
  } catch (error: any) {
    res.json(error.message);
  }
};