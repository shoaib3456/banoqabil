import { Carousel } from 'react-bootstrap'
import React, { useState } from 'react'
import slide1 from '../assets/Cholistan-Water-Crisis-Main-SLider.jpg'
// import slide2 from '../assets/slide-2.jpg'
// import slide3 from '../assets/slide-3.jpg'

function Slider() {
    const [index, setIndex] = useState(0);

    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };

    return (
        <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide1}
                    alt="First slide"
                />
               
            </Carousel.Item>
            {/* <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide2}
                    alt="Second slide"
                />

             
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className="d-block w-100"
                    src={slide3}
                    alt="Third slide"
                />

             
            </Carousel.Item> */}
        </Carousel>
    );
}

export default Slider