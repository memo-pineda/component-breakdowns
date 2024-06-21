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

interface Image {
  id: string;
  alt_description: string;
  urls: {
    small: string;
    regular: string;
    thumb: string;
  }
}

/** Todos
 * - [ ] component recycling
 * - [ ] list virtualization
 * - [x] Move prev/next buttons closer to images
 * - [x] Fetch images from api
 * - [/] Ellipse the numbered buttons
 * - [ ] Pressed states for buttons
 */

const url = `https://api.unsplash.com/photos/?client_id=yo4ApkueaPGe67S-rM5AkGF--_NWFgVkF-wkeHRaW5A`


const handleEnds = (curr: number, min: number, max: number) => {
  if (curr < min) {
    return max;
  } else if (curr > max) {
    return min;
  }
  
  return curr;
}

const LazyImage: FC<LazyImageProps> = ({ src, alt, isLoaded }) => {
  return <img  className={`image`} src={src} alt={alt} loading={isLoaded ? 'eager' : 'lazy'} hidden={!isLoaded}/>
}

const useFetchImages = (url: string) => {
  const [images, setImages] = useState<Array<Image>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setError] = useState(false);

  useEffect(() => {
    async function fetchImages(url: string) {
      setIsLoading(true);
      try {
        const resp = await fetch(url);
        const images = await resp.json();
        console.log("images", images);
        setIsLoading(false);
        setImages([...images]);
        return images;
      } catch (e) {
        setError(true);
      }
    }

    fetchImages(url);

    () => {
      
    }
  }, [url])
  
  return {
    isLoading,
    hasError,
    images
  }
}


const Carousel: FC<CarouselProps> = () => {
  const { images, isLoading, hasError } = useFetchImages(url);
  const [currentImg, setCurrentImg] = useState(0);
  const [loadedImages, setLoadedImages] = useState(images.reduce<Array<boolean>>((acc, _, idx) => {
    acc[idx] = idx == 0 ? true : false;
    return acc;
  }, []))
  const containerRef = useRef<HTMLDivElement>(null);

  const goToSpecificPhoto = (idx: number) => {
    setCurrentImg(handleEnds(idx, 0, images.length - 1));
  }

  const loadImage = (idx: number) => {
    loadedImages[handleEnds(idx, 0, images.length - 1)] = true;
    setLoadedImages([...loadedImages]);
  }

  useEffect(() => {
      containerRef.current?.scrollTo({
        left: currentImg * 400,
        behavior: 'smooth'
      })
  }, [currentImg]);

  if (hasError) {
    return <div>Error Loading Carousel</div>
  }

  if (isLoading) {
    return <div>Images loading</div>
  }

  return <div className="container">
    <div className="image-container" ref={containerRef}>
      {images.map((image, idx) => <LazyImage src={image.urls.small} alt={image.alt_description} isLoaded={idx === 0 ? true : loadedImages[idx]} key={image.id}/>)}
    </div>
    <div className="buttons">
      <button onClick={() => goToSpecificPhoto(currentImg - 1)} onMouseEnter={() => loadImage(currentImg - 1)}>{'<'}</button>
      <button onClick={() => goToSpecificPhoto(currentImg + 1)} onMouseEnter={() => loadImage(currentImg + 1)}>{'>'}</button>
    </div>
  </div>
}

export default Carousel;
