const APIKEY = '23821952-b78db636c6ddcde4f5e93d8a9';
const baseURL = 'https://pixabay.com/api/';

const fetchGallery = async (galleryImgName, page) => {
    return await fetch(`${baseURL}?q=${galleryImgName}&page=${page}&key=${APIKEY}&image_type=photo&orientation=horizontal&per_page=12`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }
            throw new Error(`Изображения с именем ${galleryImgName} нет`)
        })
};

const api = { fetchGallery }

export default api