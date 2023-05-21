import { Request, Response } from 'express';
import prisma from './config/database';
import { Product } from '@prisma/client';
import { uploadFile, deleteFile } from './AWSController';

export const createProduct = async (req: Request, res: Response) => {
  const { body, file } = req;
  const buffer = file?.buffer
  const originalName: string = file?.originalname || ''
  const mimeType: string = req.file?.mimetype || ''

  try {
    await uploadFile(buffer, originalName, mimeType);
    const product: Product = await prisma.product.create({
      data: {
        name: body.name,
        brand: body.brand,
        model: body.model,
        price: Number(body.price),
        stock: Number(body.stock),
        imgS3Key: `images/${originalName}`,
        imgS3Url: `https://jalab09.s3.amazonaws.com/images/${originalName}`
      }
    });

    res.json(product);
  } catch (error: any) {
    res.json(error.message);
  }
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
  const { body } = req

  try {
    const deleteResult = await deleteFile(body.imgS3Key);
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