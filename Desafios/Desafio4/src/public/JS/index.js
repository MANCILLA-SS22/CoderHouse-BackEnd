const socket = io();

const newProducts = document.getElementById("newProducts");
const currentProduct = document.getElementById("currentProduct");

socket.on("productList", function(data){
    currentProduct.innerHTML = "";
    let render = data.map(function(event){
        let ans = (
            `<div class="product-render">
                <span>
                    <h2>${event.title}</h2>
                    <p>description: ${event.description}</p>
                    <p>price: ${event.price}</p>
                    <p>thumbnail: ${event.thumbnail}</p>
                    <p>code: ${event.code}</p>
                    <p>stock: ${event.stock}</p>
                    <p>status: ${event.status}</p>
                    <p>id: ${event.id}</p>
                </span>
            </div>`
        );

        return ans;
    });

    newProducts.innerHTML = render;
}); 