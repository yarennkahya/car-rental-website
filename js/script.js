// ============================
// ARAÇ VERİLERİ VE KARTLARIN OLUŞTURULMASI (sadece index.html'de)
// ============================
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
if (carsContainer) {
    carsContainer.innerHTML = cars.map(createCarCardHTML).join("");

    carsContainer.addEventListener("click", function(event) {
        if (event.target.tagName === "BUTTON") {
            const card = event.target.closest(".car-card");
            const carName = card.querySelector("h3").textContent;
            const carPrice = card.querySelector("p").textContent;
            alert(carName + "\n" + carPrice + "\n\nDetay sayfası yakında eklenecek.");
        }
    });
}

// ============================
// 81 İLİ SELECT KUTUSUNA DOLDURMA (sadece index.html'de)
// ============================
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
if (locationSelect) {
    turkishProvinces.forEach(city => {
        const option = document.createElement("option");
        option.value = city;
        option.textContent = city;
        locationSelect.appendChild(option);
    });
}

// ============================
// HERO BUTONU (sadece index.html'de)
// ============================
const heroButton = document.querySelector(".hero button");
if (heroButton) {
    heroButton.addEventListener("click", function() {
        document.querySelector(".popular-cars").scrollIntoView({ behavior: "smooth" });
    });
}

// ============================
// FORM: TARİH VE ALAN KONTROLÜ (sadece index.html'de)
// ============================
const rentalForm = document.querySelector(".search-form");
const pickupDateInput = document.querySelector("#pickup-date");
const returnDateInput = document.querySelector("#return-date");

if (rentalForm && pickupDateInput && returnDateInput) {
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
}

// ============================
// NAVBAR LİNKLERİ İLE SAYFA İÇİ KAYDIRMA (sadece index.html'de)
// ============================
const navAraclar = document.querySelector("#nav-araclar");
if (navAraclar) {
    navAraclar.addEventListener("click", function(event) {
        event.preventDefault();
        document.querySelector(".popular-cars").scrollIntoView({ behavior: "smooth" });
    });
}

const navHakkimizda = document.querySelector("#nav-hakkimizda");
if (navHakkimizda) {
    navHakkimizda.addEventListener("click", function(event) {
        event.preventDefault();
        document.querySelector("#hakkimizda").scrollIntoView({ behavior: "smooth" });
    });
}

const navIletisim = document.querySelector("#nav-iletisim");
if (navIletisim) {
    navIletisim.addEventListener("click", function(event) {
        event.preventDefault();
        document.querySelector("#iletisim").scrollIntoView({ behavior: "smooth" });
    });
}

// ============================
// ÜYELİK SİSTEMİ (localStorage) - Tüm sayfalarda ortak
// ============================

function getUsers() {
    const users = localStorage.getItem("carRentalUsers");
    return users ? JSON.parse(users) : [];
}

function saveUsers(users) {
    localStorage.setItem("carRentalUsers", JSON.stringify(users));
}

function getCurrentUser() {
    const user = localStorage.getItem("carRentalCurrentUser");
    return user ? JSON.parse(user) : null;
}

const registerForm = document.querySelector("#registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const name = document.querySelector("#reg-name").value;
        const email = document.querySelector("#reg-email").value;
        const password = document.querySelector("#reg-password").value;

        const users = getUsers();
        const alreadyExists = users.some(user => user.email === email);

        if (alreadyExists) {
            alert("Bu e-posta adresi zaten kayıtlı.");
            return;
        }

        users.push({ name, email, password });
        saveUsers(users);
        localStorage.setItem("carRentalCurrentUser", JSON.stringify({ name, email }));

        alert("Kayıt başarılı! Hoş geldin, " + name + ".");
        window.location.href = "index.html";
    });
}

const loginForm = document.querySelector("#loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function(event) {
        event.preventDefault();

        const email = document.querySelector("#login-email").value;
        const password = document.querySelector("#login-password").value;

        const users = getUsers();
        const foundUser = users.find(user => user.email === email && user.password === password);

        if (!foundUser) {
            alert("E-posta veya şifre hatalı.");
            return;
        }

        localStorage.setItem("carRentalCurrentUser", JSON.stringify({ name: foundUser.name, email: foundUser.email }));

        alert("Giriş başarılı! Hoş geldin, " + foundUser.name + ".");
        window.location.href = "index.html";
    });
}

function updateAuthUI() {
    const currentUser = getCurrentUser();
    const authContainer = document.querySelector(".navbar-auth");
    if (!authContainer) return;

    if (currentUser) {
        authContainer.innerHTML = `
            <span class="auth-link">Merhaba, ${currentUser.name}</span>
            <a href="#" class="auth-button-nav" id="logoutBtn">Çıkış Yap</a>
        `;
        document.querySelector("#logoutBtn").addEventListener("click", function(event) {
            event.preventDefault();
            localStorage.removeItem("carRentalCurrentUser");
            window.location.href = "index.html";
        });
    }
}

updateAuthUI();