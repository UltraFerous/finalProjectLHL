import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function SummaryCard(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${props.type}/${props.id}`);
  };

  return (
    <Card onClick={handleClick} style={{ width: "30rem" }} className="text-center m-4" bg="light">
      <Card.Img variant="top" src={props.imageSource} />
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
