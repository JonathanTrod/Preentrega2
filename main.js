// CREAR ARRAY CARRITO: donde se irán guardando los productos que el usuario agregue al carrito

const carrito = [];

// Debo crear dos funciones:
// Una funcion que ordene los productos de forma ASCENDENTE segun su precio
const ordenarPrecioAscendente = () => {
  productos.sort((a, b) => a.precio - b.precio);
  verListaProductos();
};

// Una funcion que ordene los productor de forma DESCENDENTE segun su precio
const ordenarPrecioDescendente = () => {
  productos.sort((a, b) => b.precio - a.precio);
  verListaProductos();
};

// Realizo una funcion que muestre la lista ordenada
const verListaProductos = () => {
  //en esta variable guardo lo que quiero mostrarle al usuario, en este caso nombre del producto y el precio
  const productosNombrePrecio = productos.map((producto) => {
    return `${producto.nombre}: \$${producto.precio}`;
  });
  alert(
    `Estos son los productos que tenemos disponibles en nuestra tienda online: \n\n${productosNombrePrecio.join(
      "\n"
    )}`
  );
  comprar(productosNombrePrecio);
};
// Realizo la funcion de compra
const comprar = (productosNombrePrecio) => {
  let productoNombre = "";
  let productoCantidad = 0;
  let agregarProducto = false;
  do {
    productoNombre = prompt(
      `¿Qué producto desea comprar?\n\n${productosNombrePrecio.join("\n")}`
    );
    productoCantidad = parseInt(prompt("¿Cuántos?"));
    //while por si el usuario no ingresa un numero o ingresa una cantidad no valida
    while (Number.isNaN(productoCantidad) || productoCantidad <= 0) {
      if (productoCantidad <= 0) {
        alert("Debe ingresar un número mayor a cero");
      } else {
        alert("Debe ingresar un número");
      }
      productoCantidad = parseInt(prompt("¿Cuántos?"));
    }
    //busco si el producto escrito por el usuario esta en mi tienda.
    const producto = productos.find(
      (producto) =>
        producto.nombre.toLowerCase() === productoNombre.toLowerCase()
    );
    if (producto) {
      agregarAlCarrito(producto, producto.id, productoCantidad);
    } else {
      alert("No se ha encontrado el producto en nuestra tienda online");
    }

    agregarProducto = confirm(
      "¿Desea agregar mas productos a su carrito de compras?"
    );
  } while (agregarProducto);
  confirmarCompra();
};
// Funcion para agregar productos al carrito. Si el producto ya estaba en mi carrito solo modifico la cantidad.
// Si el producto no estaba en mi carrito, lo agrego con .push() y luego setteo la cantidad.
const agregarAlCarrito = (producto, productoId, productoCantidad) => {
  const productoRepetido = carrito.find(
    (producto) => producto.id === productoId
  );
  if (!productoRepetido) {
    carrito.push(producto);
    producto.cantidad = productoCantidad;
  } else {
    producto.cantidad += productoCantidad;
  }
};
const eliminarProducto = (productoAEliminar) => {
  carrito.forEach((producto, index) => {
    if (producto.nombre.toLowerCase() === productoAEliminar.toLowerCase()) {
      if (producto.cantidad > 1) {
        producto.cantidad--;
      } else {
        carrito.splice(index, 1);
      }
    } else {
      alert("Ups! no hemos encontrado ese producto en su carrito de compras.");
    }
  });
  confirmarCompra();
};

const confirmarCompra = () => {
  const productosAgregados = carrito.map((producto) => {
    return `${producto.cantidad} ${producto.nombre} \n Descripción: ${producto.descripcion}`;
  });
  const isConfirmar = confirm(
    `Mis productos:\n\n ${productosAgregados.join(
      "\n"
    )} \n\nPara confirmar la compra presione 'Aceptar'. Si desea eliminar algun producto presione 'Cancelar'`
  );
  if (isConfirmar) {
    finalizarCompra(productosAgregados);
  } else {
    const productoAEliminar = prompt("¿Qué producto desea eliminar?");
    eliminarProducto(productoAEliminar);
  }
};

const finalizarCompra = (productosAgregados) => {
  const cantidadTotal = carrito.reduce((acc, item) => acc + item.cantidad, 0);
  const precioTotal = carrito.reduce(
    (acc, item) => acc + item.cantidad * item.precio,
    0
  );
  let totalConDescuento = calcularDescuento(precioTotal);
  alert(
    `Detalle de compra: \nProductos: ${productosAgregados.join(
      "\n"
    )}\nTotal: $ ${totalConDescuento}`
  );
};
// funcion para calcular descuento en caso que la compra sea mayor a 150000
const calcularDescuento = (precioTotal) => {
  let totalConDescuento = 0;
  if (precioTotal > 150000) {
    totalConDescuento = precioTotal * 0.9;
    return (
      totalConDescuento +
      "\n Felicitaciones! Ha obtenido un 10% de descuento en su compra."
    );
  } else {
    return precioTotal;
  }
};
// funcion que consulta al usuario como quiere visualizar los productos
const ordenar = () => {
  const masBaratos = confirm(
    "¿Desea ver los productos ordenados de menor a mayor precio?"
  );
  if (masBaratos) {
    ordenarPrecioAscendente();
  } else {
    const masCaros = confirm(
      "¿Desea ver los productos ordenados de mayor a menor precio?"
    );
    if (masCaros) {
      ordenarPrecioDescendente();
    } else {
      verListaProductos();
    }
  }
};

ordenar();
