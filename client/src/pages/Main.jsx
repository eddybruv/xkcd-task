import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "../styles/Main.module.css";
import logo from "../assets/images/logo.png";

function Main() {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState({});
  const [lastPage, setLastPage] = useState(0);
  const [showTranscript, setShowTranscript] = useState(false);

  const handleNext = () => {
    const num = data.num + 1;
    navigate(`/${num}`);
  };

  const handlePrev = () => {
    const num = data.num - 1;
    navigate(`/${num}`);
  };

  const handleRandom = () => {
    const num = Math.floor(Math.random() * lastPage);
    navigate(`/${num}`);
  };

  const handleShowTranscript = () => {
    setShowTranscript(!showTranscript);
  };

  useEffect(() => {
    const fetchSpecificComic = async () => {
      await axios
        .get(`/api${location.pathname}`)
        .then((data) => {
          setData(data.data);
        })
        .catch((data) => {
          if (data.response.data.message === "page not found") {
            navigate("/");
          }
        });

      if (lastPage === 0) {
        const lastPageNum = await axios.get("/api/");
        setLastPage(lastPageNum.data.num);
      }
    };

    fetchSpecificComic();
  }, [location, lastPage, navigate]);

  return (
    <div className={style.body}>
      <div className={style.content}>
        <div className={style.logoDiv}>
          <img className={style.logo} src={logo} alt="" />
        </div>
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
                  {text}
                </p>
              ))
            ) : (
              <p>No transcript Available</p>
            ))}
        </div>

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
