import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import Imageslider from "./Imageslider";

const Main = () => {

  let [record, setrecord] = useState([]);
  useEffect(() => {
    fetch(process.env.REACT_APP_API_PATH + "/api/banner")
      .then(res => res.json())
      .then(value => {
        console.log(value);
        setrecord(value.data)
      })
  }, [])

  return (
    <section>
      <header>
        <div className='container-fluid'>
          <div className='row align-items-center'>
            <div className='col-lg-6 col-6 text-left'>
              <img src='images/hexar-logo1.png' />
            </div>
            <div className='col-lg-6 col-6 text-end'>
              <a href='#' className='contactbtn'>Contact Us</a>
            </div>
          </div>
        </div>
      </header>
      <Swiper
        modules={[Navigation, Autoplay]}
        navigation
        loop={true}
        autoplay={{
          delay: 4000,
          disableOnInteraction: false,
        }}
      >
        {
          record && record.map(value =>
            <SwiperSlide>
              <Imageslider p1={value}></Imageslider>
            </SwiperSlide>
          )
        }



      </Swiper>
      <hr />
    </section>
  );
};

export default Main;

