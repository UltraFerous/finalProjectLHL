import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import Home from "./pages/Home";
import ProjectList from "./pages/ProjectList";
import Project from "./pages/Project";
import CreateProject from "./pages/CreateProject";
import NotFound from "./pages/NotFound";
import EditProject from "./pages/EditProject";
import ProjectApplication from "./pages/ProjectApplication";
import DeveloperList from "./pages/DeveloperList";
import LogInUser from "./pages/LogInUser";
import UserProfile from "./pages/UserProfile";
import RegisterUser from "./pages/RegisterUser";
import OrgProfile from "./pages/OrgProfile";
import CreateOrg from "./pages/CreateOrg";
import OrgList from "./pages/OrgList";
import { UserProvider } from './context/UserContext';
import "./styles/App.css"

function App() {
  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects">
          <Route index element={<ProjectList />} />
          <Route path="search/:searchTerm" element={<ProjectList />} />
          <Route path="create" element={<CreateProject />} />
          <Route path=":id/apply" element={<ProjectApplication />} />
          <Route path=":id" element={<Project />} />
          <Route path=":id/edit" element={<EditProject />} />
        </Route>
        <Route path="/users">
          <Route index element={<NotFound />} />
          <Route path="login" element={<LogInUser />} />
          <Route path=":id" element={<UserProfile />} />
          <Route path="register" element={<RegisterUser />} />
        </Route>
        <Route path="/developers">
          <Route index element={<DeveloperList />} />
          <Route path="search/:searchTerm" element={<DeveloperList />} />
        </Route>
        <Route path="/org">
          <Route index element={<OrgList />} />
          <Route path="create" element={<CreateOrg />} />
          <Route path="search/:searchTerm" element={<OrgList />} />
          <Route path=":id" element={<OrgProfile />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </>
  );
}

export default App;

