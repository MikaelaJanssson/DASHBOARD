// KLOCKA OCH DATUM
function updateClock() {
  let now = new Date();

  // klockan
  document.getElementById("time").textContent = now.toLocaleTimeString();

  // Uppdatera datumet i annat format
  const options = { year: "numeric", month: "long", day: "numeric" };
  const formattedDate = now.toLocaleDateString("sv-SE", options);
  document.getElementById("date").textContent = formattedDate;
}

// Kör funktionen varje sekund
setInterval(updateClock, 1000);

updateClock();

// REDIGERING AV H1 - DASHBOARD TITLE
const headerTitle = document.getElementById("header_title_name");

// När man klickar på rubriken, gör den redigerbar
headerTitle.addEventListener("click", function () {
  this.contentEditable = true;
  this.focus();
});

// När redigering klar
headerTitle.addEventListener("blur", function () {
  this.contentEditable = false;
  localStorage.setItem("header_title_name", this.innerText);
});

// Ladda den sparade rubriken från localStorage när sidan laddas
window.addEventListener("load", function () {
  const savedTitle = localStorage.getItem("header_title_name");
  if (savedTitle) {
    headerTitle.innerText = savedTitle;
  }

  // Kör både fetchJoke och getLocation parallellt
  initDashboard();
});

// RUTA 1 - SNABBLÄNKAR STARTS
const addButton = document.getElementById("add-link");
const linkNameInput = document.getElementById("link-name");
const linkUrlInput = document.getElementById("link-url");
const linkList = document.getElementById("link-list");

// Funktion för att hämta favicon
function fetchFavicon(url) {
  const domain = new URL(url).hostname; // Få domänen från URL
  const faviconUrl = `https://www.google.com/s2/favicons?domain=${domain}`; // Google favicon-tjänst

  return faviconUrl;
}

// Funktion för att lägga till länk
addButton.addEventListener("click", function () {
  const name = linkNameInput.value;
  const url = linkUrlInput.value;

  if (name && url) {
    const li = document.createElement("li");
    li.classList.add("link-item");

    // Hämta favicon från länkens domän
    const faviconUrl = fetchFavicon(url);

    // Skapa HTML för länk med favicon
    li.innerHTML = `
      <a href="${url}" target="_blank">
        <img src="${faviconUrl}" alt="Favicon" class="favicon" />
        ${name}
      </a>
      <button class="delete-link">Ta bort</button>
    `;

    // Lägg till länken i listan
    linkList.appendChild(li);

    // Rensa input-fälten efter att länken lagts till
    linkNameInput.value = "";
    linkUrlInput.value = "";
  } else {
    alert("Fyll i både rubrik och URL.");
  }
});

// Funktion för att ta bort länk
linkList.addEventListener("click", function (event) {
  if (event.target.classList.contains("delete-link")) {
    const linkItem = event.target.parentElement;
    linkItem.remove();
  }
});

// RUTA 2 - VÄDER
const latitude = 57.6398; // Mölndal latitud
const longitude = 12.029; // Mölndal longitud

// Använd API-nyckeln från config.js
const apiKey = window.config.apiKey; // Hämtar API-nyckeln från config-objekt

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric&lang=sv`;

// Hämtar väderdata
fetch(weatherURL)
  .then((response) => response.json()) // Gör om svar till JSON
  .then((data) => {
    const temperature = data.main.temp; // Temperatur
    const weatherDescription = data.weather[0].description; // Väderbeskrivning

    // Visar väderinformation på sidan
    document.getElementById(
      "weatherInfo"
    ).innerText = `Temperatur: ${temperature}°C\nVäder: ${weatherDescription}`;
  })
  .catch((error) => {
    // Om något går fel, visa felmeddelande
    document.getElementById("weatherInfo").innerText = "Ett fel inträffade!";
  });

// RUTA 3 - JOKE
async function fetchJoke() {
  const url = "https://v2.jokeapi.dev/joke/Any";

  try {
    const response = await fetch(url);
    const data = await response.json();
    const jokeContainer = document.getElementById("joke-container");

    // Töm jokeContainern innan vi fyller den med nytt skämt
    jokeContainer.innerHTML = "";

    // Visa skämtet
    if (data.type === "single") {
      const jokeElement = document.createElement("p");
      jokeElement.textContent = data.joke;
      jokeContainer.appendChild(jokeElement);
    } else {
      const jokeSetup = document.createElement("p");
      jokeSetup.textContent = data.setup;

      const jokeDelivery = document.createElement("p");
      jokeDelivery.textContent = data.delivery;

      jokeContainer.appendChild(jokeSetup);
      jokeContainer.appendChild(jokeDelivery);
    }
  } catch (error) {
    console.error("Error fetching joke:", error);
    document.getElementById("joke-container").textContent =
      "Kunde inte hämta dagens skämt.";
  }
}

async function initDashboard() {
  await Promise.all([fetchJoke()]);
}

/*RUTA 4 - ANTECKNINGAR STARTS */

// Ladda anteckningarna från localStorage när sidan laddas
window.addEventListener("load", function () {
  const savedNotes = localStorage.getItem("notes"); // Hämta sparade anteckningar från localStorage
  const notesTextarea = document.getElementById("notes");

  if (savedNotes) {
    notesTextarea.value = savedNotes; // Om det finns sparade anteckningar, visa dem
  }

  // Uppdatera localStorage med den nya texten varje gång användaren skriver
  notesTextarea.addEventListener("input", function () {
    localStorage.setItem("notes", notesTextarea.value); // Spara texten i localStorage
  });
});

/*BUTTON STARTS */

// Lista med bakgrundsbild-URL:er
const backgrounds = ["images/bg1.jpg", "images/bg2.jpg", "images/bg3.jpg"];

// Funktion för att byta bakgrundsbild
function changeBackground() {
  // Välj ett random index från listan
  const randomIndex = Math.floor(Math.random() * backgrounds.length);

  // Ändra bakgrundsbilden
  document.body.style.backgroundImage = `url('${backgrounds[randomIndex]}')`;
}

// Lägg till en event listener på knappen
document
  .getElementById("changeBackgroundBtn")
  .addEventListener("click", changeBackground);
