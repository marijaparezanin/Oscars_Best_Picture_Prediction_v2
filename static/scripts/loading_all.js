
// Example: Fetch data from CSV
const fetchMovieData2 = async () => {
    const response = await fetch('static/files/oscardata.csv');

    const data = await response.text();
    return data;
};

// Example: Parse CSV data
const parseCSV2 = (csv) => {
    const rows = csv.split('\n');
    const movies = [];
    for (let i = 1; i < rows.length; i++) {
        const values = rows[i].split(',');
        if(values[0] == ""){
            break;
        }

        const movie = {};
        var name = values[0].trim()
        var year = values[3].trim()
        movie["Title"] = name;
        movie["Image"] = "./static/posters/"+name+".jpg"
        movie["Alt"] = name + " ("  + year + ")";
    
        movies.push(movie);
    }
    return movies;
};

// Example: Populate posters
const populatePosters2 = (movies) => {
    const postersContainer = document.getElementById('postersContainer');

    movies.forEach((movie) => {
        const posterContainer = document.createElement('div');
        posterContainer.classList.add('poster-container');
        posterContainer.onclick = () => handlePosterClick(posterContainer, movie.Title);

        const label = document.createElement('label');

        const img = document.createElement('img');
        img.classList.add('poster_img');
        img.src = movie.Image;
        img.alt = movie.Alt;

        const h3 = document.createElement('h3');
        h3.classList.add('poster_txt');
        h3.innerText = movie.Alt;

        label.appendChild(img);
        label.appendChild(h3);
        posterContainer.appendChild(label);

        postersContainer.appendChild(posterContainer);
    });
};


let postersLoaded = false;
// Example: Load posters when the page is ready
document.addEventListener('DOMContentLoaded', async () => {
    const loadPostersText = document.getElementById('text_link');
    loadPostersText.addEventListener('click', async () => {
        if (postersLoaded) return;
        postersLoaded = true; 
        console.log("All posters loaded:", postersLoaded)

        const csvData = await fetchMovieData2();
        const movies = parseCSV2(csvData);
        populatePosters2(movies);

        loadPostersText.classList.add("disabled");
        document.querySelectorAll('.btn_show_more').forEach(element => {
            element.style.display = 'none';
        });
        adjustPostersPosition();
        
    });
});

const adjustPostersPosition = () => {
    const allposters = document.getElementById("postersContainer");
    allposters.style.transform = "none"; // Remove transform, since centering is already fixed

    const mainElement = document.querySelector("body");
    mainElement.style.paddingBottom = "auto"; // Prevents unnecessary large space
};
