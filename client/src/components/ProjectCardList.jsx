import Card from "./Card";

export default function ProjectCardList(props) {
  const projectList = props.featuredProjects.map((project) => {
    return (
      <Card
        key={project.id}
        id={project.id}
        imageSource={project.image}
        title={project.name}
        description={project.description}
        type="projects"
      />
    );
  });

  return <ul>{projectList}</ul>;
}
