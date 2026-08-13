console.log("Merhaba, JavaScript çalışıyor!");
let carModel = "BMW 3 Serisi";
let price = 1500;
let isAvailable = true;

console.log(typeof carModel);
console.log(typeof price);
console.log(typeof isAvailable);
let cars = [
    { model: "BMW 3 Serisi", price: 1500, image: "images/bmw.jpg" },
    { model: "Mercedes C-Class", price: 1800, image: "images/mercedes.avif" },
    { model: "Renault Clio", price: 900, image: "images/renault.avif" }
];
cars.forEach(car => {
    console.log(car.model + " - Günlük " + car.price + " TL");
});

let heroTitle = document.querySelector(".hero h2");
console.log(heroTitle);
let carsContainer = document.querySelector(".popular-cars .row");
console.log(carsContainer);
function createCarCardHTML(car) {
    return `
        <div class="col-md-4">
            <article class="car-card">
                <img src="${car.image}" alt="${car.model}">
                <h3>${car.model}</h3>
                <p>Günlük ${car.price} TL</p>
                <button>İncele</button>
            </article>
        </div>
    `;
}
let cardsHTML = cars.map(car => createCarCardHTML(car)).join("");
carsContainer.innerHTML = cardsHTML;