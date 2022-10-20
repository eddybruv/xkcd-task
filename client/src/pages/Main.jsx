import React, { useEffect } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import style from "../styles/Main.module.css";
import logo from "../assets/images/logo.png";

function Main() {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const [lastPage, setLastPage] = useState(0);

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

  useEffect(() => {
    const fetchSpecificComic = async () => {
      const res = await axios.get(`/api${location.pathname}`);
      setData(res.data);
      console.log(res.data);
      if (lastPage === 0) {
        const lastPageNum = await axios.get("/api/");
        setLastPage(lastPageNum.data.num);
      }
    };

    fetchSpecificComic();
  }, [location, lastPage]);

  return (
    <div className={style.body}>
      <img src={logo} alt="" />
      <div>
        <h2 className={style.title}>{data && data.title}</h2>
        <p>Date created: {`${data.year}-${data.month}-${data.day}`}</p>
      </div>

      <div className={style.imgDiv}>
        {data && <img className={style.img} src={data.img} alt="" />}
      </div>
      {data && <p className={style.transcript}>{data.transcript}</p>}
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
  );
}

export default Main;
