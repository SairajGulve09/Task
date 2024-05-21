import React, { useState, useEffect } from "react";

const images = [
  "https://www.tailwindtap.com/assets/components/all-inclusive-carousel/desk-office.jpg",
  "https://www.tailwindtap.com/assets/components/all-inclusive-carousel/architecture-office.jpg",
  "https://www.tailwindtap.com/assets/components/all-inclusive-carousel/office-working-people.jpg",
];

const text = ["lorem ipsum", "lorem ipsum dollar", "lorem ipsum dollar amet"];

export default function Carousel2() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const decreaseIndex = () => {
    if (currentIndex <= 0) {
      setCurrentIndex(images.length - 1);
    } else {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const increaseIndex = () => {
    if (currentIndex === images.length - 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(currentIndex + 1);
    }
  };

  useEffect(() => {
    const timer = setInterval(() => {
      increaseIndex();
    }, 7000); // Change image every 3 seconds

    return () => {
      clearInterval(timer);
    };
  }, [currentIndex]);

  return (
    <div className="sticky top-10 min-h-screen w-full flex justify-center items-top pt-10">
      <div className="w-[800px] relative">
      

        <div>
          {images.map((img, index) => {
            if (currentIndex === index) {
              return (
                <img
                  key={index}
                  src={img}
                  alt="Multiple images for slide and show"
                  className="object-cover w-full"
                />
              );
            } else {
              return null;
            }
          })}
        </div>

        

        {/* Text Portion */}
        <div className="relative bottom-20 inset-x-0 bg-cyan-900 opacity-75 py-2 w-full text-center">
          {text[currentIndex]}
        </div>

        {/* Custom Dot Portion */}
        <div className="relative bottom-16 inset-x-0 flex flex-row gap-2 justify-center">
          {images.map((a, index) =>
            currentIndex === index ? (
              <div
                key={index}
                className="w-2 h-2 bg-gray-400 rounded-full cursor-pointer"
              ></div>
            ) : (
              <div
                key={index}
                className="w-2 h-2 bg-gray-600 rounded-full cursor-pointer"
                onClick={() => setCurrentIndex(index)}
              ></div>
            )
          )}
        </div>
      </div>
    </div>
  );
}

const Arrow = ({ arrowStyle }) => {
  return (
    <svg
      width="16"
      height="26"
      viewBox="0 0 16 26"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`z-50 ${arrowStyle}`}
    >
      <path
        d="M13.8462 2L2 13L13.8462 24"
        stroke="#6b7280"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

