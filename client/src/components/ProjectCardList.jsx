import SummaryCard from './Card';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function ProjectCardList(props) {
  const projectList = props.featuredProjects.map((project) => (
    <Col>
      <SummaryCard
        id={project.id}
        imageSource={project.image}
        title={project.name}
        description={project.description}
        type="projects"
      />
    </Col>
  ));

  return <Row md={3} className="gx-0">{projectList}</Row>;
}
