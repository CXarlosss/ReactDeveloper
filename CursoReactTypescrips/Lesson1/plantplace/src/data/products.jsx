/**
 * @typedef {Object} Product
 * @property {number} id
 * @property {string} name
 * @property {string} description
 * @property {number} price
 * @property {number} stock
 * @property {string[]} images
 * @property {string} image
 */

/** @type {Product[]} */
const products = [
  {
    id: 1,
    name: "Areca",
    description: "Planta de interior tropical que aporta frescura y vida.",
    price: 29.99,
    stock: 12,
    images: ["/img/Areca1.jpg", "/img/Areca2.jpg"],
    image: "/img/Areca1.jpg",
  },
  {
    id: 2,
    name: "Bonsai",
    description: "Árbol miniatura con gran valor decorativo y simbólico.",
    price: 45.0,
    stock: 8,
    images: ["/img/Bonsai1.jpg", "/img/Bonsai2.jpg"],
    image: "/img/Bonsai1.jpg",
  },
  {
    id: 3,
    name: "Costilla de Adán",
    description: "Planta popular por sus hojas grandes y perforadas.",
    price: 34.5,
    stock: 10,
    images: ["/img/Costilla1.jpg", "/img/Costilla2.jpg"],
    image: "/img/Costilla1.jpg",
  },
  {
    id: 4,
    name: "Jazmín",
    description: "Planta aromática con flores blancas y fragantes.",
    price: 22.99,
    stock: 14,
    images: ["/img/Jazmin1.jpg", "/img/Jazmin2.jpg"],
    image: "/img/Jazmin1.jpg",
  },
  {
    id: 5,
    name: "Pachira",
    description: "Conocida como árbol del dinero, muy usada en feng shui.",
    price: 39.99,
    stock: 7,
    images: ["/img/Pachira1.jpg", "/img/Pachira2.jpg"],
    image: "/img/Pachira1.jpg",
  },
  {
    id: 6,
    name: "Planta normal",
    description: "Planta clásica de interior, ideal para cualquier ambiente.",
    price: 14.99,
    stock: 20,
    images: ["/img/PlantaNormal1.jpg", "/img/PlantaNormal2.jpg"],
    image: "/img/PlantaNormal1.jpg",
  },
  {
    id: 7,
    name: "Sanseviera Laurenti",
    description: "Planta resistente y elegante, perfecta para principiantes.",
    price: 19.99,
    stock: 18,
    images: ["/img/Sanseviera1.jpg", "/img/Sanseviera2.jpg"],
    image: "/img/Sanseviera1.jpg", // ✅ Corregido
  },
  {
    id: 8,
    name: "Strelitzia",
    description: "Planta exótica conocida como ave del paraíso.",
    price: 49.99,
    stock: 5,
    images: ["/img/Strelitzia1.jpg", "/img/Strelitzia2.jpg"],
    image: "/img/Strelitzia1.jpg",
  },
];

export default products;
