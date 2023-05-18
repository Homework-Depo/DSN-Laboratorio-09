import { Request, Response } from 'express';
import prisma from './config/database';

export const createProduct = async (req: Request, res: Response) => {
  const { body } = req

  try {
    const product = await prisma.product.create({
      data: {
        name: body.name,
        brand: body.brand,
        model: body.model,
        price: body.price,
        stock: body.stock,
        image: {
          create: {
            S3ObjectKey: body.image.S3ObjectKey,
            imgUrl: body.image.imgUrl
          }
        }
      },
      include: {
        image: true
      }
    });

    res.json(product);
  } catch (error: any) {
    res.json(error.message);
  }
}

export const updateProduct = async (req: Request, res: Response) => {
  const { params } = req;
  const { body } = req;

  try {
    const image = await prisma.image.create({
      data: {
        S3ObjectKey: body.image.S3ObjectKey,
        imgUrl: body.image.imgUrl
      }
    })

    const product = await prisma.product.update({
      where: { id: Number(params.id) },
      data: {
        name: body.name,
        brand: body.brand,
        model: body.model,
        price: body.price,
        stock: body.stock,
        image: {
          connect: {
            id: image.id
          }
        }
      },
      include: {
        image: true
      }
    })

    res.json(product);
  } catch (error: any) {
    res.json(error.message);
  }
};

export const findManyProducts = async (req: Request, res: Response) => {
  try {
    const products = await prisma.product.findMany({
      include: {
        image: true
      }
    });

    res.json(products);
  } catch (error: any) {
    res.json(error.message);
  }
};

export const findFirstProduct = async (req: Request, res: Response) => {
  const { params } = req;

  try {
    const product = await prisma.product.findFirst({
      where: {
        id: Number(params.id)
      },
      include: {
        image: true
      }
    });

    return res.json(product);
  } catch (error: any) {
    res.json(error.message);
  }
};
