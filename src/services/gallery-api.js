function fetchGallery(galleryImgName) {
    return fetch(`https://pixabay.com/api/?key=23821952-b78db636c6ddcde4f5e93d8a9&q=${galleryImgName}&image_type=photo`)
        .then(res => {
            if (res.ok) {
                return res.json();
            }

            return Promise.reject(
                new Error(`Изображения с именем ${galleryImgName} нет`))
        })
}

const api = {
    fetchGallery,
}

export default api