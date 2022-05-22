import { Navigation, Pagination, Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import PartnerCard from './partnerCard';


// Import Partner Images
import partnerImg1 from '../assets/client-1.png';
import partnerImg2 from '../assets/client-2.png';
import partnerImg3 from '../assets/client-3.png';
import partnerImg4 from '../assets/client-4.png';
import partnerImg5 from '../assets/client-5.png';
import partnerImg6 from '../assets/client-6.png';
import partnerImg7 from '../assets/client-7.png';
import partnerImg8 from '../assets/client-8.png';

const PartnerSlider = () => {
    return (
        <>
            <Swiper
                // install Swiper modules
                slidesPerView={5}
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
                    <PartnerCard partnerImg={partnerImg1} />
                </SwiperSlide>
                <SwiperSlide>
                    <PartnerCard partnerImg={partnerImg2} />
                </SwiperSlide>
                <SwiperSlide>
                    <PartnerCard partnerImg={partnerImg3} />
                </SwiperSlide>
                <SwiperSlide>
                    <PartnerCard partnerImg={partnerImg4} />
                </SwiperSlide>
                <SwiperSlide>
                    <PartnerCard partnerImg={partnerImg5} />
                </SwiperSlide>
                <SwiperSlide>
                    <PartnerCard partnerImg={partnerImg6} />
                </SwiperSlide>
                <SwiperSlide>
                    <PartnerCard partnerImg={partnerImg7} />
                </SwiperSlide>
                <SwiperSlide>
                    <PartnerCard partnerImg={partnerImg8} />
                </SwiperSlide>
            </Swiper>
        </>
    );
};

export default PartnerSlider;