document.querySelectorAll(".carousel-item").forEach((carousel) => {
  const tickerContainer = carousel.querySelector(".news-ticker-container");
  const tickerText = carousel.querySelector(".news-ticker");

  if (tickerContainer && tickerText) {
    carousel.querySelectorAll(".image-container").forEach((container) => {
      container.addEventListener("mouseenter", () => {
        const hoverText = container.getAttribute("data-hover-text");

        // Update the news ticker text
        tickerText.textContent = hoverText;

        // Restart the animation
        tickerText.style.animation = "none"; // Stop animation
        void tickerText.offsetWidth; // Trigger reflow
        tickerText.style.animation = ""; // Restart animation

        // Show the ticker
        tickerContainer.classList.add("active");
      });

      container.addEventListener("mouseleave", () => {
        tickerContainer.classList.remove("active"); // Hide the ticker
      });
    });
  }
});

document.addEventListener("DOMContentLoaded", function () {
  const carousel = document.querySelector("#carouselExampleIndicators");

  // Initialize the carousel with interval set to false
  new bootstrap.Carousel(carousel, {
    interval: false, // Prevents automatic slide changes
  });
});

// Global variable to store the fetched data
const API_URL =
  "https://script.googleusercontent.com/macros/echo?user_content_key=zir6EdBoQZkQ_IjXREvm4xA5roDUHngsSIa-zgww03hsan718oC_Fo_4kUSNopA3oF946lhDSWOZ8G48GEhiJlbcIz8j5Nakm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEXiQzPbb4GpVQ2JbU4QlN-4X-DEMHr60mHfk_YGugOB3MdMqMWqbNVHWGRUAd0BrNXqt-MchPyEkPXan-o2s5Bjx0YwUAgeuw&lib=MxkZbaXQM5-r9wnsZ4loxApTfj4_1MZ2S";
let data = null;
// Fetching data function that loads on page load
async function fetchData() {
  try {
    // Fetch data from the API
    const response = await fetch(API_URL);
    data = await response.json();
    data = data.data;

    data = data.map((entry) => {
      return { ...entry, notes: entry.notes.toLowerCase() };
    });

    // Categories in fixed order
    categories = {
      "physical_1.png": 0,
      "physical_2.png": 0,
      "physical_3.png": 0,
      "physical_4.png": 0,
      "physical_5.png": 0,
      "physical_6.png": 0,
      "physical_7.png": 0,
      "physical_8.png": 0,
      "physical_9.png": 0,
      "physical_10.png": 0,
      "physical_11.png": 0,
      "physical_12.png": 0,
      "social_1.png": 0,
      "social_2.png": 0,
      "social_3.png": 0,
      "social_4.png": 0,
      "social_5.png": 0,
      "social_6.png": 0,
      "social_7.png": 0,
      "social_8.png": 0,
      "social_9.png": 0,
      "social_10.png": 0,
      "social_11.png": 0,
      "social_12.png": 0,
      "spiritual_1.png": 0,
      "spiritual_2.png": 0,
      "spiritual_3.png": 0,
      "spiritual_4.png": 0,
      "spiritual_5.png": 0,
      "spiritual_6.png": 0,
      "spiritual_7.png": 0,
      "spiritual_8.png": 0,
      "spiritual_9.png": 0,
      "spiritual_10.png": 0,
      "spiritual_11.png": 0,
      "spiritual_12.png": 0,
      "social_1.png": 0,
      "social_2.png": 0,
      "social_3.png": 0,
      "social_4.png": 0,
      "social_5.png": 0,
      "social_6.png": 0,
      "social_7.png": 0,
      "social_8.png": 0,
      "social_9.png": 0,
      "social_10.png": 0,
      "social_11.png": 0,
      "social_12.png": 0,
      "emotional_1.png": 0,
      "emotional_2.png": 0,
      "emotional_3.png": 0,
      "emotional_4.png": 0,
      "emotional_5.png": 0,
      "emotional_6.png": 0,
      "emotional_7.png": 0,
      "emotional_8.png": 0,
      "emotional_9.png": 0,
      "emotional_10.png": 0,
      "emotional_11.png": 0,
      "emotional_12.png": 0,
      "creative_1.png": 0,
      "creative_2.png": 0,
      "creative_3.png": 0,
      "creative_4.png": 0,
      "creative_5.png": 0,
      "creative_6.png": 0,
      "creative_7.png": 0,
      "creative_8.png": 0,
      "creative_9.png": 0,
      "creative_10.png": 0,
      "creative_11.png": 0,
      "creative_12.png": 0,
      "travel_1.png": 0,
      "travel_2.png": 0,
      "travel_3.png": 0,
      "travel_4.png": 0,
      "travel_5.png": 0,
      "travel_6.png": 0,
      "travel_7.png": 0,
      "travel_8.png": 0,
      "travel_9.png": 0,
      "travel_10.png": 0,
      "travel_11.png": 0,
      "travel_12.png": 0,
    };

    // Group users by category
    // for (let i = 0; i < data.length; i++) {
    //   all_commits = data[i].notes
    //     .split(",")
    //     .map((part) => part.trim().toLowerCase());
    //
    //   for (let j = 0; j < all_commits.length; j++) {
    //     categories[all_commits[j]] += 1;
    //   }
    // }

    for (const key in categories) {
      if (categories.hasOwnProperty(key)) {
        const value = key;
        const filteredData = data.filter((entry) =>
          entry.notes.includes(value),
        );
        const uniqueData = [];
        const seen = new Set();
        // Filter out duplicates
        filteredData.forEach((entry) => {
          const identifier = `${entry.firstName.toLowerCase()}-${entry.lastName.toLowerCase()}`;
          if (!seen.has(identifier)) {
            seen.add(identifier);
            uniqueData.push(entry);
          }
        });

        categories[value] = uniqueData.length;
      }
    }

    for (const key in categories) {
      if (categories.hasOwnProperty(key)) {
        let val = key;
        val = val.replace(".png", "");
        const letters = val.slice(0, 2).toLowerCase();
        const number = val.split("_")[1];
        const doc_id = letters + number;

        if (categories[key] > 0) {
          document.getElementById(doc_id).innerHTML +=
            `<div class="notification-badge translate-middle badge rounded-pill bg-danger">${categories[key]}</div>`;
        }
      }
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }
}

// Call fetchData as soon as the page loads
window.onload = fetchData;

// Add hover event listeners dynamically
function attachHoverListeners() {
  document.querySelectorAll(".image-container").forEach((imageElement) => {
    imageElement.addEventListener("mouseover", () => {
      getImageId(imageElement); // Update text dynamically on hover
    });
  });
}

let cards_data;
fetch("./data_cards.json")
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((cardsData) => {
    cards_data = cardsData;
    // Example: Accessing the first Physical card
  })
  .catch((error) => console.error("Error fetching the JSON:", error));

// Function to dynamically update hover text
async function getImageId(imageElement) {
  if (!data) {
    await waitForData();
  }

  const formattedSubstring = imageElement.id.replace(/(\d+)/, "_$1") + ".png";
  const filteredData = data.filter((entry) =>
    entry.notes.includes(formattedSubstring),
  );

  const uniqueData = [];
  const seen = new Set();

  // Filter out duplicates
  filteredData.forEach((entry) => {
    const identifier = `${entry.firstName.toLowerCase()}-${entry.lastName.toLowerCase()}`;
    if (!seen.has(identifier)) {
      seen.add(identifier);
      uniqueData.push(entry);
    }
  });
  const regex = /([a-zA-Z]+)(\d{1,2})$/;
  const match = imageElement.id.match(regex);

  category = updateNewsTicker(match[1]);

  document.getElementById(category[0]).innerHTML =
    cards_data[match[1]][match[2]];
  let cat1 = document.getElementById(category[1]);
  cat1.innerHTML = "";
  cat1.innerHTML += `<ul class="list-group list-group-flush">`;
  if (uniqueData.length > 0) {
    for (let i = 0; i < uniqueData.length; i++) {
      const value = uniqueData[i];
      cat1.innerHTML += `<li class="list-group-item">${value.firstName} ${value.lastName}</li>`;
    }
  } else {
    cat1.innerHTML += `<li class="list-group-item">Be the first to commit to...</li>`;
  }

  cat1.innerHTML += `</ul>`;
  // document.getElementById(category[1]).innerHTML = displayNames.slice(0, -2);
}

function updateNewsTicker(category) {
  const tickerContainerIds = {
    physical: ["physicalModalLabel", "physical-body"],
    social: ["socialModalLabel", "social-body"],
    spiritual: ["spiritualModalLabel", "spiritual-body"],
    emotional: ["emotionalModalLabel", "emotional-body"],
    creative: ["creativeModalLabel", "creative-body"],
    travel: ["travelModalLabel", "travel-body"],
  };
  return tickerContainerIds[category];
}

window.onload = async () => {
  await fetchData(); // Fetch data on page load
  attachHoverListeners(); // Attach event listeners after data is fetched
};

// Helper function to wait for data
function waitForData() {
  return new Promise((resolve) => {
    const interval = setInterval(() => {
      if (data) {
        clearInterval(interval);
        resolve(); // Resolve once data is fetched
      }
    }, 100); // Check every 100ms if data is fetched
  });
}
