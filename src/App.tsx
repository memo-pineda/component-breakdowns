import { useState } from 'react'
import './App.css'
import Form from './components/FormValidation/form'
import ImageCarousel from './components/ImageCarousel/Carousel';

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <h3>Form Validation</h3>
      <Form />
      <ImageCarousel images={[
        {
          src: "https://images.freeimages.com/images/large-previews/3cb/the-treasure-1203251.jpg",
          altText: "Alt Text 1"
        },
        {
          src: "https://images.freeimages.com/images/large-previews/56d/peacock-1169961.jpg",
          altText: "Alt Text 1"
        },
        {
          src: "https://images.freeimages.com/images/large-previews/83f/paris-1213603.jpg",
          altText: "Alt Text 1"
        }
      ]}/>
    </>
  )
}

export default App
