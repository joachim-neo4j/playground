import { Link, useLocation } from 'react-router-dom';
import { HomeIconOutline, CodeBracketIconOutline, CircleStackIconOutline } from '@neo4j-ndl/react/icons';

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
    <aside className="hidden lg:block border-r bg-white min-h-[calc(100vh-7rem)]" style={{ width: '194px' }}>
      <nav className="px-2 pt-6 pb-2 space-y-1">
        {/* Top Section */}
        <div className="mb-8">
          <div className="space-y-1">
            <Link to="/" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('get-started')}`}>
              <HomeIconOutline className="h-5 w-5" />
              <span>Get started</span>
            </Link>
            <Link to="/developer-hub" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('developer-hub')}`}>
              <CodeBracketIconOutline className="h-5 w-5" />
              <span>Developer hub</span>
            </Link>
          </div>
        </div>

        {/* Data services Section */}
        <div className="mb-8">
          <h3 className="mb-3 px-3 text-xs font-bold text-gray-900 tracking-wider">Data services</h3>
          <div className="space-y-1">
          <Link to="/instances" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('instances')}`}>
            <CircleStackIconOutline className="h-5 w-5" />
            <span>Instances</span>
          </Link>
          <Link to="/graph-analytics" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('graph-analytics')}`}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
              <path d="M12.0068 13.6942C12.9387 13.6942 13.6943 12.9387 13.6943 12.0067C13.6943 11.0748 12.9387 10.3192 12.0068 10.3192C11.0748 10.3192 10.3193 11.0748 10.3193 12.0067C10.3193 12.9387 11.0748 13.6942 12.0068 13.6942Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M14.7912 14.791C19.1846 10.3976 21.4996 5.58948 19.9619 4.05179C18.4242 2.5141 13.6161 4.82911 9.22275 9.22251C4.82935 13.6159 2.51434 18.424 4.05203 19.9617C5.58972 21.4994 10.3978 19.1844 14.7912 14.791Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M19.9619 19.9617C21.4996 18.424 19.1846 13.6159 14.7912 9.22251C10.3978 4.82911 5.58972 2.5141 4.05203 4.05179C2.51434 5.58948 4.82935 10.3976 9.22275 14.791C13.6162 19.1844 18.4242 21.4994 19.9619 19.9617Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span>Graph Analytics</span>
          </Link>
          <Link to="/data-apis" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('data-apis')}`}>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"></path>
            </svg>
            <span>Data APIs</span>
          </Link>
          <Link to="/agents" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('agents')}`}>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"></path>
            </svg>
            <span>Agents</span>
            <span className="ml-auto rounded-full bg-neo-blue px-2 text-xs text-white leading-tight" style={{ paddingTop: '0px', paddingBottom: '0px', lineHeight: '1.25rem' }}>Preview</span>
          </Link>
          </div>
        </div>

        {/* Tools Section */}
        <div className="mb-8">
          <h3 className="mb-3 px-3 text-xs font-bold text-gray-900 tracking-wider">Tools</h3>
          <div className="space-y-1">
          <Link to="/import" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('import')}`}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
            </svg>
            <span>Import</span>
          </Link>
          <Link to="/query" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('query')}`}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>Query</span>
          </Link>
          <Link to="/explore" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('explore')}`}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path>
            </svg>
            <span>Explore</span>
          </Link>
          <Link to="/dashboards" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('dashboards')}`}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
            </svg>
            <span>Dashboards</span>
          </Link>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200 my-4"></div>

        {/* Bottom Section */}
        <div className="space-y-1">
          <Link to="/operations" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('operations')}`}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span className="flex-1">Operations</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
          <Link to="/project" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('project')}`}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
            </svg>
            <span className="flex-1">Project</span>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
            </svg>
          </Link>
          <Link to="/learning" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('learning')}`}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
            </svg>
            <span>Learning</span>
          </Link>
          <Link to="/debug" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('debug')}`}>
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
