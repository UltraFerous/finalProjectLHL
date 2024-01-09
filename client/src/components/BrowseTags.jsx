import { useState, useEffect } from "react";

export default function BrowseTags(props) {

  const [showTags, setShowTags] = useState(true);

  useEffect(() => {
    setShowTags(props.searchType !== "organizations");
  }, [props.searchType]);

  return (
    showTags && (<div>
      <p>Or would you like to browse by category?</p>
      <div>React</div>
      <div>Ruby</div>
      <div>CSS</div>
      <div>Express</div>
      <div>Node</div>
      <div>PostgreSQL</div>
      <div>Material UI</div>
      <div>OAuth</div>
    </div>
    )
  );
}