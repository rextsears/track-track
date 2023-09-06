const axios = require('axios');
require('dotenv').config();

const YOUTUBE_API_KEY = process.env.YOUTUBE_API_KEY;

async function getYoutubeVideoInfo(videoId) {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/videos?id=${videoId}&key=${YOUTUBE_API_KEY}&part=snippet`
    );
    return response.data.items[0].snippet;
  } catch (error) {
    throw new Error('Error fetching YouTube video information');
  }
}

module.exports = { getYoutubeVideoInfo };
