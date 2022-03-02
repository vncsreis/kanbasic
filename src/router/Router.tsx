import { BrowserRouter, Route, Routes } from 'react-router-dom';
import App from '../App';
import ProjectPage from '../pages/ProjectPage';

export default function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route path="/:project" element={<ProjectPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
