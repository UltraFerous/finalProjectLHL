import { useNavigate } from "react-router-dom";
import Card from "react-bootstrap/Card";

export default function SummaryCard(props) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/${props.type}/${props.id}`);
  };

  return (
    <Card
      className="text-center m-4"
      bg="light"
      style={{ maxWidth: "100%" }}
    >
      <Card.Img
        variant="top"
        src={props.imageSource}
        role="button"
        onClick={handleClick}
      />
      <Card.Body>
        <Card.Title
          role="button"
          onClick={handleClick}
        >
          {props.title}
        </Card.Title>
        <Card.Text>{props.description}</Card.Text>
      </Card.Body>
    </Card>
  );
}
