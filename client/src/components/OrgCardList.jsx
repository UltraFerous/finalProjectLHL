import SummaryCard from "./Card";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function OrgCardList(props) {
  const orgList = props.orgs.map((org) => (
    <Col>
      <SummaryCard
        key={org.id}
        id={org.id}
        imageSource={org.image}
        title={org.name}
        description={org.description}
        type="org"
      />
    </Col>
  ));

  return <Row md={3} className="gx-0">{orgList}</Row>;
}