const socket = io();

socket.on("products", (data) => {
  renderProducts(data);
});

const renderProducts = (products) => {
  const productsContainer = document.getElementById("productsContainer");
  productsContainer.innerHTML = "";

  products.forEach((item) => {
    const card = document.createElement("div");
    card.classList.add("card");

    card.innerHTML = `
                <p>Id: ${item.id} </p>
                <p>Title: ${item.title} </p>
                <p>Price: ${item.price} </p>
                <div >
                <button><img class="w-50" src="https://res.cloudinary.com/duew1qr9a/image/upload/v1705527113/borrar_ztxwad.png" alt="Icono de Enviar"</button>
                </div>
        
        `;
    productsContainer.appendChild(card);

    card.querySelector("button").addEventListener("click", () => {
      deleteProduct(item.id);
    });
    card.querySelector("button").classList.add("w-4");
  });
};

const deleteProduct = (id) => {
  socket.emit("deleteProduct", id);
};

document.getElementById("btnSend").addEventListener("click", () => {
  addProduct();
});

const addProduct = () => {
  const product = {
    title: document.getElementById("title").value,
    description: document.getElementById("description").value,
    price: document.getElementById("price").value,
    img: document.getElementById("img").value,
    code: document.getElementById("code").value,
    stock: document.getElementById("stock").value,
    category: document.getElementById("category").value,
    status: document.getElementById("status").value === "true",
  };

  socket.emit("addProduct", product);
};
