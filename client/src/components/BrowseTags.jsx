import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import ButtonToolbar from "react-bootstrap/ButtonToolbar";
import { Link } from "react-router-dom";

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
          <Link to={`${props.searchType}/search/react`}>
            <Button variant="primary" className="mx-2 text-white" value="react">
              React
            </Button>
          </Link>
          <Link to={`${props.searchType}/search/ruby`}>
            <Button variant="primary" className="mx-2 text-white" value="ruby">
              Ruby
            </Button>
          </Link>
          <Link to={`${props.searchType}/search/css`}>
            <Button variant="primary" className="mx-2 text-white" value="css">
              CSS
            </Button>
          </Link>
          <Link to={`${props.searchType}/search/express`}>
            <Button variant="primary" className="mx-2 text-white" value="express">
              Express
            </Button>
          </Link>
          <Link to={`${props.searchType}/search/node`}>
            <Button variant="primary" className="mx-2 text-white" value="node">
              Node
            </Button>
          </Link>
          <Link to={`${props.searchType}/search/postgresql`}>
            <Button variant="primary" className="mx-2 text-white" value="postgresql">
              PostgreSQL
            </Button>
          </Link>
          <Link to={`${props.searchType}/search/materialui`}>
            <Button variant="primary" className="mx-2 text-white" value="materialui">
              Material UI
            </Button>
          </Link>
          <Link to={`${props.searchType}/search/oauth`}>
            <Button variant="primary" className="mx-2 text-white" value="oauth">
              OAuth
            </Button>
          </Link>
        </ButtonToolbar>
      </div>
    )
  );
}