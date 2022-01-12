//con getElementById no necesita el #
const carrito = document.getElementById("carrito");
const template = document.getElementById("template");

const fragment = document.createDocumentFragment();
const botones = document.querySelectorAll(".card .btn-sub");

const btnTotal = document.querySelector(".btn-total");
const textTotal = document.querySelector(".text-total");

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
        producto.cantidad = carritoObjeto[producto.titulo].cantidad + 1;
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

btnTotal.addEventListener("click", () => {

    const subTotal = Object.values(carritoObjeto); 
    const [subTotal1 = 0, subTotal2 = 0, subTotal3 = 0] = subTotal;

    const cantidad1 = subTotal1.cantidad;
    const cantidad2 = subTotal2.cantidad;
    const cantidad3 = subTotal3.cantidad;

    if (subTotal !== 0 && subTotal2 !== 0 && subTotal3 !== 0){
        console.log("cumple");
        const total = (cantidad1 + cantidad2 + cantidad3);
        textTotal.textContent = `Usted compró ${total} producto(s)`;
    };
    if (subTotal1 !== 0 && subTotal2 !== 0 && subTotal3 === 0){
        const total = (cantidad1 + cantidad2);
        textTotal.textContent = `Usted compró ${total} producto(s)`;
        console.log("no cumple primera condición");
    };
    if (subTotal1 !== 0 && subTotal2 === 0 && subTotal3 === 0){
        const total = cantidad1;
        textTotal.textContent = `Usted compró ${total} producto(s)`;
        console.log("no cumple segunda condición")
    }
    if (subTotal1 === 0){
        textTotal.textContent = `Seleccione los productos que desea comprar`;
    }
});
