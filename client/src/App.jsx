//App.js
//import axios from 'axios';
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
import { UserProvider } from './context/UserContext';
import "./styles/App.css"

//data will be the string we send from our server
//const apiCall = () => {
//  axios.get('http://localhost:8080').then((data) => {
//this console.log will be in our frontend console
//    console.log(data)
//  })
//}

function App() {
  return (
    <UserProvider>
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/projects">
          <Route index element={<ProjectList />} />
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
        <Route path="/developers" element={<DeveloperList />} />
        <Route path="/org/:id" element={<OrgProfile />} />
        <Route path="/org/create" element={<CreateOrg />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </UserProvider>
  );
}

export default App;

// import { useState } from 'react'
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

// function App() {
//   const [count, setCount] = useState(0)

//   return (
//     <>
//       <div>
//         <a href="https://vitejs.dev" target="_blank">
//           <img src={viteLogo} className="logo" alt="Vite logo" />
//         </a>
//         <a href="https://react.dev" target="_blank">
//           <img src={reactLogo} className="logo react" alt="React logo" />
//         </a>
//       </div>
//       <h1>Vite + React</h1>
//       <div className="card">
//         <button onClick={() => setCount((count) => count + 1)}>
//           count is {count}
//         </button>
//         <p>
//           Edit <code>src/App.jsx</code> and save to test HMR
//         </p>
//       </div>
//       <p className="read-the-docs">
//         Click on the Vite and React logos to learn more
//       </p>
//     </>
//   )
// }

// export default App
