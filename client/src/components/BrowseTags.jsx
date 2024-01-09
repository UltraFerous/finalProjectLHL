import { useState, useEffect } from "react";

export default function BrowseTags(props) {

  const [showTags, setShowTags] = useState(true);

  useEffect(() => {
    setShowTags(props.searchType !== "organizations");
  }, [props.searchType]);

  return (
    showTags && (<div>
      <p>Or would you like to browse by category?</p>
      <button value="react">React</button>
      <button value="ruby">Ruby</button>
      <button value="css">CSS</button>
      <button value="Express">Express</button>
      <button value="Node">Node</button>
      <button value="PostgreSQL">PostgreSQL</button>
      <button value="Material UI">Material UI</button>
      <button value="OAuth">OAuth</button>
    </div>
    )
  );
}