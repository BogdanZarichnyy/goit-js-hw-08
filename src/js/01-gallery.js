import SimpleLightbox from "simplelightbox";
import "simplelightbox/dist/simple-lightbox.min.css";

// Add imports above this line
import { galleryItems } from './gallery-items';
// Change code below this line

console.log(galleryItems);

const galleryList = document.querySelector('.gallery');

function buildGallery(galleryItems) {
    let galleryData = '';

    galleryItems.forEach(galleryItem => {
        const { preview, original, description } = galleryItem;

        galleryData += `
            <a class="gallery__item" href="${original}">
                <img
                    class="gallery__image"
                    src="${preview}"
                    alt="${description}"
                />
            </a>
        `;
    });

    // console.log(galleryData);
    galleryList.insertAdjacentHTML('afterbegin', galleryData);

    const modal = new SimpleLightbox('.gallery a', {
        captionsData: 'alt',
        captionDelay: 250,
        captionClass: 'gallery__item-image',
    });
    console.dir(modal);
}

buildGallery(galleryItems);