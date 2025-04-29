const API_KEY = 'AIzaSyCeZf-vPCrjNbcG3B8TM5Og9XK9GP5_hRE'; // Replace with your YouTube API key
const CHANNEL_ID = 'UC85bOhsvKnn0PUzHtSAqFyg'; // Replace with your YouTube channel ID

// Function to fetch the list of videos from the YouTube channel
async function fetchVideosFromChannel() {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=50&type=video&key=${API_KEY}`;
    
    try {
        const response = await fetch(url);
        const data = await response.json();
        displayThumbnails(data.items);
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
}

// Function to display the thumbnails of the videos
function displayThumbnails(videos) {
    const container = document.getElementById('thumbnails-container');
    container.innerHTML = ''; // Clear previous content

    videos.forEach((video) => {
        const thumbnailUrl = video.snippet.thumbnails.high.url;
        const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;

        const imgElement = document.createElement('img');
        imgElement.src = thumbnailUrl;
        imgElement.alt = video.snippet.title;
        imgElement.classList.add('thumbnail');
        imgElement.addEventListener('click', () => window.open(videoUrl, '_blank'));

        container.appendChild(imgElement);
    });
}

// Call the function to fetch and display the videos when the page loads
fetchVideosFromChannel();
