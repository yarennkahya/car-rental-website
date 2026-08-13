
const cars = [
    { model: "BMW 3 Serisi", price: 1500, image: "images/bmw.jpg" },
    { model: "Mercedes C-Class", price: 1800, image: "images/mercedes.avif" },
    { model: "Renault Clio", price: 900, image: "images/renault.avif" }
];

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

const carsContainer = document.querySelector(".popular-cars .row");
carsContainer.innerHTML = cars.map(createCarCardHTML).join("");


const turkishProvinces = [
    "Adana","Adıyaman","Afyonkarahisar","Ağrı","Amasya","Ankara","Antalya","Artvin","Aydın","Balıkesir",
    "Bilecik","Bingöl","Bitlis","Bolu","Burdur","Bursa","Çanakkale","Çankırı","Çorum","Denizli",
    "Diyarbakır","Edirne","Elazığ","Erzincan","Erzurum","Eskişehir","Gaziantep","Giresun","Gümüşhane","Hakkari",
    "Hatay","Isparta","Mersin","İstanbul","İzmir","Kars","Kastamonu","Kayseri","Kırklareli","Kırşehir",
    "Kocaeli","Konya","Kütahya","Malatya","Manisa","Kahramanmaraş","Mardin","Muğla","Muş","Nevşehir",
    "Niğde","Ordu","Rize","Sakarya","Samsun","Siirt","Sinop","Sivas","Tekirdağ","Tokat",
    "Trabzon","Tunceli","Şanlıurfa","Uşak","Van","Yozgat","Zonguldak","Aksaray","Bayburt","Karaman",
    "Kırıkkale","Batman","Şırnak","Bartın","Ardahan","Iğdır","Yalova","Karabük","Kilis","Osmaniye","Düzce"
];

const locationSelect = document.querySelector("#location");

turkishProvinces.forEach(city => {
    const option = document.createElement("option");
    option.value = city;
    option.textContent = city;
    locationSelect.appendChild(option);
});


// HERO BUTONU: "POPÜLER ARAÇLAR"A KAYDIR
const heroButton = document.querySelector(".hero button");

heroButton.addEventListener("click", function() {
    document.querySelector(".popular-cars").scrollIntoView({ behavior: "smooth" });
});

// ============================
// "İNCELE" BUTONLARI (kartlar dinamik olduğu için event delegation kullanıyoruz)
// ============================
carsContainer.addEventListener("click", function(event) {
    if (event.target.tagName === "BUTTON") {
        const card = event.target.closest(".car-card");
        const carName = card.querySelector("h3").textContent;
        const carPrice = card.querySelector("p").textContent;
        alert(carName + "\n" + carPrice + "\n\nDetay sayfası yakında eklenecek.");
    }
});


const rentalForm = document.querySelector("form");
const pickupDateInput = document.querySelector("#pickup-date");
const returnDateInput = document.querySelector("#return-date");

// Bugünden önceki tarihler alış tarihi olarak seçilemesin
const today = new Date().toISOString().split("T")[0];
pickupDateInput.min = today;


pickupDateInput.addEventListener("change", function() {
    returnDateInput.min = pickupDateInput.value;
});

rentalForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const location = locationSelect.value;
    const pickupDate = pickupDateInput.value;
    const returnDate = returnDateInput.value;

    if (!location) {
        alert("Lütfen bir şehir seçin.");
        return;
    }

    if (!pickupDate || !returnDate) {
        alert("Lütfen alış ve iade tarihlerini seçin.");
        return;
    }

    if (returnDate < pickupDate) {
        alert("İade tarihi, alış tarihinden önce olamaz!");
        return;
    }

    alert("Arama yapılıyor:\n" + location + "\n" + pickupDate + " - " + returnDate);
});