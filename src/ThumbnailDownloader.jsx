import React, { useState } from 'react';
import axios from 'axios';
import './App.css'; // Import the CSS file for styling

const ThumbnailDownloader = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [videoLink, setVideoLink] = useState('');

  const generateThumbnail = async () => {
    try {
      // Extract the video ID from the YouTube link
      const videoId = extractVideoId(videoLink);

      // Fetch video details using YouTube Data API
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=AIzaSyAcad2kbFfA3b9eCLy_EZDdnKpGHi4o1Kw`
      );

      // Check if the response contains items
      if (response.data.items && response.data.items.length > 0) {
        // Retrieve the thumbnail URL from the API response
        const thumbnail = response.data.items[0].snippet.thumbnails.default.url;
        setThumbnailUrl(thumbnail);
      } else {
        console.log('Invalid API response');
      }
    } catch (error) {
      console.log('Error fetching video details', error);
    }
  };

  const extractVideoId = (videoLink) => {
    // ... Same as before ...
  };

  const downloadThumbnail = () => {
    const link = document.createElement('a');
    link.href = thumbnailUrl;
    link.download = 'thumbnail.jpg';
    link.click();
  };

  return (
    <div className="thumbnail-container">
      <h2>YouTube Thumbnail Downloader</h2>
      <input
        type="text"
        className="video-link-input"
        placeholder="Enter YouTube video link"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
      />
      <button className="generate-btn" onClick={generateThumbnail}>
        Generate Thumbnail
      </button>
      {thumbnailUrl && (
        <div className="thumbnail-wrapper">
          <img src={thumbnailUrl} alt="Video Thumbnail" className="thumbnail-img" />
          <button className="download-btn" onClick={downloadThumbnail}>
            Download
          </button>
        </div>
      )}
    </div>
  );
};

export default ThumbnailDownloader;
