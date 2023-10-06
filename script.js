const token = "T0oWforYzYoSOUsHsmiARfQ9sLz4Qkqbr7m7jnNw";

// Modal
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("clickable-img")) {
    openInModal(`<img class="modal-img" src="${e.target.currentSrc}">`);
  }
});

document.querySelector(".modal").addEventListener("click", () => {
  document.querySelector(".modal").classList.remove("open");
});

// Генерирование картинки дня
getResponse(`https://api.nasa.gov/planetary/apod?api_key=${token}`, "APOD");

// Constructor

// APOD
document
  .querySelector("#constructor-APOD-show-btn")
  .addEventListener("click", () => {
    let date = document.querySelector("#constructor-APOD-date-input").value;
    if (!date) {
      return;
    }

    let selectedDate = new Date(date);
    let now = new Date();
    if (selectedDate > now) {
      alert("Этого фото пока нет");
      return;
    }

    getResponse(
      `https://api.nasa.gov/planetary/apod?api_key=${token}&date=${date}`,
      "APOD_Constructor"
    );
  });

async function getResponse(url, typeOfOperation) {
  try {
    const response = await fetch(url);
    const data = await response.json();

    switch (typeOfOperation) {
      case "APOD":
        document.querySelector(".pic-of-the-day").src = data.hdurl;
        document.querySelector(".pic-of-the-day-img-title").textContent =
          data.title;
        document.querySelector(".pic-of-the-day-explanation").textContent =
          data.explanation;
        break;
      // тут будут остальные..

      // Constructor
      case "APOD_Constructor":
        document.querySelector(".constructor-APOD-result").innerHTML = `
        <img class="constructor-APOD-result-img clickable-img" src="${data.hdurl}">
        <div class="constructor-APOD-result-img-title">${data.title}</div>
        <div class="constructor-APOD-result-explanation">${data.explanation}</div>
        `;
        break;
    }
  } catch (error) {
    console.log(error);
  }
}

function openInModal(el) {
  document.querySelector(".modal-box").innerHTML = el;
  document.querySelector(".modal").classList.add("open");
}
