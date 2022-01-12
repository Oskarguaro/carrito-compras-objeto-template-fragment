//con getElementById no necesita el #
const carrito = document.getElementById("carrito");
const template = document.getElementById("template");

const fragment = document.createDocumentFragment();
const botones = document.querySelectorAll(".card .btn");

// console.log(carrito);
// console.log(template);
// console.log(fragment);
// console.log(botones);

const carritoObjeto = {};

//El dataset permite llamar al data-fruta del HTML y con fruta solo el texto contenido
const agregarAlCarrito = (e) => {
    console.log(e.target.dataset.fruta)

    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
    };

    if(carritoObjeto.hasOwnProperty(producto.titulo)){
        producto.cantidad = carritoObjeto[producto.titulo].cantidad +1;
    };

    carritoObjeto[producto.titulo] = producto;

    pintarCarrito(producto);

    // console.log(carritoObjeto);
};

const pintarCarrito = () => {
    Object.values(carritoObjeto).forEach(item => {

        //Con esto le indicamos que nuestro carrito parta vacio
        carrito.textContent = "";

        const clone = template.content.cloneNode(true);
        clone.querySelector(".lead").textContent = item.titulo;
        clone.querySelector(".badge").textContent = item.cantidad;

        fragment.appendChild(clone);

    });

    carrito.appendChild(fragment);

};

botones.forEach(btn => btn.addEventListener("click", agregarAlCarrito));