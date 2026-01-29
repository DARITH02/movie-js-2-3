const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmNzhjNDQwZGMyNjJkMmZlMTBhMjE4OGQwZDZiMWM5OCIsIm5iZiI6MTc1NzE3NDY5My45OTMsInN1YiI6IjY4YmM1YmE1ZmNjNTI2MGVlMDliZmY4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BuL7KJ2syviF-Vd8u0bysFBK971KVqQW3aHXL5BPiCU",
  },
};

let data = [];

const getMovies = async (page, loader = true) => {
  if (loader) {
    document.querySelector(".loading").classList.remove("hidden");
  }
  const respone = await fetch(
    `https://api.themoviedb.org/3/discover/tv?include_adult=false&include_null_first_air_dates=false&language=en-US&page=${page}&sort_by=popularity.desc`,
    options
  );

  data = await respone.json();

  document.querySelector(".loading").classList.add("hidden");

  // const movies = data.results;

  document.getElementById("grid-movies").innerHTML = data.results
    .map((e) => {
      return `
        <div onclick="detail(${e["id"]})"
            class="card-hover bg-gray-900 rounded-xl overflow-hidden border border-opacity-10 border-white hover:border-red-500 hover:border-opacity-30 transition cursor-pointer"
          >
            <div class="relative overflow-hidden bg-gray-800 h-64">
              <div
                class="w-full h-full bg-gradient-to-br from-gray-700 to-gray-900 flex items-center justify-center"
              >

               <img src="https://image.tmdb.org/t/p/w500/${e["poster_path"]}" />

              </div>
              <div class="absolute top-3 right-3">
                <span class="badge px-3 py-1 rounded-full text-xs font-semibold"
                  >4K</span
                >
              </div>
            </div>
            <div class="p-4">
              <h4 class="font-bold text-lg mb-2 line-clamp-1">${e["original_name"]}</h4>
              <div class="flex items-center gap-2 mb-3">
                <span class="rating-star">★</span>
                <span class="text-sm text-gray-400">8.8/10</span>
              </div>
              <p class="text-sm text-gray-400 line-clamp-2 mb-4">
             ${e["overview"]}
              </p>
              <div class="flex gap-2">
                <button
                  class="flex-1 btn-primary text-white px-3 py-2 rounded-lg text-sm font-medium"
                >
                  Watch
                </button>
                <button
                  class="flex-1 border border-gray-700 text-gray-300 px-3 py-2 rounded-lg text-sm font-medium hover:border-gray-500 transition"
                >
                  Save
                </button>
              </div>
            </div>
          </div>

    
    `;
    })
    .join("");
};
getMovies(1, true);

let i = 1;

document.getElementById("page").textContent = `Page ${i > 1 ? "s" : ""}${i}`; //pages

document.getElementById("load-more").addEventListener("click", function () {
  i += 1;
  getMovies(i, true);

  document.getElementById("page").textContent = `Page${i > 1 ? "s" : ""} ${i}`; //pages

  // document
  //   .getElementById("top-page")
  //   .scrollIntoView({ behavior: "smooth", block: "start" });

  document.getElementById("scroll-top").scrollIntoView({ behavior: "smooth" });
});

document.getElementById("search").addEventListener("input", function (e) {
  console.log(e.target.value);
});

function detail(id) {
  let detail = data.results.find((e) => e.id == id);

  localStorage.setItem("detail", JSON.stringify(detail));

  window.location = "./detail.html";
}
