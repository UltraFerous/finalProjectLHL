import SummaryCard from "./Card";

export default function ProjectCardList(props) {
  const projectList = props.featuredProjects.map((project) => (
      <SummaryCard
        key={project.id}
        id={project.id}
        imageSource={project.image}
        title={project.name}
        description={project.description}
        type="projects"
      />
    )
  );

  return <ul className="d-flex p-2 justify-content-center">{projectList}</ul>;
}
