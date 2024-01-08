export default function Card(props) {
  return (
    <div>
      <img src={props.imageSource} />
      <h3>{props.title}</h3>
      <p>{props.description}</p>
    </div>
  );
}