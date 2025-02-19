const MainCard = ({ img, onHeartClick, alreadyFavorite }) => {
  const heartIcon = alreadyFavorite ? "💖" : "🤍";
  return (
    <div className="main-card">
      <img src={img} alt="고양이" width="400" className="rounded" />
      <button onClick={onHeartClick}>{heartIcon}</button>
    </div>
  );
};

export default MainCard;
