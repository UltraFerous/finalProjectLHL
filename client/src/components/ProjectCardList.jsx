import Card from "./Card";

export default function ProjectCardList(props) {
  const projectList = props.featuredProjects.map((project) => {
    return (
      <Card
        key={project.id}
        imageSource={project.image}
        title={project.name}
        description={project.description}
      />
    );
  });

  return <ul>{projectList}</ul>;
}
