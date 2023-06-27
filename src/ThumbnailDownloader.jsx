import React, { useState } from 'react';
import axios from 'axios';
import "./App.css"
const ThumbnailDownloader = () => {
  const [thumbnailUrl, setThumbnailUrl] = useState('');
  const [videoLink, setVideoLink] = useState('');

  const generateThumbnail = async () => {
    try {
      // Extract the video ID from the YouTube link
      const videoId = extractVideoId(videoLink);

      // Fetch video details using YouTube Data API
      const response = await axios.get(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet&id=${videoId}&key=enter your api`
      );

      // Retrieve the thumbnail URL from the API response
      const thumbnail = response.data.items[0].snippet.thumbnails.default.url;
      setThumbnailUrl(thumbnail);
    } catch (error) {
      console.log('Error fetching video details', error);
    }
  };

  const extractVideoId = (videoLink) => {
    const regex = /(?:[?v=]|\/embed\/|\/\d\/|\/v\/|https:\/\/youtu.be\/|\/embed\/|\/e\/|\/watch\?v=|&v=|youtu.be\/|\/v\/|\/e\/|\/y\/|\/youtube.com\/v\/|\/embed\/|\/v=|\/e=|\/youtube.com\/embed\/|\/y\/|\/g\/|\/watch\?v%3D|&amp;v=|\/embed\/|\/e\/|\/watch\?feature=player_embedded&amp;v=|\/embed\/|\/watch\?v=|&amp;v=|youtu.be\/|\/v\/|\/e\/|\/youtube.com\/v\/|\/embed\/|\/v=|\/e=|\/youtube.com\/embed\/|\/y\/|\/g\/|\/watch\?v%3D|&amp;v=|youtube.com\/watch\?v=)([^#\&\?\/<>"' ]{11})/gi;
    const match = regex.exec(videoLink);

    if (match && match[1]) {
      return match[1];
    } else {
      console.log('Invalid YouTube URL');
      return '';
    }
  };
  const downloadThumbnail = () => {
    const link = document.createElement('a');
    link.href = thumbnailUrl;
    link.download = 'thumbnail.jpg';
    link.click();
  };


  return (
    <div className='thumbnail-container'>
      <input
        type="text"
        placeholder="Enter YouTube video link"
        value={videoLink}
        onChange={(e) => setVideoLink(e.target.value)}
        className='video-link-input'
      />
      <button onClick={generateThumbnail } 
      className='generate-btn'>Generate Thumbnail</button>
      {thumbnailUrl && <img src={thumbnailUrl} alt="Video Thumbnail" />}
      {thumbnailUrl && (
        <div>
          {/* <img src={thumbnailUrl} alt="Video Thumbnail" style={{ width: '250px', height: 'auto' }} /> */}
          <button onClick={downloadThumbnail}>Download</button>
        </div>
      )}
    </div>
  );
};

export default ThumbnailDownloader;