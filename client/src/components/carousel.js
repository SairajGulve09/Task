import React, { useState } from 'react';
import { Transition } from '@headlessui/react';

const images = [
  'https://via.placeholder.com/600x300?text=Image+1',
  'https://via.placeholder.com/600x300?text=Image+2',
  'https://via.placeholder.com/600x300?text=Image+3',
];

const Carousel = () => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = () => {
    setCurrentImage((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const prevImage = () => {
    setCurrentImage((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className="relative">
      <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2"
        onClick={prevImage}
      >
        Prev
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-gray-800 text-white rounded-full p-2"
        onClick={nextImage}
      >
        Next
      </button>
      <Transition
        show={true}
        enter="transition-opacity duration-500"
        enterFrom="opacity-0"
        enterTo="opacity-100"
        leave="transition-opacity duration-500"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <img
          className="block mx-auto"
          src={images[currentImage]}
          alt={`Slide ${currentImage + 1}`}
        />
      </Transition>
    </div>
  );
};

export default Carousel;
