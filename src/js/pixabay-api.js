import iziToast from 'izitoast';

const fetchApiData = queryValue => {
  const searchParams = new URLSearchParams({
    key: '47670925-140aa95f52ef27acd2496305c',
    q: queryValue.trim(),
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
  });

  return fetch(`https://pixabay.com/api/?${searchParams.toString()}`)
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status);
      }
      return response.json();
    })
    .then(data => {
      if (!data.total) {
        iziToast.error({
          message:
            'Sorry, there are no images matching your search query. Please try again!',
          position: 'topRight',
        });
        return [];
      }

      return data.hits;
    })
    .catch(error => {
      console.log(error);
      return [];
    });
};

export default fetchApiData;
