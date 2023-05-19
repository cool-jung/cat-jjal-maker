import CatItem from "./CatItem";
import "./index.css";

function Favorites({ favorites }) {
  if (favorites.length === 0) {
    return (
      <div>
        {" "}
        Press the heart above the picture and save the picture of the cat!
      </div>
    );
  }
  return (
    <ul className="favorites">
      {favorites.map((cat) => (
        <CatItem img={cat} key={cat} />
      ))}
    </ul>
  );
}

export default Favorites;
