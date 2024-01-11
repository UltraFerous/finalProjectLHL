import SummaryCard from "./Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function DeveloperCardList(props) {
  const developerList = props.featuredDevelopers.map((developer) => (
    <Col>
      <SummaryCard
        key={developer.id}
        id={developer.id}
        imageSource={developer.image}
        title={developer.username}
        description={developer.description}
        type="users"
      />
    </Col>
  )
  );

  return <Row md={3} className="gx-0">{developerList}</Row>;
}
