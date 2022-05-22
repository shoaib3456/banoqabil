import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';



// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import VideoCard from './videoCard';
import video1 from '../assets/video-1.jpg'
import video2 from '../assets/video-2.jpg'
import video3 from '../assets/video-3.jpg'
import video4 from '../assets/video-4.jpg'
import video5 from '../assets/video-5.jpg'

const VideoSlider = () => {
    return (
        <>
            <Swiper
                // install Swiper modules
                slidesPerView={4}
                spaceBetween={30}
                slidesPerGroup={1}
                loop={true}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
                loopFillGroupWithBlank={true}
                pagination={{
                    clickable: true,
                }}
                navigation={false}
                modules={[Pagination, Navigation, Autoplay]}
                className="mySwiper"
            >
                <SwiperSlide>
                    <VideoCard videoCode={video(1)} bgImg={video1} />
                </SwiperSlide>
                <SwiperSlide>
                    <VideoCard videoCode={video(2)} bgImg={video2} />
                </SwiperSlide>
                <SwiperSlide>
                    <VideoCard videoCode={video(3)} bgImg={video3} />
                </SwiperSlide>
                <SwiperSlide>
                    <VideoCard videoCode={video(4)} bgImg={video4} />
                </SwiperSlide>
                <SwiperSlide>
                    <VideoCard videoCode={video(5)} bgImg={video5} />
                </SwiperSlide>
            </Swiper>
        </>
    );
};

const video = (videoNo) => {

    switch (videoNo) {
        case 1:
            return (
                <iframe width="560" height="315" src="https://www.youtube.com/embed/rIy7oYRddco" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            );
        case 2:
            return (
                <iframe width="560" height="315" src="https://www.youtube.com/embed/AowNfS7M8rY" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            );
        case 3:
            return (
                <iframe width="560" height="315" src="https://www.youtube.com/embed/WHRt8MwtwDk" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            );
        case 4:
            return (
                <iframe width="560" height="315" src="https://www.youtube.com/embed/PkvblVpDNAQ" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            );
        case 5:
            return (
                <iframe width="560" height="315" src="https://www.youtube.com/embed/O70n43TziKE" title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe>
            );
        default:
            return "No Video Found";

    }
}

export default VideoSlider;