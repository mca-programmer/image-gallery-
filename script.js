const accessKey = "bVu9PKroXXyZ6qse3Nsseh9bXvnTLOMG5XKacFSYWhk"; // Replace this

const form = document.getElementById("search-form");
const input = document.getElementById("search-input");
const gallery = document.getElementById("gallery");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = input.value.trim();

  if (!query) return;

  gallery.innerHTML = `<p class="col-span-full text-center text-gray-400">Loading...</p>`;

  const url = `https://api.unsplash.com/search/photos?page=1&per_page=20&query=${query}&client_id=${accessKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    gallery.innerHTML = "";

    if (data.results.length === 0) {
      gallery.innerHTML = `<p class="col-span-full text-center text-red-400">No images found.</p>`;
      return;
    }

    data.results.forEach(photo => {
      const div = document.createElement("div");
      div.className = "overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300";
      div.innerHTML = `
        <img src="${photo.urls.small}" alt="${photo.alt_description}" 
             class="w-full h-60 object-cover transform hover:scale-105 transition duration-300">
      `;
      gallery.appendChild(div);
    });
  } catch (err) {
    console.error(err);
    gallery.innerHTML = `<p class="col-span-full text-center text-red-400">Failed to fetch images.</p>`;
  }
});
