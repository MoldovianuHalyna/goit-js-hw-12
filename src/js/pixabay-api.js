// function that gets data from server
import axios from 'axios';

axios.defaults.baseURL = 'https://pixabay.com/api/';

export const getPhotoFromServer = async function (dataName, currentPage) {
  const { data } = await axios.get('', {
    params: {
      key: '49322620-5f00be843ea1be6db390f9d83',
      q: dataName,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: true,
      per_page: 15,
      page: currentPage,
    },
  });
  return data;
};
