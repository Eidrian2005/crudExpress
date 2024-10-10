const fs = require("fs").promises;//metodo promesas para poder traer la funcion directamente


const getAllProducts = async (req, res) => {
  try {
    const data = await fs.readFile("./server/data.json", "utf8");
    const parsedData = JSON.parse(data);
    res.json(parsedData.Productos);
  } catch (error) {
    res.status(500).json({ message: "Error al obtener los productos", error });
  }
};

const postAllProducts = async (req, res) => {
    const { producto, descripcion, cantidad, precio } = req.body;
  try {

    const data = await fs.readFile("./server/data.json", "utf8");
    
    // Parsear los datos leídos del archivo
    const inv = JSON.parse(data);

    
    console.log(req.body);
    
    //se llama la constante "inv" para que lea el archivo luego se especifica cual endpoint es el que esta leyendo y/o editando
    const newProducts =
      {
        id: inv.Productos.length + 1,
        producto,
        descripcion,
        cantidad,
        precio,
      };

    inv.Productos.push(newProducts);
    await fs.writeFile("./server/data.json", JSON.stringify(inv, null, 2), "utf8");
    res.status(201).json(newProducts);
  } catch (error) {
    console.error("Error al procesar la solicitud:", error);
    res.status(500).json({ message: "Error al crear los productos", error });
  }
};

const deleteProducts = async (req, res) => {
  try {
    const data = await fs.readFile("./server/data.json", "utf8");
    const inv = JSON.parse(data);
    const { id } = req.params;
    const productsIndex = inv.Productos.findIndex(
      (producto) => producto.id === parseInt(id)
    );
    inv.Productos.splice(productsIndex, 1);
    await fs.writeFile("./server/data.json", JSON.stringify(inv, null, 2), "utf8");
    res.status(200).json({ message: "producto eliminado exitosamente." });
  } catch (error) {
    console.error("error al eliminar producto");
    res.status(500).json({ message: "error interno del servidor" });
  }
};

const updateProducts = async (req, res) => {
  try {
    const data = await fs.readFile("./server/data.json", "utf8");
    
    // Parsear los datos leídos del archivo
    const inv = JSON.parse(data);
    const { id } = req.params;
    const { producto, descripcion, cantidad, precio } = req.body;
    const productsIndex = inv.Productos.findIndex(
      (producto) => producto.id === parseInt(id)
    );
    if (producto) {
      inv.Productos[productsIndex].producto = producto;
    }
    if (descripcion) {
      inv.Productos[productsIndex].descripcion = descripcion;
    }
    if (cantidad) {
        inv.Productos[productsIndex].cantidad = cantidad;
      }
      if (precio) {
        inv.Productos[productsIndex].precio = precio;
      }
    await fs.writeFile("./server/data.json", JSON.stringify(inv, null, 2), "utf8");
    res.status(200).json({ message: "producto actualizado exitosamente." });
  } catch (error) {
    console.error("error al actualizar el producto");
    res.status(500).json({ message: "error interno del servidor" });
  }
};

module.exports = {
  getAllProducts,
  postAllProducts,
  deleteProducts,
  updateProducts,
};
