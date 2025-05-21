import { Request, Response } from 'express';
import { Product } from '../models/Product.model';
import colors from 'colors';

const validateProductData = (name: any, price: any, availability: any): string[] => {
  const errors: string[] = [];

  if (typeof name !== 'string' || name.trim() === '') {
    errors.push('El campo "name" debe ser una cadena de texto no vacía.');
  }

  if (typeof price !== 'number' || isNaN(price)) {
    errors.push('El campo "price" debe ser un número.');
  } else if (price < 0) {
    errors.push('El campo "price" no puede ser negativo.');
  }

  if (typeof availability !== 'boolean') {
    errors.push('El campo "availability" debe ser un valor booleano (true/false).');
  }

  return errors;
};

export const createProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(colors.cyan('--- Petición para crear producto ---'));
    const { name, price, availability } = req.body;

    const validationErrors = validateProductData(name, price, availability);
    if (validationErrors.length > 0) {
      console.log(colors.red('Error de validación al crear producto:'));
      validationErrors.forEach(err => console.log(colors.red(`- ${err}`)));
      res.status(400).json({ errors: validationErrors });
      return;
    }

    const product = await Product.create({ name, price, availability });
    console.log(colors.green(`Producto creado exitosamente: ${product.name}`));
    res.status(201).json(product);
  } catch (error) {
    console.error(colors.red('Error al crear producto:'), error);
    res.status(500).json({ error: 'Error interno del servidor' });
  }
};

export const getProducts = async (_req: Request, res: Response): Promise<void> => {
  try {
    console.log(colors.cyan('--- Petición para obtener todos los productos ---'));
    const products = await Product.findAll();
    console.log(colors.green(`Productos obtenidos: ${products.length} encontrados.`));
    res.json(products);
  } catch (error) {
    console.error(colors.red('Error al obtener los productos:'), error);
    res.status(500).json({ error: 'Error al obtener los productos' });
  }
};

export const getProductById = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(colors.cyan(`--- Petición para obtener producto con ID: ${req.params.id} ---`));
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      console.log(colors.yellow(`Producto con ID ${req.params.id} no encontrado.`));
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }
    console.log(colors.green(`Producto encontrado: ${product.name}`));
    res.json(product);
  } catch (error) {
    console.error(colors.red('Error al obtener el producto por ID:'), error);
    res.status(500).json({ error: 'Error al obtener el producto' });
  }
};

export const updateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(colors.cyan(`--- Petición para actualizar producto con ID: ${req.params.id} (PUT) ---`));
    console.log(colors.blue('BODY RECIBIDO EN PUT:'), req.body);
    const { name, price, availability } = req.body;

    const product = await Product.findByPk(req.params.id);
    if (!product) {
      console.log(colors.yellow(`Producto con ID ${req.params.id} no encontrado para actualizar.`));
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    const validationErrors = validateProductData(name, price, availability);
    if (validationErrors.length > 0) {
      console.log(colors.red('Error de validación al actualizar producto (PUT):'));
      validationErrors.forEach(err => console.log(colors.red(`- ${err}`)));
      res.status(400).json({ errors: validationErrors });
      return;
    }

    product.name = name;
    product.price = price;
    product.availability = availability;
    await product.save();

    console.log(colors.green(`Producto con ID ${product.id} actualizado completamente.`));
    res.json(product);
  } catch (error) {
    console.error(colors.red("Error actualizando producto (PUT):"), error);
    res.status(500).json({ error: 'Error al actualizar el producto' });
  }
};

export const partialUpdateProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(colors.cyan(`--- Petición para actualizar parcialmente producto con ID: ${req.params.id} (PATCH) ---`));
    console.log(colors.blue('BODY RECIBIDO EN PATCH:'), req.body);
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      console.log(colors.yellow(`Producto con ID ${req.params.id} no encontrado para actualización parcial.`));
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    const { name, price, availability } = req.body;
    const errors: string[] = [];

    if (name !== undefined) {
      if (typeof name !== 'string' || name.trim() === '') {
        errors.push('El campo "name" debe ser una cadena de texto no vacía si se proporciona.');
      } else {
        product.name = name;
      }
    }

    if (price !== undefined) {
      if (typeof price !== 'number' || isNaN(price)) {
        errors.push('El campo "price" debe ser un número si se proporciona.');
      } else if (price < 0) {
        errors.push('El campo "price" no puede ser negativo si se proporciona.');
      } else {
        product.price = price;
      }
    }

    if (availability !== undefined) {
      if (typeof availability !== 'boolean') {
        errors.push('El campo "availability" debe ser un valor booleano (true/false) si se proporciona.');
      } else {
        product.availability = availability;
      }
    }

    if (errors.length > 0) {
      console.log(colors.red('Error de validación al actualizar parcialmente producto (PATCH):'));
      errors.forEach(err => console.log(colors.red(`- ${err}`)));
      res.status(400).json({ errors: errors });
      return;
    }

    await product.save();
    console.log(colors.green(`Producto con ID ${product.id} actualizado parcialmente.`));
    res.json(product);
  } catch (error) {
    console.error(colors.red('Error al modificar el producto (PATCH):'), error);
    res.status(500).json({ error: 'Error al modificar el producto' });
  }
};

export const deleteProduct = async (req: Request, res: Response): Promise<void> => {
  try {
    console.log(colors.cyan(`--- Petición para eliminar producto con ID: ${req.params.id} ---`));
    const product = await Product.findByPk(req.params.id);
    if (!product) {
      console.log(colors.yellow(`Producto con ID ${req.params.id} no encontrado para eliminar.`));
      res.status(404).json({ error: 'Producto no encontrado' });
      return;
    }

    await product.destroy();
    console.log(colors.green(`Producto con ID ${product.id} eliminado correctamente.`));
    res.json({ message: 'Producto eliminado correctamente' });
  } catch (error) {
    console.error(colors.red('Error al eliminar el producto:'), error);
    res.status(500).json({ error: 'Error al eliminar el producto' });
  }
};
