import { FC, useEffect, useRef, useState } from 'react';

interface Image {
  src: string;
  altText: string;
}

interface CarouselProps {
  images: Array<Image>;
}

interface LazyImageProps {
  src: string;
  alt: string;
  isLoaded: boolean;
}


const handleEnds = (curr: number, min: number, max: number) => {
  if (curr < min) {
    return max;
  } else if (curr > max) {
    return min;
  }
  
  return curr;
}

const LazyImage: FC<LazyImageProps> = ({ src, alt, isLoaded }) => {
  return <img  className="image" src={src} alt={alt} width="500" height="500" loading={isLoaded ? 'eager' : 'lazy'} hidden={!isLoaded}/>
}


const Carousel: FC<CarouselProps> = ({ images }) => {
  const [currentImg, setCurrentImg] = useState(0);
  const [loadedImages, setLoadedImages] = useState(images.reduce<Array<boolean>>((acc, _, idx) => {
    acc[idx] = idx == 0 ? true : false;
    return acc;
  }, []))
  const containerRef = useRef<HTMLDivElement>(null);

  const goToPrevPhoto = () => {
    setCurrentImg((curr) => {
      const updated = handleEnds(curr - 1, 0, images.length - 1);
      return updated;
    })
  }

  const goToNextPhoto = () => {
    setCurrentImg((curr) => {
      const updated = handleEnds(curr + 1, 0, images.length - 1);
      return updated;
    })
  }

  const goToSpecificPhoto = (idx: number) => {
    setCurrentImg(idx);
  }

  const loadImage = (idx: number) => {
    loadedImages[idx] = true;
    setLoadedImages([...loadedImages]);
  }

  useEffect(() => {
      containerRef.current?.scrollTo({
        left: currentImg * 500,
        behavior: 'smooth'
      })
  }, [currentImg]);

  return <>
    <div className="image-container" ref={containerRef}>
      {images.map((image, idx) => <LazyImage src={image.src} alt={image.altText} isLoaded={loadedImages[idx]} key={`image_${idx}`}/>)}
    </div>
    <div>
      <button onClick={goToPrevPhoto} onMouseEnter={() => loadImage(currentImg - 1)}>{'<'}</button>
      {images.map((_, idx) => <button onClick={() => goToSpecificPhoto(idx)} key={`button_${idx}`} onMouseEnter={() => loadImage(idx)}>{idx + 1}</button>)}
      <button onClick={goToNextPhoto} onMouseEnter={() => loadImage(currentImg + 1)}>{'>'}</button>
    </div>
  </>
}

export default Carousel;
