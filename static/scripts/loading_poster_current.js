
// Example: Fetch data from CSV
const fetchMovieData = async () => {
    const response = await fetch('static/files/2025_candidates.csv');

    const data = await response.text();
    return data;
};

// Example: Parse CSV data
const parseCSV = (csv) => {
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

const populatePosters = (movies) => {
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

document.addEventListener('DOMContentLoaded', async () => {
    const csvData = await fetchMovieData();
    const movies = parseCSV(csvData);
    populatePosters(movies);
});
