import logo from "./logo.svg";
import React from "react";
import "./App.css";
import Title from "./components/Title";
import Form from "./components/Form";
import CatItem from "./components/CatItem";
import Favorites from "./components/Favorites";
import MainCard from "./components/MainCard";

const jsonLocalStorage = {
  setItem: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  getItem: (key) => {
    return JSON.parse(localStorage.getItem(key));
  },
};

const fetchCat = async (text) => {
  const OPEN_API_DOMAIN = "https://cataas.com";
  const response = await fetch(`${OPEN_API_DOMAIN}/cat/says/${text}?json=true`);
  const responseJson = await response.json();
  return `${OPEN_API_DOMAIN}/${responseJson.url}`;
};

// {}대괄호와 return 없이 ()를 써도 바로 리턴한 것과 같은 문법이 된다.

//컴포넌트는 무조건 대문자!

//리액트에서는 class 대신 className을 쓴다

// ES6+ 디스트럭처링 문법 적용 전
// const MainCard = (props) => {
//   <img src={props.img}/>
// }

// ES6+ 디스트럭처링 문법 적용 후
// const MainCard = ({img})=>(
//   <img src={img} />
// )

const App = () => {
  const CAT1 = "https://cataas.com/cat/60b73094e04e18001194a309/says/react";
  const CAT2 = "https://cataas.com//cat/5e9970351b7a400011744233/says/inflearn";
  const CAT3 =
    "https://cataas.com/cat/595f280b557291a9750ebf65/says/JavaScript";

  const [counter, setCounter] = React.useState(() => {
    return jsonLocalStorage.getItem("counter");
  });

  const [mainCat, setMainCat] = React.useState(CAT1);
  console.log("메인캣이미지", mainCat);

  const [favorites, setFavorites] = React.useState(() => {
    return jsonLocalStorage.getItem("favorites") || [];
  });

  const alreadyFavorite = favorites.includes(mainCat);

  async function setInitialCat() {
    const newCat = await fetchCat("First cat");
    console.log(newCat);
    setMainCat(newCat);
  }

  React.useEffect(() => {
    setInitialCat();
  }, []);

  async function updateMainCat(value) {
    const newCat = await fetchCat(value);

    setMainCat(newCat);

    setCounter((prev) => {
      const nextCounter = prev + 1;
      jsonLocalStorage.setItem("counter", nextCounter);
      return nextCounter;
    });
  }

  function handleHeartClick() {
    const nextFavorites = [...favorites, mainCat];
    setFavorites(nextFavorites);
    jsonLocalStorage.setItem("favorites", nextFavorites);
  }

  const counterTitle = counter === null ? "" : counter + "  ";

  return (
    <div>
      <Title>{counterTitle}CAT MEME MAKER</Title>
      <Form updateMainCat={updateMainCat} />
      <MainCard
        img={mainCat}
        onHeartClick={handleHeartClick}
        alreadyFavorite={alreadyFavorite}
      />
      <Favorites favorites={favorites} />
    </div>
    // 최상위 태그가 하나가 되도록 div 태그로 묶어야 오류없이 잘 나온다.
  );
};

export default App;
