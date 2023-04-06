import {useEffect, useState} from 'react';
import {useInterval} from './Hooks/useInterval';

export function Slider({imageList, type, showDescriptions}) {
  const [focusedSlide, setFocusedSlide] = useState(0);
  const prevSlide = () =>
    focusedSlide !== 0 ? focusedSlide - 1 : imageList.length - 1;
  const nextSlide = () =>
    focusedSlide !== imageList.length - 1 ? focusedSlide + 1 : 0;

  function handleChangeSlide(e) {
    if (`slide${prevSlide()}` === e.target.id) {
      setFocusedSlide(prevSlide);
    } else {
      setFocusedSlide(nextSlide);
    }
  }

  useEffect(() => {
    const slides = Array.from(document.getElementsByClassName(`${type}-slide`));

    slides.map((slide, i) => {
      slide.classList.remove(
        `${type}-focused-slide`,
        `${type}-previous-slide`,
        `${type}-next-slide`,
        `${type}-non-visible-slide`,
      );
      if (i === focusedSlide) {
        slide.classList.add(`${type}-focused-slide`);
      } else if (i === prevSlide()) {
        slide.classList.add(`${type}-previous-slide`);
      } else if (i === nextSlide()) {
        slide.classList.add(`${type}-next-slide`);
      } else {
        slide.classList.add(`${type}-non-visible-slide`);
      }
    });
  });

  useInterval(() => {
    setFocusedSlide(nextSlide());
  }, 10000);

  return (
    <div className={`flex flex-col w-full`}>
      <div className={` ${type}-slider`}>
        {imageList.map((image, i) => (
          <img
            src={image.url}
            id={`slide${i}`}
            onClick={handleChangeSlide}
            className={`${type}-slide`}
            key={i}
          />
        ))}
      </div>
      {showDescriptions &&
        <h3 className={`text-center text-2xl pt-6 from-neutral-200`}>{imageList[focusedSlide].description}</h3> 
      }
    </div>
  );
}
