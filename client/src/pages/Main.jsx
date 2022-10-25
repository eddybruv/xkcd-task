import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "../styles/Main.module.css";
import logo from "../assets/images/logo.png";

function Main() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const firstRender = useRef(true);

  const [data, setData] = useState({});
  const [lastPage, setLastPage] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  const handleNext = () => {
    if (pathname.split("/")[1] === `${lastPage}` || pathname === "/") {
      navigate("/1");
      return;
    }

    const num = data.num + 1;
    navigate(`/${num}`);
  };

  const handlePrev = () => {
    if (pathname.split("/")[1] === "1") {
      navigate("/");
      return;
    }

    const num = data.num - 1;
    navigate(`/${num}`);
  };

  const handleRandom = () => {
    const num = Math.floor(Math.random() * lastPage);
    navigate(`/${num}`);
  };

  const handleHome = () => {
    navigate("/");
  };

  const handleShowTranscript = () => {
    setShowTranscript(!showTranscript);
  };

  const checkData = () => {
    if (Object.keys(data).length === 0) return false;
    return true;
  };

  useEffect(() => {
    const fetchSpecificComic = async () => {
      await axios
        .get(`/api${pathname}`)
        .then((data) => {
          setData(data.data);
          if (data.data.lastNum) setLastPage(data.data.lastNum);
        })
        .catch((data) => {
          if (data.response.data.message === "page not found") {
            navigate("/");
          }
        });
    };

    // firstRender.current is true by default
    if (!firstRender.current) {
      fetchSpecificComic();
    }
    console.log("here");
    firstRender.current = false;
  }, [pathname, navigate]);

  return (
    <div className={style.body}>
      <div className={style.content}>
        <div className={style.logoDiv}>
          <img className={style.logo} src={logo} alt="" />
        </div>
        <button className={style.button} onClick={handleHome}>
          Home
        </button>
        <div className={style.buttons}>
          <button className={style.button} onClick={handlePrev}>
            Prev
          </button>

          <button className={style.button} onClick={handleRandom}>
            Random
          </button>
          <button className={style.button} onClick={handleNext}>
            Next
          </button>
        </div>
        {checkData() ? (
          <>
            <div className={style.info}>
              <h2 className={style.title}>{data && data.title}</h2>
              <p className={style.date}>
                Date created: {`${data.year}-${data.month}-${data.day}`}
              </p>
              <p className={style.count}>Count: {data.count}</p>
            </div>

            <div className={style.imgDiv}>
              {data && <img className={style.img} src={data.img} alt="" />}
            </div>
            <button
              onClick={handleShowTranscript}
              className={style.TranscriptButton}
            >
              {showTranscript ? "Hide Transcript" : "Show Transcript"}
            </button>
            <div>
              {showTranscript &&
                (data.transcript ? (
                  data.transcript.split("\n").map((text, index) => (
                    <p className={style.transcript} key={index}>
                      {text
                        .replace("[[", "")
                        .replace("]]", "")
                        .replace("{{", "")
                        .replace("}}", "")}
                    </p>
                  ))
                ) : (
                  <p>No transcript Available</p>
                ))}
            </div>
          </>
        ) : (
          <div className={style.loader}></div>
        )}
        <div className={style.buttons}>
          <button className={style.button} onClick={handlePrev}>
            Prev
          </button>

          <button className={style.button} onClick={handleRandom}>
            Random
          </button>
          <button className={style.button} onClick={handleNext}>
            Next
          </button>
        </div>
      </div>
    </div>
  );
}

export default Main;
