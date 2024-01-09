import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";

export default function BrowseTags(props) {

  const [showTags, setShowTags] = useState(true);

  useEffect(() => {
    setShowTags(props.searchType !== "organizations");
  }, [props.searchType]);

  return (
    showTags && (
    <div className="text-center mb-5">
      <p class="text-center">Or would you like to browse by category?</p>
      <ButtonToolbar className="justify-content-center">
          <Button variant="primary" className="mx-2 text-white" value="react">
            React
          </Button>
          <Button variant="primary" className="mx-2 text-white" value="ruby">
            Ruby
          </Button>
          <Button variant="primary" className="mx-2 text-white" value="css">
            CSS
          </Button>
          <Button variant="primary" className="mx-2 text-white" value="Express">
            Express
          </Button>
          <Button variant="primary" className="mx-2 text-white" value="Node">
            Node
          </Button>
          <Button variant="primary" className="mx-2 text-white" value="PostgreSQL">
            PostgreSQL
          </Button>
          <Button variant="primary" className="mx-2 text-white" value="Material UI">
            Material UI
          </Button>
          <Button variant="primary" className="mx-2 text-white" value="OAuth">
            OAuth
          </Button>
        </ButtonToolbar>
    </div>
    )
  );
}