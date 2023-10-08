const token = "T0oWforYzYoSOUsHsmiARfQ9sLz4Qkqbr7m7jnNw";

// Modal and Translate
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("clickable-img")) {
    openInModal(`<img class="modal-img" src="${e.target.currentSrc}">`);
  }

  if (e.target.hasAttribute("data-translate")) {
    translate(e.target.getAttribute("data-translate"));
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
        document.querySelector(".pic-of-the-day").src =
          window.screen.availWidth > 850 ? data.hdurl : data.url;
        document.querySelector(".pic-of-the-day-img-title").textContent =
          data.title;
        document.querySelector(".pic-of-the-day-explanation").textContent =
          data.explanation;
        console.log(data);
        break;

      // тут будут остальные..

      // Constructor
      case "APOD_Constructor":
        document.querySelector(".constructor-APOD-result").innerHTML = `
        <img class="constructor-APOD-result-img clickable-img" src="${
          window.screen.availWidth > 850 ? data.hdurl : data.url
        }">
        <div class="constructor-APOD-result-img-title">${data.title}</div>
        <div class="constructor-APOD-result-explanation">${
          data.explanation
        }</div>
        <span
            class="btn1"
            data-translate="constructor-APOD-result-explanation"
            >Translate to Russian</span
          >
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

function translate(transClass) {
  window.open(
    `https://translate.yandex.ru/?source_lang=en&target_lang=ru&text=${
      document.querySelector("." + transClass).textContent
    }`
  );
}
