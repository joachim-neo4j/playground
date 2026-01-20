import { Link, useLocation } from 'react-router-dom';
import {
  HomeIconOutline,
  CodeBracketSquareIconOutline,
  ServerStackIconOutline,
  ChartBarIconOutline,
  CircleStackIconOutline,
  Square3Stack3DIconOutline,
  ArrowDownTrayIconOutline,
  QueryIcon,
  ExploreIcon,
  ChartBarSquareIconOutline,
  HeartbeatIcon,
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
    return currentPage === page;
  };

  return (
    <aside className="hidden lg:block border-r bg-white min-h-[calc(100vh-7rem)]" style={{ width: '194px' }}>
      <nav className="px-2 pt-6 pb-2">
        {/* Top Section - No heading */}
        <div className="mb-8">
          <Link to="/" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('get-started') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
            {isActive('get-started') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
            <HomeIconOutline className="h-5 w-5" />
            <span>Get started</span>
          </Link>
          <Link to="/developer-hub" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('developer-hub') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
            {isActive('developer-hub') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
            <CodeBracketSquareIconOutline className="h-5 w-5" />
            <span>Developer hub</span>
          </Link>
        </div>

        {/* Data services Section */}
        <div className="mb-8">
          <h3 className="mb-3 px-3 text-xs font-bold text-gray-900 uppercase tracking-wider">Data services</h3>
          <div className="space-y-1">
            <Link to="/instances" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('instances') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              {isActive('instances') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
              <ServerStackIconOutline className="h-5 w-5" />
              <span>Instances</span>
            </Link>
            <Link to="/graph-analytics" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('graph-analytics') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              {isActive('graph-analytics') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
              <ChartBarIconOutline className="h-5 w-5" />
              <span>Graph Analytics</span>
            </Link>
            <Link to="/data-apis" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('data-apis') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              {isActive('data-apis') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
              <CircleStackIconOutline className="h-5 w-5" />
              <span>Data APIs</span>
            </Link>
            <Link to="/agents" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('agents') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              {isActive('agents') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
              <Square3Stack3DIconOutline className="h-5 w-5" />
              <span>Agents</span>
              <span className="ml-auto rounded-full bg-blue-600 px-2 py-0.5 text-xs text-white font-semibold">Preview</span>
            </Link>
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-8">
          <h3 className="mb-3 px-3 text-xs font-bold text-gray-900 uppercase tracking-wider">Tools</h3>
          <div className="space-y-1">
            <Link to="/import" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('import') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              {isActive('import') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
              <ArrowDownTrayIconOutline className="h-5 w-5" />
              <span>Import</span>
            </Link>
            <Link to="/query" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('query') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              {isActive('query') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
              <QueryIcon className="h-5 w-5" />
              <span>Query</span>
            </Link>
            <Link to="/explore" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('explore') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              {isActive('explore') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
              <ExploreIcon className="h-5 w-5" />
              <span>Explore</span>
            </Link>
            <Link to="/dashboards" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('dashboards') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              {isActive('dashboards') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
              <ChartBarSquareIconOutline className="h-5 w-5" />
              <span>Dashboards</span>
            </Link>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Operations and Project */}
        <div className="mb-4 space-y-1">
          <Link to="/operations" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('operations') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
            {isActive('operations') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
            <HeartbeatIcon className="h-5 w-5" />
            <span>Operations</span>
            <ChevronRightIconOutline className="ml-auto h-4 w-4" />
          </Link>
          <Link to="/project" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('project') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
            {isActive('project') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
            <FolderIconOutline className="h-5 w-5" />
            <span>Project</span>
            <ChevronRightIconOutline className="ml-auto h-4 w-4" />
          </Link>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Learning and Debug */}
        <div className="space-y-1">
          <Link to="/learning" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('learning') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
            {isActive('learning') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
            <AcademicCapIconOutline className="h-5 w-5" />
            <span>Learning</span>
          </Link>
          <Link to="/debug" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('debug') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
            {isActive('debug') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
            <WrenchScrewdriverIconOutline className="h-5 w-5" />
            <span>Debug</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
