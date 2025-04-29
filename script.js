const API_KEY = 'AIzaSyCeZf-vPCrjNbcG3B8TM5Og9XK9GP5_hRE'; // Replace with your YouTube API key
const CHANNEL_ID = 'UC85bOhsvKnn0PUzHtSAqFyg'; // Replace with your YouTube channel ID

async function fetchVideosFromChannel() {
    const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&maxResults=25&type=video&key=${API_KEY}`;

    try {
        const response = await fetch(url);
        const data = await response.json();
        displayThumbnails(data.items);
    } catch (error) {
        console.error('Error fetching videos:', error);
    }
}

function displayThumbnails(videos) {
    const container = document.getElementById('thumbnails-container');
    container.innerHTML = '';

    // Duplicate the videos to make seamless loop
    const allVideos = [...videos, ...videos];

    allVideos.forEach((video) => {
        const thumbnailUrl = video.snippet.thumbnails.high.url;
        const videoUrl = `https://www.youtube.com/watch?v=${video.id.videoId}`;

        const img = document.createElement('img');
        img.src = thumbnailUrl;
        img.alt = video.snippet.title;
        img.className = 'thumbnail';
        img.addEventListener('click', () => {
            window.open(videoUrl, '_blank');
        });

        container.appendChild(img);
    });
}

fetchVideosFromChannel();
