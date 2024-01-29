import trashCan from "../images/Trash-Can.png"
import likeImg from "../images/like.png"

function Card({name, link, likes, _id, onCardClick}){
  function handleClick (){
    onCardClick({name, link});
  }

  return(
    <div className="card">
  <div className="gallery__card">
    <img className="gallery__card_trash-can-icon" id="trash-can-img" alt="Tachito de Basura" src={trashCan}/>
    <img className="gallery__card_photo" src= {link} onClick={handleClick}/>
    <div className="gallery__card_bar">
      <h3 className="gallery__card_bar-title">{name}</h3>
      <div>
        <img className="gallery__card_bar-like" alt="Corazon Like" src= {likeImg}/>
        <p className="gallery__card_bar-like-count">{likes? likes.length : ''}</p>
      </div>
    </div>
  </div>
</div>
  );
}

export default Card