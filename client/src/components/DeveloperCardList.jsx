import SummaryCard from "./Card";

export default function DeveloperCardList(props) {
  const developerList = props.featuredDevelopers.map((developer) => (
      <SummaryCard
        key={developer.id}
        id={developer.id}
        imageSource={developer.image}
        title={developer.username}
        description={developer.description}
        type="users"
      />
    )
  );

  return <ul class="d-flex p-2 justify-content-center">{developerList}</ul>;
}
