import { fetchJSON } from "./api.js";
const endpoint = 'https://api.thedogapi.com/';
const allBreeds = await fetchJSON(`${endpoint}v1/breeds`);
const select = document.getElementById("breed-select");
const breedContainer = document.querySelector(".breed-container");
const breedName = document.getElementById("breed-name");
const breedImg = document.getElementById("breed-img");
const breedText = document.getElementById("breed-text");
const loadGalleryButton = document.getElementById("load-gallery-btn");
const hideGalleryButton = document.getElementById("hide-gallery-btn");

loadGalleryButton.addEventListener("click", loadGallery);
hideGalleryButton.addEventListener("click", hideGallery);

allBreeds.forEach(element => {
  const option = document.createElement("option");
  option.value = element.id;
  option.text = element.name;
  select.add(option);
});

select.addEventListener('change', function () {
  const breedID = select.value;
  updateBreedInfo(breedID);
});

async function getBreedData(breedId) {
  try {
    const breedData = await fetchJSON(`${endpoint}v1/breeds/${breedId}`);
    return {
      name: breedData.name,
      heightInCm: breedData.height.metric,
      life_span: breedData.life_span,
      origin: breedData.origin,
      weightInKg: breedData.weight.metric
    }
  } catch (error) {
    console.log(error);
  }
}

async function getBreedImages(breedID) {
  try {
    const breedImages = await fetchJSON(`${endpoint}v1/images/search?limit=10&breed_ids=${breedID}`);
    return breedImages[0].url;
  } catch (error) {
    console.log(error);
  }
}

async function updateBreedInfo(breedId) {
  try {
    const breedData = await getBreedData(breedId);
    const breedImage = await getBreedImages(breedId);
    const pawIcon = `<img src='./images/paw-icon.svg' alt='icon of a dog paw'></img>`;

    breedName.innerHTML = `<h2>${breedData.name}</h2>`;
    breedImg.innerHTML = `<img src="${breedImage}" alt="picture of a ${breedData.name} dog">`;
    breedText.innerHTML = `
      <div class="breed-height">
        ${pawIcon}
        <p>Height: ${breedData.heightInCm} cm</p>
      </div>
      <div class="breed-life-span">
        ${pawIcon}
        <p>Life expectancy: ${breedData.life_span}</p>
      </div>
      <div class="breed-origin">
        ${pawIcon}
        <p>Origin: ${breedData.origin ?? 'Unknown'}</p>
      </div>
      <div class="breed-weight">
        ${pawIcon}
        <p>Weight: ${breedData.weightInKg} kg</p>
      </div>`;
    breedContainer.classList.remove("hidden");
  } catch (error) {
    console.log(error);
  }
}

async function loadGallery() {
  try {
    const galleryImages = await fetchJSON(`${endpoint}v1/images/search?limit=5`);
    galleryImages.forEach(element => {
      const img = document.createElement("img");
      img.src = element.url;
      img.alt = 'picture of a dog';
      document.querySelector(".gallery").appendChild(img);
    });
    document.querySelector(".gallery").style.display = "grid";
    hideGalleryButton.attributes.removeNamedItem("hidden");
  } catch (error) {
    console.log(error);
  }
}

function hideGallery() {
  hideGalleryButton.toggleAttribute("hidden");
  document.querySelector(".gallery").style.display = "none";
}

updateBreedInfo(1);
