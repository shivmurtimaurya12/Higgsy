import { BrowserRouter, Route, Routes } from 'react-router';
import Appbar from "./components/Appbar";
import "./index.css";
import Landing from './pages/Landing';
import Signin from './pages/Signin';
import Signup from './pages/Signup';
import Dashboard from './pages/Dashboard';
import VideoCreator from './pages/VideoCreator';
export function App() {
  return (
    <div>

      <BrowserRouter>
        <Appbar />

        <Routes>

          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/video-creator" element={<VideoCreator />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
