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

// Global variable to store the fetched data
let fetchedData = null;
const API_URL =
  "https://script.googleusercontent.com/macros/echo?user_content_key=zir6EdBoQZkQ_IjXREvm4xA5roDUHngsSIa-zgww03hsan718oC_Fo_4kUSNopA3oF946lhDSWOZ8G48GEhiJlbcIz8j5Nakm5_BxDlH2jW0nuo2oDemN9CCS2h10ox_1xSncGQajx_ryfhECjZEnEXiQzPbb4GpVQ2JbU4QlN-4X-DEMHr60mHfk_YGugOB3MdMqMWqbNVHWGRUAd0BrNXqt-MchPyEkPXan-o2s5Bjx0YwUAgeuw&lib=MxkZbaXQM5-r9wnsZ4loxApTfj4_1MZ2S";

// Fetching data function that loads on page load
async function fetchData() {
  try {
    // Fetch data from the API
    const response = await fetch(API_URL);
    let data = await response.json();
    data = data.data;

    // Categories in fixed order
    const categories = [
      "Physical",
      "Social",
      "Spiritual",
      "Emotional",
      "Creative",
      "Travel",
    ];

    // Group users by category
    fetchedData = categories.reduce((acc, category) => {
      acc[category] = data.filter((user) => user.category === category);
      return acc;
    }, {});

    for (var i = 0; i < categories.length; i++) {
      let cat = categories[i].toLowerCase();
      let a = cat.slice(0, 2);

      for (let j = 1; j <= 12; j++) {
        cat += j.toString();

        let notification = getnum_notification(cat);
        notification.toString();
        a += j.toString();
        if (notification > 0) {
          if (notification > 5) {
            notification = "5+";
          }
          document.getElementById(a).innerHTML +=
            `<div class="notification-badge translate-middle badge rounded-pill bg-danger">${notification}</div>`;
        }
        a = cat.slice(0, 2);

        cat = categories[i].toLowerCase();
      }
    }

    // let notification = getnum_notification("physical1");
    //
    // document.getElementById("ph1").innerHTML +=
    //   `<div class="notification-badge translate-middle badge rounded-pill bg-danger">${notification}</div>`;
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

function getnum_notification(imageElement) {
  const regex = /([a-zA-Z]+)(\d{1,2})$/;
  const match = imageElement.match(regex);

  if (match) {
    let cat = match[1];
    const commitment = match[2];
    cat = cat.charAt(0).toUpperCase() + cat.slice(1);

    const target = `${cat.charAt(0).toLowerCase() + cat.slice(1)}_${commitment}.png`;

    let names =
      fetchedData[cat]
        ?.filter((entry) => entry.notes.includes(target))
        .map((entry) => `${entry.firstName} ${entry.lastName}`) || [];
    names = [...new Set(names)];

    return names.length;
  }
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
  if (!fetchedData) {
    await waitForData(); // Wait for data if not yet fetched
  }

  const regex = /([a-zA-Z]+)(\d{1,2})$/;
  const match = imageElement.id.match(regex);

  if (match) {
    let cat = match[1];
    const commitment = match[2];
    cat = cat.charAt(0).toUpperCase() + cat.slice(1);

    const target = `${cat.charAt(0).toLowerCase() + cat.slice(1)}_${commitment}.png`;

    let names =
      fetchedData[cat]
        ?.filter((entry) => entry.notes.includes(target))
        .map((entry) => `${entry.firstName} ${entry.lastName}`) || [];

    names = [...new Set(names)];

    let modal_type = updateNewsTicker(cat);

    console.log(modal_type);
    document.getElementById(modal_type[1]).innerHTML =
      cards_data[cat][commitment];
    if (names.length > 0) {
      const displayNames =
        names.length > 5
          ? `${names.slice(-5).join(", ")}...`
          : names.join(", ");
      document.getElementById(modal_type[0]).innerHTML =
        `${displayNames} commit to`;
    } else {
      document.getElementById(modal_type[0]).innerHTML =
        "Be the first to commit to";
    }
  }
}

function updateNewsTicker(category) {
  const tickerContainerIds = {
    Physical: ["physicalModalLabel", "physical-body"],
    Social: ["socialModalLabel", "social-body"],
    Spiritual: ["spiritualModalLabel", "spiritual-body"],
    Emotional: ["emotionalModalLabel", "emotional-body"],
    Creative: ["creativeModalLabel", "creative-body"],
    Travel: ["travelModalLabel", "travel-body"],
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
      if (fetchedData) {
        clearInterval(interval);
        resolve(); // Resolve once data is fetched
      }
    }, 100); // Check every 100ms if data is fetched
  });
}
