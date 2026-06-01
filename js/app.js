const searchBtn =
document.getElementById("searchBtn");

const searchInput =
document.getElementById("searchInput");

const countryContainer =
document.getElementById("countryContainer");

const loading =
document.getElementById("loading");

const error =
document.getElementById("error");


// ======================
// FETCH COUNTRY DATA
// ======================

async function fetchCountry(countryName){

    loading.classList.remove("d-none");

    error.classList.add("d-none");

    countryContainer.innerHTML = "";

    try{

        const response = await fetch(
            `https://restcountries.com/v3.1/name/${countryName}`
        );

        if(!response.ok){
            throw new Error("Country not found");
        }

        const data = await response.json();

        displayCountry(data[0]);

    }

    catch(err){

        error.classList.remove("d-none");

        error.innerHTML = `
        ❌ Country not found.
        Please check spelling and try again.
        `;

    }

    finally{

        loading.classList.add("d-none");

    }

}


// ======================
// DISPLAY COUNTRY
// ======================

function displayCountry(country){

    const currency =
    Object.values(country.currencies || {})[0]?.name || "N/A";

    const language =
    Object.values(country.languages || {}).join(", ") || "N/A";

    countryContainer.innerHTML =

    `
    <div class="country-card">

        <img
            src="${country.flags.svg}"
            alt="${country.name.common}"
        >

        <div class="country-info">

            <h2>
                🌍 ${country.name.common}
            </h2>

            <p>
                🏛️ <strong>Capital:</strong>
                ${country.capital?.[0] || "N/A"}
            </p>

            <p>
                🌎 <strong>Region:</strong>
                ${country.region}
            </p>

            <p>
                👥 <strong>Population:</strong>
                ${country.population.toLocaleString()}
            </p>

            <p>
                💰 <strong>Currency:</strong>
                ${currency}
            </p>

            <p>
                🗣️ <strong>Language:</strong>
                ${language}
            </p>

            <p>
                📍 <strong>Area:</strong>
                ${country.area.toLocaleString()} km²
            </p>

            <p>
                🏳️ <strong>Official Name:</strong>
                ${country.name.official}
            </p>

        </div>

    </div>
    `;
}


// ======================
// SEARCH BUTTON
// ======================

searchBtn.addEventListener(
"click",
()=>{

    const country =
    searchInput.value.trim();

    if(country){

        fetchCountry(country);

    }

}
);


// ======================
// ENTER KEY SUPPORT
// ======================

searchInput.addEventListener(
"keypress",
(e)=>{

    if(e.key === "Enter"){

        searchBtn.click();

    }

}
);


// ======================
// LOAD INDIA BY DEFAULT
// ======================

window.addEventListener(
"load",
()=>{

    fetchCountry("India");

}
);


// ======================
// CONSOLE MESSAGE
// ======================

console.log(
"%cCountry Explorer Loaded Successfully 🌍",
"color:green;font-size:16px;font-weight:bold;"
);