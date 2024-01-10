import SummaryCard from "./Card";

export default function OrgCardList(props) {
  const orgList = props.orgs.map((org) => (
      <SummaryCard
        key={org.id}
        id={org.id}
        imageSource={org.image}
        title={org.name}
        description={org.description}
        type="org"
      />
    )
  );

  return <ul className="d-flex p-2 justify-content-center">{orgList}</ul>;
}