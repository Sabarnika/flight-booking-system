import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
const Reviews = () => {
  return (
    <div className="px-4 sm:px-6 lg:px-8 bg-[#FFFFFF] min-h-screen">
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
      className=" testimonals_swiper "
     >
      <SwiperSlide className="flex justify-center pb-16 mx-10 my-3">
        <div className="p-10 shadow-2xl rounded-xl">
            <div className="flex items-center justify-between">
                <div>
                    <p>MekAir</p>
                    <p>Customer</p>
                </div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8wsGH8YbWMRW8PfZ0Rr4VZ0fU8W2XPD1RPpmzGiYYZw&s" className="w-20 h-20 rounded-full" alt="reload"/>
            </div>
            <br/>
            <p>
                Service was good..But cost was little high
            </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex justify-center pb-16  my-3">
        <div className="p-10 shadow-2xl rounded-xl ">
            <div className="flex items-center justify-between">
                <div>
                    <p>John</p>
                    <p>Customer</p>
                </div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8wsGH8YbWMRW8PfZ0Rr4VZ0fU8W2XPD1RPpmzGiYYZw&s" className="w-20 h-20 rounded-full" alt="reload"/>
            </div>
            <br/>
            <p>
                Passengers were not treated properly
            </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex justify-center pb-16  my-3">
        <div className="p-10 shadow-2xl rounded-xl ">
            <div className="flex items-center justify-between">
                <div>
                    <p>MekAir</p>
                    <p>Customer</p>
                </div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8wsGH8YbWMRW8PfZ0Rr4VZ0fU8W2XPD1RPpmzGiYYZw&s" className="w-20 h-20 rounded-full" alt="reload"/>
            </div>
            <br/>
            <p>
            Service was good..Food was not horrable
            </p>
        </div>
      </SwiperSlide>
      <SwiperSlide className="flex justify-center pb-16  my-3">
        <div className="p-10 shadow-2xl rounded-xl ">
            <div className="flex items-center justify-between">
                <div>
                    <p>MekAir</p>
                    <p>Customer</p>
                </div>
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR8wsGH8YbWMRW8PfZ0Rr4VZ0fU8W2XPD1RPpmzGiYYZw&s" className="w-20 h-20 rounded-full" alt="reload"/>
            </div>
            <br/>
            <p>
            Food was something to bear..But overall travel was fine.
          
            </p>
        </div>
      </SwiperSlide>   
    </Swiper>
    </div>
    
  )
}
export default Reviews;