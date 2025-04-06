Uppgiften är en Dashboard med olika funktionaliteter. Här kan du bland annat: 
1. Lägga till/ta bort dina mest använda snabblänkar.
2. Se dagens väder i Mölndal stad. 
3. Se dagens skämt 
4. Skriva personliga anteckningar. 

För att se dagens väderprognos behöver du en egen API-nyckel. Se nedan instruktioner för att få tillgång till Mölndals väder:

Skapa ett konto på OpenWeatherMap.
Efter inloggning, gå till din API-sida och hämta en API-nyckel.

Skapa din config.js-fil:

Skapa en fil i roten av projektet och namnge den config.js.

I config.js-filen skriver du din API-nyckel enligt nedan format:

Javascript
// config.js
const config = {
  apiKey: "DIN EGEN API NYCKEL HÄR"
};

// Exportera konfigurationen för att använda den globalt i projektet
window.config = config;


Kör projektet lokalt:

När du har skapat din config.js-fil med din API-nyckel kan du köra projektet lokalt genom att öppna index.html i din webbläsare.

Vädersidan ska nu fungera och hämta väderinformation. 
