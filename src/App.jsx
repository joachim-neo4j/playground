import { BrowserRouter, Routes, Route } from 'react-router-dom';
import GetStarted from './pages/GetStarted';
import DeveloperHub from './pages/DeveloperHub';
import Instances from './pages/Instances';
import GraphAnalytics from './pages/GraphAnalytics';
import DataAPIs from './pages/DataAPIs';
import Agents from './pages/Agents';
import Import from './pages/Import';
import Query from './pages/Query';
import Explore from './pages/Explore';
import Dashboards from './pages/Dashboards';
import Operations from './pages/Operations';
import Project from './pages/Project';
import Learning from './pages/Learning';
import Debug from './pages/Debug';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GetStarted />} />
        <Route path="/developer-hub" element={<DeveloperHub />} />
        <Route path="/instances" element={<Instances />} />
        <Route path="/graph-analytics" element={<GraphAnalytics />} />
        <Route path="/data-apis" element={<DataAPIs />} />
        <Route path="/agents" element={<Agents />} />
        <Route path="/import" element={<Import />} />
        <Route path="/query" element={<Query />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboards" element={<Dashboards />} />
        <Route path="/operations" element={<Operations />} />
        <Route path="/project" element={<Project />} />
        <Route path="/learning" element={<Learning />} />
        <Route path="/debug" element={<Debug />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
