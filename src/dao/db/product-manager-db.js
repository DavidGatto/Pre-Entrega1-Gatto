const ProductModel = require("../models/product.model.js");

class ProductManager {
  async addProduct({
    title,
    description,
    price,
    status = true,
    category,
    thumbnails = "Sin imagen",
    code,
    stock,
  }) {
    try {
      if (!title || !description || !price || !code || !stock || !category) {
        throw new Error("Todos los campos son obligatorios");
      }

      const productExists = await ProductModel.findOne({ code: code });

      if (productExists) {
        throw new Error("El código debe ser único");
      }

      const newProduct = new ProductModel({
        title,
        description,
        price,
        thumbnails,
        code,
        stock,
        category,
        status: true,
      });

      await newProduct.save();
      return newProduct; // Devuelve el nuevo producto creado
    } catch (error) {
      console.log("Error al agregar el producto", error);
      throw error;
    }
  }

  async getProducts() {
    try {
      console.log("Iniciando consulta de productos en la base de datos...");

      const products = await ProductModel.find();

      if (products && products.length > 0) {
        console.log("Productos encontrados:", products);
      } else {
        console.log("No se encontraron productos.");
      }

      console.log("Consulta de productos finalizada.");

      return products;
    } catch (error) {
      console.log("Error al obtener los productos", error);
      throw error;
    }
  }

  async getProductById(id) {
    try {
      const product = await ProductModel.findById(id);

      if (!product) {
        console.log("Producto no encontrado");
        return null;
      }

      console.log("Producto encontrado");
      return product;
    } catch (error) {
      console.log("Error al traer un producto por su id");
    }
  }

  async updateProduct(id, updatedProduct) {
    try {
      const updated = await ProductModel.findByIdAndUpdate(id, updatedProduct);

      if (!updated) {
        console.log("No se encuentra el producto");
        return null;
      }

      console.log("Producto actualizado");
      return updated;
    } catch (error) {
      console.log("Error al actualizar", error);
    }
  }

  async deleteProductById(id) {
    try {
      const deleted = await ProductModel.findByIdAndDelete(id);

      if (!deleted) {
        console.log("No se encuentra el producto");
        return null;
      }

      console.log("Producto eliminado");
    } catch (error) {
      console.log("Error al eliminar", error);
      throw error;
    }
  }
}

module.exports = ProductManager;
