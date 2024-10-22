import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import AuthorImage from "../../images/author_thumbnail.jpg";
import nftImage from "../../images/nftImage.jpg";
import axios from "axios";
import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";

import "../../css/HotCollections.css";

const HotCollections = () => {


  const [loaded, setLoaded] = useState(false);
  const [options, setOptions] = useState({})
  const [sliderRef, instanceRef] = useKeenSlider({
    slides: {
      perView: 4,
    },
    loop: true,
    created() {
      setLoaded(true);
    },
  });

  function Arrow(props) {
    const disabled = props.disabled ? " arrow--disabled" : "";
    return (
      <svg
        onClick={props.onClick}
        className={`arrow ${
          props.left ? "arrow--left" : "arrow--right"
        } ${disabled}`}
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
      >
        {props.left && (
          <path
            fill="#8364E2"
            d="M16.67 0l2.83 2.829-9.339 9.175 9.339 9.167-2.83 2.829-12.17-11.996z"
          />
        )}
        {!props.left && (
          <path
            fill="#8364E2"
            d="M5 3l3.057-3 11.943 12-11.943 12-3.057-3 9-9z"
          />
        )}
      </svg>
    );
  }

  const [carouselData, setCarouselData] = useState([]);
  const [loading, setLoading] = useState(true)
  

  async function fetchHotCollectionsData() {
    const response = await axios.get(
      "https://us-central1-nft-cloud-functions.cloudfunctions.net/hotCollections"
    );
    setCarouselData(response.data);
    setLoading(false)

  }

  useEffect(() => {
    setLoading(true)
    setOptions({
      slides: {
        perView: 4,
      },
      loop: true,
      created() {
        setLoaded(true)
      },
    })
    fetchHotCollectionsData();
    

    return () => {
      setOptions({})
    }
  }, []);

  useEffect(() => {
    instanceRef.current?.update({...options})
  }, [options, instanceRef])

  


  return (
    <section id="section-collections" className="no-bottom">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="text-center">
              <h2>Hot Collections</h2>
              <div className="small-border bg-color-2"></div>
            </div>
          </div>

          <div className="navigation-wrapper">
            <div ref={sliderRef} className="keen-slider">
              {carouselData.length === 0 
                ? new Array(8).fill(0).map((item, index) => (
                    <div
                      className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={index}
                    >
                      
                      <div className="nft_coll skeleton__box">
                        <div className="nft_wrap skeleton ">
                            
                        </div>
                        <div className="nft_coll_pp skeleton__box">
                            <div className="pfp_skeleton"></div>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info skeleton__box">
                            <h4 className="skeleton__title"></h4>
                          <div className="skeleton__sub-title"></div>
                        </div>
                      </div>
                    </div>
                  ))
                : carouselData.map((item, index) => (
                    <div
                      className="keen-slider__slide col-lg-3 col-md-6 col-sm-6 col-xs-12"
                      key={item.id}
                    >
                      
                      <div className="nft_coll">
                        <div className="nft_wrap">
                          <Link to="/item-details">
                            <img
                              src={item.nftImage}
                              className="lazy img-fluid"
                              alt=""
                            />
                          </Link>
                        </div>
                        <div className="nft_coll_pp">
                          <Link to="/author">
                            <img
                              className="lazy pp-coll"
                              src={item.authorImage}
                              alt=""
                            />
                          </Link>
                          <i className="fa fa-check"></i>
                        </div>
                        <div className="nft_coll_info">
                          <Link to="/explore">
                            <h4>{item.title}</h4>
                          </Link>
                          <span>ERC-{item.code}</span>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>

            {loaded && instanceRef.current && (
              <>
                <Arrow
                  left
                  onClick={(e) =>
                    e.stopPropagation()||console.log(carouselData) || instanceRef.current?.prev()
                  }
                />

                <Arrow
                  onClick={(e) =>
                    e.stopPropagation() || instanceRef.current?.next()
                  }
                />
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HotCollections;
