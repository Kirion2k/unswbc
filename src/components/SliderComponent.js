import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const images = [
  { src: "/unsw-1.jpg", label: "First Slide", description: "Nulla vitae elit libero, a pharetra augue mollis interdum." },
  { src: "/unsw-2.jpg", label: "Second Slide", description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit." },
  { src: "/unsw-3.jpg", label: "Third Slide", description: "Praesent commodo cursus magna, vel scelerisque nisl consectetur." },
];

const SliderComponent = () => {
  return (
    <Carousel>
      {images.map((img, index) => (
        <Carousel.Item key={index} interval={index === 0 ? 1000 : 500}>
          <img
            className="d-block w-100"
            src={img.src}
            alt={`${img.label} label`}
            style={{ height: '750px', objectFit: 'cover' }}
          />
          <Carousel.Caption>
            <h3>{img.label}</h3>
            <p>{img.description}</p>
          </Carousel.Caption>
        </Carousel.Item>
      ))}
    </Carousel>
  );
};

export default SliderComponent;
