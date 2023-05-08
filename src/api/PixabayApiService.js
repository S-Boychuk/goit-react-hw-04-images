import axios from 'axios';

const API_KEY = '33884715-0dc68d810fba427cd8d5ff839';
const BASE_URL = 'https://pixabay.com/api/';
const PER_PAGE = 12;

async function getImages(searchQuery, page) {
  try {
    const response = await axios.get(
      `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=${PER_PAGE}`
    );
    console.log('Pixabay response >>> ', response.data);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}

export { PER_PAGE, getImages };
