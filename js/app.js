//con getElementById no necesita el #
const carrito = document.getElementById("carrito");
const template = document.getElementById("template");

const fragment = document.createDocumentFragment();
const botones = document.querySelectorAll(".card .btn-sub");

const btnTotal = document.querySelector(".btn-total");

// console.log(carrito);
// console.log(template);
// console.log(fragment);
// console.log(botones);

const carritoObjeto = {};

//El dataset permite llamar al data-fruta del HTML y con fruta solo el texto contenido
const agregarAlCarrito = (e) => {

    console.log(e.target.dataset.fruta);
    // console.log(e.target.dataset.precio);

    const producto = {
        titulo: e.target.dataset.fruta,
        id: e.target.dataset.fruta,
        cantidad: 1,
        precio: parseInt(e.target.dataset.precio),
        precioSub: parseInt(e.target.dataset.precio),
    };

    if(carritoObjeto.hasOwnProperty(producto.titulo)){
        producto.cantidad = carritoObjeto[producto.titulo].cantidad + 1;

        const precioSub = document.querySelector(".precio-sub");
        producto.precioSub = (carritoObjeto[producto.titulo].precio)*(producto.cantidad);
        precioSub.textContent = producto.precioSub;
        // console.log(producto.precioSub);
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
        clone.querySelector(".precio-unit").textContent = `$${item.precio}`;
        clone.querySelector(".precio-sub").textContent = `$${item.precioSub}`;

        fragment.appendChild(clone);

    });

    carrito.appendChild(fragment);

};

botones.forEach(btn => btn.addEventListener("click", agregarAlCarrito));

btnTotal.addEventListener("click", () => {

    const totalProducts = document.getElementById("t-products");
    const textFinal = document.querySelector(".text-final");
    const totalMoney = document.getElementById("t-money");

    const subTotal = Object.values(carritoObjeto); 
    const [subTotal1 = 0, subTotal2 = 0, subTotal3 = 0] = subTotal;

    const cantidad1 = subTotal1.cantidad;
    const cantidad2 = subTotal2.cantidad;
    const cantidad3 = subTotal3.cantidad;

    const precioSub1 = subTotal1.precioSub;
    const precioSub2 = subTotal2.precioSub;
    const precioSub3 = subTotal3.precioSub;
    
    if (subTotal !== 0 && subTotal2 !== 0 && subTotal3 !== 0){
        console.log("cumple");
        const total = (cantidad1 + cantidad2 + cantidad3);
        totalProducts.textContent = total;

        const precioTotal = (precioSub1 + precioSub2 + precioSub3);
        totalMoney.textContent = `$${precioTotal}`;

        textFinal.textContent = `
        Muchas Gracias 
        por su compra!
        😊
        `;
    };
    if (subTotal1 !== 0 && subTotal2 !== 0 && subTotal3 === 0){
        const total = (cantidad1 + cantidad2);
        totalProducts.textContent = total;

        const precioTotal = (precioSub1 + precioSub2);
        totalMoney.textContent = `$${precioTotal}`;

        textFinal.textContent = `
        Muchas Gracias 
        por su compra!
        😊
        `;
        console.log("no cumple primera condición");
    };
    if (subTotal1 !== 0 && subTotal2 === 0 && subTotal3 === 0){
        const total = cantidad1;
        totalProducts.textContent = total;

        const precioTotal = (precioSub1);
        totalMoney.textContent = `$${precioTotal}`;

        textFinal.textContent = `
        Muchas Gracias 
        por su compra!
        😊
        `;        
        console.log("no cumple segunda condición")
    }
    if (subTotal1 === 0){
        textFinal.textContent = `Seleccione los productos que desea comprar`;
    }
});
