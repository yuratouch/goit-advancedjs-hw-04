import axios from 'axios';

const CONFIG = {
  baseURL: 'https://pixabay.com',
  imagesPerPage: 15,
};
axios.defaults.baseURL = CONFIG.baseURL;

async function fetchApiData(queryValue, page = 1) {
  const params = {
    key: '47670925-140aa95f52ef27acd2496305c',
    q: queryValue.trim(),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: CONFIG.imagesPerPage,
    page,
  };

  try {
    const response = await axios.get(`/api`, { params });
    const { hits, totalHits } = response?.data || {};

    return hits ? { images: hits, isNext: 15 * page < totalHits } : {};
  } catch (error) {
    console.error(
      'Pixabay API fetch error: ',
      error instanceof Error ? error.message : error
    );

    return [];
  }
}

export default fetchApiData;
