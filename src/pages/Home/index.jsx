import React, { useEffect, useRef } from "react";
import "./style.css";
import { Link} from "react-router-dom";
import bigImg from '../../assets/images/big-img.png';

export default function Home() {
  const containerRef = useRef(null);
  // Function to scroll to the top
  const scrollToTop = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = 0;
    }
  };
  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth", // optional, for smooth scrolling
    });
  };
  useEffect(() => {
    setTimeout(() => {
      scrollToTop();
      scrollTop();
    }, 500);
  }, []);

  return (
    <div className="section-home" ref={containerRef}>
      <div className="container">
        <div className="section-conetnt">
          {/* <div className="section-top">
            <img src={xLogo} alt="uniswap" />
          </div> */}
          <div className="section-middle">
            <img src={bigImg} alt="uniswap" />
          </div>
          <div className="wrap-content-home">
            <div className="content-text">
              <div className="text-title">Trade crypto and NFTs with confidence</div>
              <p className="text">
              Buy, sell, and explore tokens and NFTs
              </p>
            </div>
            <div className="section-bottom">
              <Link
                to="/wallet"
                className="btn-common btn-secondary"
              >
                Trade Now
              </Link>
              <Link
                to="/wallet"
                className="btn-common btn-primary"
              >
                Connect Wallet
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
