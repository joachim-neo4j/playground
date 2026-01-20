import { Link, useLocation } from 'react-router-dom';

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
    <aside className="hidden lg:block w-64 border-r bg-white min-h-[calc(100vh-7rem)]">
      <nav className="px-2 pt-6 pb-2">
        {/* Top Section - No heading */}
        <div className="mb-8">
          <Link to="/" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('get-started') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
            {isActive('get-started') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
            </svg>
            <span>Get started</span>
          </Link>
          <Link to="/developer-hub" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('developer-hub') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
            {isActive('developer-hub') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"></path>
            </svg>
            <span>Developer hub</span>
          </Link>
        </div>

        {/* Data services Section */}
        <div className="mb-8">
          <h3 className="mb-3 px-3 text-xs font-bold text-gray-900 uppercase tracking-wider">Data services</h3>
          <div className="space-y-1">
            <Link to="/instances" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('instances') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              {isActive('instances') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01"></path>
              </svg>
              <span>Instances</span>
            </Link>
            <Link to="/graph-analytics" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('graph-analytics') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              {isActive('graph-analytics') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
              <span>Graph Analytics</span>
            </Link>
            <Link to="/data-apis" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('data-apis') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              {isActive('data-apis') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
              </svg>
              <span>Data APIs</span>
            </Link>
            <Link to="/agents" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('agents') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              {isActive('agents') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
              </svg>
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
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <span>Import</span>
            </Link>
            <Link to="/query" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('query') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              {isActive('query') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
              </svg>
              <span>Query</span>
            </Link>
            <Link to="/explore" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('explore') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              {isActive('explore') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
              </svg>
              <span>Explore</span>
            </Link>
            <Link to="/dashboards" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('dashboards') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
              {isActive('dashboards') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
              </svg>
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
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <span>Operations</span>
            <svg className="ml-auto h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
          <Link to="/project" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('project') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
            {isActive('project') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <span>Project</span>
            <svg className="ml-auto h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Learning and Debug */}
        <div className="space-y-1">
          <Link to="/learning" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('learning') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
            {isActive('learning') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span>Learning</span>
          </Link>
          <Link to="/debug" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('debug') ? 'bg-blue-50 text-blue-700' : 'text-gray-700 hover:bg-gray-100'}`}>
            {isActive('debug') && <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-700 rounded-r"></div>}
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <span>Debug</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
