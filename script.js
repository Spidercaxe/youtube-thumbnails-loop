const API_KEY = 'AIzaSyCeZf-vPCrjNbcG3B8TM5Og9XK9GP5_hRE'; // Replace with your YouTube API key
const CHANNEL_ID = 'UC85bOhsvKnn0PUzHtSAqFyg'; // Replace with your YouTube channel ID

// Get the modal elements
const modal = document.getElementById('lightbox');
const closeModal = document.getElementById('close-modal');
const modalTitle = document.getElementById('modal-title');
const modalThumbnail = document.getElementById('modal-thumbnail');
const modalLink = document.getElementById('modal-link');

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

        // Make the thumbnail clickable to open the lightbox
        imgElement.addEventListener('click', () => {
            openLightbox(video.snippet.title, thumbnailUrl, videoUrl);
        });

        container.appendChild(imgElement);
    });
}

// Function to open the lightbox with video details
function openLightbox(title, thumbnailUrl, videoUrl) {
    modal.style.display = 'flex';
    modalTitle.textContent = title;
    modalThumbnail.src = thumbnailUrl;
    modalLink.href = videoUrl;
}

// Close the lightbox when the user clicks the close button
closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fetch and display the videos when the page loads
fetchVideosFromChannel();
