const productos = document.getElementById("productos");
const header = document.getElementById("header");

window.onload = function(e){
    fetch(`http://localhost:5500/api/products`)
    .then(response => response.json())
    .then(data => procesarDatos(data.payload))
    .catch(error => console.log(error));
}

function procesarDatos(data){
    console.log(data)
    header.innerHTML = `<h1>¡Bienvenido/a ${data.user.name}!</h1> <h3>Eres: ${data.user.role}</h3>`;
    
    let render = data.payload.map(function(val){
        return (`
            <div class="product-info container">
                <h2>${val.title}</h2>
                <p>description: ${val.description}</p>
                <p>price: ${val.price}</p>
                <img src="${val.thumbnail[0]}" alt="img"  width="200" height="150">
                <div class="container">
                    <button class="btn btn-dark">
                        <a class="text-decoration-none text-light" href='/product/${val._id}'>Product details</a>
                    </button>
                    <button class="btn btn-dark">Add to card</button>
                </div>
            </div>
        `);
    })

    productos.innerHTML = render.join('');

}