import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
const Reviews = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8  bg-[#FFFFFF]">
        <h1 className='text-3xl  font-bold text-center text-black mt-10 pt-10'>What Our Customers Had<br/> Said</h1>
        <p className=" text-center pt-3"> We Are World Wide Corporate Brand</p>
        <br/>
        <br/>
        <br/>
        <Swiper 
      modules={[ Pagination]}
      spaceBetween={15}
      slidesPerView={3} 
      breakpoints={{
        640: { slidesPerView: 1 }, 
        768: { slidesPerView: 2 }, 
        1024: { slidesPerView: 3 }, 
      }}
      pagination={{ clickable: true }}
      autoplay={{delay:2000}}
      loop={true}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log('slide change')}
      className="pb-16 mx-56 testimonals_swiper"
    >
      <SwiperSlide className="flex justify-center">
        <div className=" shadow-xl p-10 rounded-xl">
            <div className="flex items-center justify-between">
                <div>
                    <p>MekAir</p>
                    <p>Customer</p>
                </div>
            <img src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706227200&semt=sph" className="w-20 h-20 rounded-full" alt="reload"/>
            </div>
            <br/>
            <p>
                "On the windows taling painted pasture yey its express parties use. Sure last upon he same as knew next
            </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex justify-center">
        <div className=" shadow-xl p-10 rounded-xl">
            <div className="flex items-center justify-between">
                <div>
                    <p>MekAir</p>
                    <p>Customer</p>
                </div>
            <img src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706227200&semt=sph" className="w-20 h-20 rounded-full" alt="reload"/>
            </div>
            <br/>
            <p>
                "On the windows taling painted pasture yey its express parties use. Sure last upon he same as knew next
            </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex justify-center">
        <div className=" shadow-xl p-10 rounded-xl">
            <div className="flex items-center justify-between">
                <div>
                    <p>MekAir</p>
                    <p>Customer</p>
                </div>
            <img src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706227200&semt=sph" className="w-20 h-20 rounded-full" alt="reload"/>
            </div>
            <br/>
            <p>
                "On the windows taling painted pasture yey its express parties use. Sure last upon he same as knew next
            </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex justify-center">
        <div className=" shadow-xl p-10 rounded-xl">
            <div className="flex items-center justify-between">
                <div>
                    <p>John</p>
                    <p>Customer</p>
                </div>
            <img src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706227200&semt=sph" className="w-20 h-20 rounded-full" alt="reload"/>
            </div>
            <br/>
            <p>
                "On the windows taling painted pasture yey its express parties use. Sure last upon he same as knew next
            </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex justify-center">
        <div className="p-10 shadow-xl rounded-xl">
            <div className="flex items-center justify-between">
                <div>
                    <p>MekAir</p>
                    <p>Customer</p>
                </div>
            <img src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706227200&semt=sph" className="w-20 h-20 rounded-full" alt="reload"/>
            </div>
            <br/>
            <p>
                "On the windows taling painted pasture yey its express parties use. Sure last upon he same as knew next
            </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex justify-center">
        <div className=" shadow-xl p-10 rounded-xl">
            <div className="flex items-center justify-between">
                <div>
                    <p>MekAir</p>
                    <p>Customer</p>
                </div>
            <img src="https://img.freepik.com/free-photo/young-bearded-man-with-striped-shirt_273609-5677.jpg?size=626&ext=jpg&ga=GA1.1.1448711260.1706227200&semt=sph" className="w-20 h-20 rounded-full" alt="reload"/>
            </div>
            <br/>
            <p>
                "On the windows taling painted pasture yey its express parties use. Sure last upon he same as knew next
            </p>
        </div>
      </SwiperSlide>   
    </Swiper>
    </div>
    
  )
}
export default Reviews;