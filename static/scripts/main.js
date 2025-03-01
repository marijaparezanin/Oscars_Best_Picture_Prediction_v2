var selectedPosters = [];


document.addEventListener('DOMContentLoaded', function () {
    const popup = document.getElementById("winner_popup");

    // Set the initial display property when the page loads
    popup.classList.add('hidden');
    

    // Add a mousedown event listener to the document
    document.addEventListener('mousedown', function (event) {
        
        popup.style.display = "none";
        popup.style.opacity = "1"; 
    
    });
});


function handlePosterClick(poster, movieName) {
    if (!poster.classList.contains('selected') && selectedPosters.length < 3) {
        poster.classList.add('selected');
        selectedPosters.push({ poster, movieName });
    } else if (poster.classList.contains('selected')) {
        poster.classList.remove('selected');
        selectedPosters = selectedPosters.filter(p => p.poster !== poster);
    }
}
async function calculateResults() {
    console.log(selectedPosters);

    if (selectedPosters.length === 3) {
        try {
            const selected_movies = selectedPosters.map(({ movieName }) => movieName);

            const response = await fetch('https://oscars-best-picture-prediction-v2.onrender.com/predict', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ selected_movies }),
            });

            if (response.ok) {
                const result = await response.json();
                // Handle the result as needed
                console.log(result);

                // Toggle the visibility of the winner popup
                document.querySelector('.winner_popup').style.display = 'flex';
                document.querySelector('.winner_popup').style.opacity = '1';

                const imageElement = document.getElementById("winner_poster_image")
                imageElement.src = "../static/posters/" + result.winner + ".jpg";


                // Display the winner in the popup
                document.querySelector('.winner-text').innerText = result.winner;
            } else {
                console.error('Server response not okay:', response.status, response.statusText);
                const text = await response.text();
                console.log('Response text:', text);
            }
        } catch (error) {
            console.error('Error while fetching data:', error);
        }
    } else {
        console.log('Please select exactly 3 posters.');
    }
}



function getResults(){
    return selectedPosters;
}