const nobles = [
  {
    id: 1,
    marca: "Audi",
    nombre: "A3 Sportback",
    anio: 2024,
    precio: 40000,
    carroceria: "Hatchback",
    potencia: 150,
    imagen: "assets/nobles-y-deportivos/audi-a3.png",
  },
  {
    id: 2,
    marca: "Chevrolet",
    nombre: "Cruze Premier",
    anio: 2023,
    precio: 25000,
    carroceria: "Sedán",
    potencia: 153,
    imagen: "assets/nobles-y-deportivos/chevrolet-cruze.png",
  },
  {
    id: 3,
    marca: "Fiat",
    nombre: "Cronos",
    anio: 2024,
    precio: 18000,
    carroceria: "Sedán",
    potencia: 99,
    imagen: "assets/nobles-y-deportivos/fiat-kronnos.png",
  },
  {
    id: 4,
    marca: "Nissan",
    nombre: "Sentra",
    anio: 2024,
    precio: 27000,
    carroceria: "Sedán",
    potencia: 149,
    imagen: "assets/nobles-y-deportivos/nissan-sentra.png",
  },
  {
    id: 5,
    marca: "Toyota",
    nombre: "Corolla",
    anio: 2024,
    precio: 30000,
    carroceria: "Sedán",
    potencia: 169,
    imagen: "assets/nobles-y-deportivos/toyota-corolla.png",
  },
  {
    id: 6,
    marca: "Volkswagen",
    nombre: "Golf GTI",
    anio: 2024,
    precio: 45000,
    carroceria: "Hatchback",
    potencia: 245,
    imagen: "assets/nobles-y-deportivos/volkswagen-golf.png",
  },
];
const premiums = [
  {
    id: 1,
    marca: "Aston Martin",
    nombre: "DB11",
    anio: 2024,
    precio: 200000,
    carroceria: "Coupé",
    potencia: 528,
    imagen: "assets/premiums-y-superdeportivos/aston-martin-db11.png",
  },
  {
    id: 2,
    marca: "Audi",
    nombre: "R8 V10",
    anio: 2023,
    precio: 180000,
    carroceria: "Coupé",
    potencia: 562,
    imagen: "assets/premiums-y-superdeportivos/audi-r8.png",
  },
  {
    id: 3,
    marca: "Chevrolet",
    nombre: "Corvette Stingray",
    anio: 2024,
    precio: 90000,
    carroceria: "Coupé",
    potencia: 495,
    imagen: "assets/premiums-y-superdeportivos/chevrolet-corvette.png",
  },
  {
    id: 4,
    marca: "Ford",
    nombre: "Mustang GT",
    anio: 2024,
    precio: 55000,
    carroceria: "Coupé",
    potencia: 480,
    imagen: "assets/premiums-y-superdeportivos/ford-mustang.png",
  },
  {
    id: 5,
    marca: "Mercedes-Benz",
    nombre: "AMG GT",
    anio: 2024,
    precio: 150000,
    carroceria: "Coupé",
    potencia: 523,
    imagen: "assets/premiums-y-superdeportivos/mercedes-benz-amg.png",
  },
  {
    id: 6,
    marca: "Porsche",
    nombre: "911 Carrera",
    anio: 2024,
    precio: 130000,
    carroceria: "Coupé",
    potencia: 379,
    imagen: "assets/premiums-y-superdeportivos/porsche-911.png",
  },
];

let intereses = [];

function mostrarProductos(unaLista, contenedor) {
  const contenedorAutos = document.querySelector(contenedor);
  let contenido = "";
  unaLista.forEach((auto) => {
    let manito = "assets/manito-blanca.png";
    if (intereses.includes(auto)) {
      manito = "assets/manito-naranja.png";
    }
    contenido += 
    `<div class="card-producto">
      <img src="${auto.imagen}" alt="${auto.nombre}">

      <div class = "posicionador_boton_interes" >
        <button class="card-producto__interes" type="button">
          <img src="${manito}" alt="Me interesa">
        </button>
      </div>

      <p class="card-producto__marca">${auto.marca}</p>
      <h3>${auto.nombre}</h3>

      <div class="card-producto__etiquetas">
        <span class="card-producto__etiqueta">${auto.anio}</span>
        <span class="card-producto__etiqueta">${auto.carroceria}</span>
        <span class="card-producto__etiqueta">${auto.potencia} hp</span>
      </div>

      <p class="precio">$${auto.precio}</p>

      <button class="card-producto__consultar" type="button">Consultar</button>
    </div>`;
  });
  contenedorAutos.innerHTML = contenido;

  /*Los botones recién existen después del innerHTML. 
  Las cards salen en el mismo orden que unaLista, así que el botón número i es del auto número i.*/
  const botonesInteres = contenedorAutos.querySelectorAll(".card-producto__interes");
  const botonesConsultar = contenedorAutos.querySelectorAll(".card-producto__consultar");

  unaLista.forEach((auto, i) => {
    botonesInteres[i].addEventListener("click", () => alternarInteres(auto));
    botonesConsultar[i].addEventListener("click", () => pedirInfo(auto));
  });
}

function mostrarCatalogos() {
  mostrarProductos(nobles, ".contenedor-nobles");
  mostrarProductos(premiums, ".contenedor-premiums");
}

function mostrarIntereses() {
  const campo = document.querySelector("#contacto-intereses");
  if (intereses.length === 0) {
    campo.value = "";
  } else {
    const nombres = intereses.map((auto) => `${auto.marca} ${auto.nombre}`);
    campo.value = `Me interesa: ${nombres.join(", ")}`;
  }
}

// Refleja los cambios en el campo de contacto y en el color de las manitos
function actualizarIntereses() {
  mostrarIntereses();
  mostrarCatalogos();
}

// Manito: si el auto ya estaba lo saca, si no estaba lo agrega
function alternarInteres(auto) {
  if (intereses.includes(auto)) {
    intereses = intereses.filter((interes) => interes !== auto);
  } else {
    intereses.push(auto);
  }
  actualizarIntereses();
}

// Consultar: marca el auto (si no lo estaba) y lleva al formulario
function pedirInfo(auto) {
  if (!intereses.includes(auto)) {
    intereses.push(auto);
  }
  actualizarIntereses();
  location.href = "#contacto";
}


//FORMULARIO DE CONTACTO

function enviarConsulta(event) {
  event.preventDefault(); // evita que el navegador recargue la página
  const nombre = document.querySelector("#contacto-nombre").value;

  // Se vacían los campos y la lista de intereses
  document.querySelector("#contacto-nombre").value = "";
  document.querySelector("#contacto-email").value = "";
  document.querySelector("#contacto-telefono").value = "";
  document.querySelector("#contacto-consulta").value = "";
  intereses = [];
  actualizarIntereses();

  document.querySelector("#contacto-confirmacion").textContent =
    `¡Gracias ${nombre}! Recibimos tu consulta y te vamos a contactar pronto.`;
}

function init() {
  mostrarCatalogos();
  document.querySelector("#form-contacto").addEventListener("submit", enviarConsulta);
}
init();