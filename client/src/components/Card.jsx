import { useNavigate } from "react-router-dom";

export default function Card(props) {

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${props.type}/${props.id}`);
  }

  return (
    <div onClick={handleClick}>
      <img src={props.imageSource} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
}