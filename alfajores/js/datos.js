export const categorias = [
  { id: "todos", nombre: "Todos" },
  { id: "clasicos", nombre: "Clásicos" },
  { id: "chocolate", nombre: "Chocolate" },
  { id: "regionales", nombre: "Regionales" },
];

export const productos = [
  { id: 1, categoria: "clasicos", imagen: "img/capitan.png", nombre: "Capitan del espacio", descripcion: "Dos tapas suaves, con una linea de dulce de leche en medio y con bañado de reposteria", precio: 1800, masVendido: true },
  { id: 2, categoria: "clasicos", imagen: "img/jorgito.png", nombre: "Jorgito", descripcion: "Dos tapas de masa friable con dulce de leche y baño de chocolate", precio: 1200 },
  { id: 3, categoria: "clasicos", imagen: "img/fulbito.png", nombre: "Fulbito", descripcion: "Relleno de pasta de mani entre dos galletas artesanales", precio: 800, oferta: true },
  { id: 4, categoria: "chocolate", imagen: "img/gula.png", nombre: "Gula", descripcion: "Baño de chocolate semiamargo y relleno de dulce de leche.", precio: 2200, masVendido: true },
  { id: 5, categoria: "chocolate", imagen: "img/rasta.png", nombre: "Rasta", descripcion: "Cobertura de chocolate negro y dulce de leche suave.", precio: 2100, oferta: true },
  { id: 6, categoria: "chocolate", imagen: "img/terrabusi.png", nombre: "Terrabusi", descripcion: "Relleno cremoso de mousse con cobertura de cacao amargo.", precio: 2400 },
  { id: 7, categoria: "regionales", imagen: "img/santafesino.png", nombre: "Santafesino", descripcion: "Tapas finas, mucho dulce de leche y baño de azúcar blanco.", precio: 2000 },
  { id: 8, categoria: "regionales", imagen: "img/cordobes.png", nombre: "Cordobes", descripcion: "Relleno de dulce de leche y borde rebozado en coco.", precio: 1900 },
  { id: 9, categoria: "regionales", imagen: "img/cayote.png", nombre: "De cayote y nuez", descripcion: "Dulce de cayote con nueces picadas entre tapas de manteca.", precio: 2300 },
];

export const buscarProducto = (id) => productos.find((producto) => producto.id === id);
