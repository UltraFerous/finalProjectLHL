import Card from "./Card";

export default function DeveloperCardList(props) {
  const developerList = props.featuredDevelopers.map((developer) => {
    return (
      <Card
        key={developer.id}
        imageSource={developer.image}
        title={developer.username}
        description={developer.description}
      />
    );
  });

  return <ul>{developerList}</ul>;
}
