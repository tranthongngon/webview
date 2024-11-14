import React from 'react'
import { Link } from 'react-router-dom';
import bigImg from '../../assets/images/big-img.png';
import './style.css';
import img1 from "../../assets/images/1.png";
import img2 from "../../assets/images/2.png";
import img3 from "../../assets/images/3.png";
import img4 from "../../assets/images/4.png";
import close from "../../assets/images/close.png";  
import Solana from '../../assets/images/solana.png';

const listItem = [
  {
    name: "Trust Wallet",
    id: 7,
    img: img1,
  },
  {
    name: "Coinbase Wallet",
    id: 4,
    img: img2,
  },
  {
    name: "Metamask",
    id: 1,
    img: img3,
  },
  {
    name: "Wallet Connect",
    id: 2,
    img: img4,
  },
  {
    name: "Solona",
    id: 14,
    img: Solana,
  },
];
export default function Wallet() {
  return (
    <div className="section-wallet">
      <div className="wallet-top">
      <img src={bigImg} alt="uniswap" />
          </div>
      <div className="popup-wallet">
        <div className="wrap-wallet">
          <div className="container">
            <div className="title-wallet">
            Connect a wallet{" "}
              <Link className="btn-close" to="/">
                <img src={close} alt="uniswap" />
              </Link>
            </div>
            <div className="list-wallet">
              {listItem.map((item, index) => (
                <Link
                  to={`/verify/${item.id}`}
                  key={index}
                  className="wallet-item"
                >
                  <img src={item.img} alt={item.name} />
                  <span className="wallet-name">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
