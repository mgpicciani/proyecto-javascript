alert ("Bienvenido")

nombre = prompt ("¿cual es tu nombre?")

console.log(nombre)

alert ("Hola " + nombre )

edad = Number ( prompt ("¿cuantos años tenes ? " + nombre) )

if (edad >= 18){
    alert ("Podes pasar")
} else{
    alert("No podes pasar")
}


let compra = confirm("¿Desea comprar una consola de videojuegos?");

let total = 0;
let bandera = true;

const productos = [
  { id: 1, nombre: "Playstation 4", precio: 644000 },
  { id: 2, nombre: "Playstation 5", precio: 1500000 },
  { id: 3, nombre: "Nintendo Switch", precio: 1000000 },
  { id: 4, nombre: "Playstation 3", precio: 100000 },
];

function mostrarProductos() {
  let opciones = "";
  for (const producto of productos) {
    opciones += `${producto.id} - ${producto.nombre}\n`;
  }
  return opciones;
}

function agregarProducto(idProducto) {
  const producto = productos.find((producto) => producto.id === idProducto);
  if (producto) {
    total += producto.precio;
    console.log(`Producto agregado: ${producto.nombre} - Precio: $${producto.precio}`);
  } else {
    console.error("Producto no encontrado");
  }
}

while (bandera) {
  let menu = mostrarProductos() + "\n¿Qué desea hacer?\n1. Agregar producto\n2. Finalizar compra";
  let seleccion = prompt(menu);

  switch (parseInt(seleccion)) {
    case 1:
      let idProducto = prompt("Ingrese el ID del producto:");
      if (!isNaN(idProducto) && parseInt(idProducto) > 0 && parseInt(idProducto) <= productos.length) {
        agregarProducto(parseInt(idProducto));
      } else {
        alert("ID de producto inválido");
      }
      break;

    case 2:
      bandera = false;
      break;

    default:
      alert("Opción inválida. Intente nuevamente.");
  }
}

if (total > 0) {
  console.log("\nRESUMEN DE COMPRA");
  for (const producto of productos) {
    if (productos.some((p) => p.id === producto)) {
      console.log(`${producto.nombre}: $${producto.precio}`);
    }
  }
  console.log(`TOTAL: $${total}`);
  alert("¡Gracias por su compra!");
} else {
  console.log("No se han agregado productos a la compra");
}



