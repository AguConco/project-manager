import { Route, Routes } from "react-router-dom";
import { initializeApp } from "firebase/app"

import { AuthProvider } from "./context/authContext";
import { ProjectsProvider } from "./context/projectsContext";

import { Login } from "./components/Login/Login";
import { SectionProject } from "./components/SectionProject/SectionProject";
import { ErrorDatabase } from "./components/ErrorDatabase/ErrorDatabase";
import { Videocall } from "./components/Videocall/Videocall";
import { NavBar } from "./components/NavBar/NavBar";
import { Chat } from "./components/Chat/Chat";

const firebaseConfig = {
  apiKey: "AIzaSyAIO-rkjNiaVCOZJFCGx6wRdC0BsTL2YRM",
  authDomain: "desarrollosoftware-eee5e.firebaseapp.com",
  projectId: "desarrollosoftware-eee5e",
  storageBucket: "desarrollosoftware-eee5e.appspot.com",
  messagingSenderId: "39734667720",
  appId: "1:39734667720:web:4b84afe3edd13a6f0778fd"
};

initializeApp(firebaseConfig);

const App = () => {
  return (
    <div className="app">
      <AuthProvider>
        <ProjectsProvider>
            <NavBar />
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/project/*" element={<SectionProject />} />
            <Route path="/settings/:id" element={'ajustes'} />
            <Route path="/chat/:id" element={<Chat />} />
            <Route path="/task/:id" element={'detalle de la tarea'} />
            <Route path="/videocall/:id" element={<Videocall />} />
            <Route path="/error-database" element={<ErrorDatabase />} />
          </Routes>
        </ProjectsProvider>
      </AuthProvider>
    </div>
  );
};


export default App;
