import { Link, useLocation } from 'react-router-dom';
import {
  HomeIconOutline,
  CodeBracketSquareIconOutline,
  ServerStackIconOutline,
  ChartBarIconOutline,
  CircleStackIconOutline,
  Square3Stack3DIconOutline,
  ArrowDownTrayIconOutline,
  CommandLineIconOutline,
  MagnifyingGlassIconOutline,
  ChartBarSquareIconOutline,
  Cog6ToothIconOutline,
  FolderIconOutline,
  AcademicCapIconOutline,
  WrenchScrewdriverIconOutline,
  ChevronRightIconOutline
} from '@neo4j-ndl/react/icons';

export default function Sidebar() {
  const location = useLocation();
  const activePage = location.pathname.replace('/', '') || 'get-started';
  
  const isActive = (page) => {
    const pageMap = {
      '': 'get-started',
      '/': 'get-started',
      '/get-started': 'get-started',
      '/developer-hub': 'developer-hub',
      '/instances': 'instances',
      '/graph-analytics': 'graph-analytics',
      '/data-apis': 'data-apis',
      '/agents': 'agents',
      '/import': 'import',
      '/query': 'query',
      '/explore': 'explore',
      '/dashboards': 'dashboards',
      '/operations': 'operations',
      '/project': 'project',
      '/learning': 'learning',
      '/debug': 'debug',
    };
    const currentPage = pageMap[location.pathname] || 'get-started';
    return currentPage === page ? 'bg-neo-blue-light text-neo-blue' : 'text-gray-700 hover:bg-gray-100';
  };

  return (
    <aside className="hidden lg:block w-64 border-r bg-white min-h-[calc(100vh-7rem)]">
      <nav className="px-2 pt-6 pb-2 space-y-1">
        {/* Top Section */}
        <div className="mb-6">
          <Link to="/" className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('get-started')}`}>
            <HomeIconOutline className="h-5 w-5" />
            <span>Get started</span>
          </Link>
          <Link to="/developer-hub" className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('developer-hub')}`}>
            <CodeBracketSquareIconOutline className="h-5 w-5" />
            <span>Developer hub</span>
          </Link>
        </div>

        {/* Data services Section */}
        <div className="mb-6">
          <h3 className="mb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Data services</h3>
          <Link to="/instances" className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('instances')}`}>
            <ServerStackIconOutline className="h-5 w-5" />
            <span>Instances</span>
          </Link>
          <Link to="/graph-analytics" className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('graph-analytics')}`}>
            <ChartBarIconOutline className="h-5 w-5" />
            <span>Graph Analytics</span>
          </Link>
          <Link to="/data-apis" className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('data-apis')}`}>
            <CircleStackIconOutline className="h-5 w-5" />
            <span>Data APIs</span>
          </Link>
          <Link to="/agents" className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('agents')}`}>
            <Square3Stack3DIconOutline className="h-5 w-5" />
            <span>Agents</span>
            <span className="ml-auto rounded-full bg-neo-blue px-2 py-0.5 text-xs text-white">Preview</span>
          </Link>
        </div>

        {/* Tools Section */}
        <div className="mb-6">
          <h3 className="mb-2 px-3 text-xs font-semibold text-gray-500 uppercase tracking-wider">Tools</h3>
          <Link to="/import" className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('import')}`}>
            <ArrowDownTrayIconOutline className="h-5 w-5" />
            <span>Import</span>
          </Link>
          <Link to="/query" className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('query')}`}>
            <CommandLineIconOutline className="h-5 w-5" />
            <span>Query</span>
          </Link>
          <Link to="/explore" className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('explore')}`}>
            <MagnifyingGlassIconOutline className="h-5 w-5" />
            <span>Explore</span>
          </Link>
          <Link to="/dashboards" className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('dashboards')}`}>
            <ChartBarSquareIconOutline className="h-5 w-5" />
            <span>Dashboards</span>
          </Link>
        </div>

        {/* Bottom Section */}
        <div>
          <Link to="/operations" className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('operations')}`}>
            <Cog6ToothIconOutline className="h-5 w-5" />
            <span>Operations</span>
            <ChevronRightIconOutline className="ml-auto h-4 w-4" />
          </Link>
          <Link to="/project" className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('project')}`}>
            <FolderIconOutline className="h-5 w-5" />
            <span>Project</span>
            <ChevronRightIconOutline className="ml-auto h-4 w-4" />
          </Link>
          <Link to="/learning" className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('learning')}`}>
            <AcademicCapIconOutline className="h-5 w-5" />
            <span>Learning</span>
          </Link>
          <Link to="/debug" className={`flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('debug')}`}>
            <WrenchScrewdriverIconOutline className="h-5 w-5" />
            <span>Debug</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
