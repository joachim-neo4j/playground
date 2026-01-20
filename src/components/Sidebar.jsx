import { Link, useLocation } from 'react-router-dom';
import { HomeIconOutline, CodeBracketIconOutline, CircleStackIconOutline, CloudArrowDownIconOutline } from '@neo4j-ndl/react/icons';

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
            <CloudArrowDownIconOutline className="h-5 w-5" />
            <span>Import</span>
          </Link>
          <Link to="/query" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('query')}`}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>Query</span>
          </Link>
          <Link to="/explore" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('explore')}`}>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" strokeWidth="1.5" stroke="currentColor">
              <g>
                <path d="M6.6875 7.12384C6.6875 7.41111 6.74408 7.69556 6.85401 7.96096C6.96395 8.22636 7.12508 8.46751 7.3282 8.67064C7.53133 8.87376 7.77248 9.03489 8.03788 9.14483C8.30328 9.25476 8.58773 9.31134 8.875 9.31134C9.16227 9.31134 9.44672 9.25476 9.71212 9.14483C9.97752 9.03489 10.2187 8.87376 10.4218 8.67064C10.6249 8.46751 10.7861 8.22636 10.896 7.96096C11.0059 7.69556 11.0625 7.41111 11.0625 7.12384C11.0625 6.83657 11.0059 6.55212 10.896 6.28672C10.7861 6.02132 10.6249 5.78017 10.4218 5.57704C10.2187 5.37392 9.97752 5.21279 9.71212 5.10285C9.44672 4.99292 9.16227 4.93634 8.875 4.93634C8.58773 4.93634 8.30328 4.99292 8.03788 5.10285C7.77248 5.21279 7.53133 5.37392 7.3282 5.57704C7.12508 5.78017 6.96395 6.02132 6.85401 6.28672C6.74408 6.55212 6.6875 6.83657 6.6875 7.12384Z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M11.9375 2.74884C11.9375 3.09694 12.0758 3.43078 12.3219 3.67692C12.5681 3.92306 12.9019 4.06134 13.25 4.06134C13.5981 4.06134 13.9319 3.92306 14.1781 3.67692C14.4242 3.43078 14.5625 3.09694 14.5625 2.74884C14.5625 2.40074 14.4242 2.0669 14.1781 1.82076C13.9319 1.57462 13.5981 1.43634 13.25 1.43634C12.9019 1.43634 12.5681 1.57462 12.3219 1.82076C12.0758 2.0669 11.9375 2.40074 11.9375 2.74884Z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M11.9375 10.1863C11.9375 10.5344 12.0758 10.8683 12.3219 11.1144C12.5681 11.3606 12.9019 11.4988 13.25 11.4988C13.5981 11.4988 13.9319 11.3606 14.1781 11.1144C14.4242 10.8683 14.5625 10.5344 14.5625 10.1863C14.5625 9.83824 14.4242 9.5044 14.1781 9.25826C13.9319 9.01212 13.5981 8.87384 13.25 8.87384C12.9019 8.87384 12.5681 9.01212 12.3219 9.25826C12.0758 9.5044 11.9375 9.83824 11.9375 10.1863Z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M7.5625 13.2488C7.5625 13.5969 7.70078 13.9308 7.94692 14.1769C8.19306 14.423 8.5269 14.5613 8.875 14.5613C9.2231 14.5613 9.55694 14.423 9.80308 14.1769C10.0492 13.9308 10.1875 13.5969 10.1875 13.2488C10.1875 12.9007 10.0492 12.5669 9.80308 12.3207C9.55694 12.0746 9.2231 11.9363 8.875 11.9363C8.5269 11.9363 8.19306 12.0746 7.94692 12.3207C7.70078 12.5669 7.5625 12.9007 7.5625 13.2488Z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M1.4375 13.2488C1.4375 13.4212 1.47145 13.5919 1.53741 13.7511C1.60337 13.9103 1.70005 14.055 1.82192 14.1769C1.9438 14.2988 2.08849 14.3955 2.24773 14.4614C2.40697 14.5274 2.57764 14.5613 2.75 14.5613C2.92236 14.5613 3.09303 14.5274 3.25227 14.4614C3.41151 14.3955 3.5562 14.2988 3.67808 14.1769C3.79995 14.055 3.89663 13.9103 3.96259 13.7511C4.02855 13.5919 4.0625 13.4212 4.0625 13.2488C4.0625 13.0765 4.02855 12.9058 3.96259 12.7466C3.89663 12.5873 3.79995 12.4426 3.67808 12.3207C3.5562 12.1989 3.41151 12.1022 3.25227 12.0362C3.09303 11.9703 2.92236 11.9363 2.75 11.9363C2.57764 11.9363 2.40697 11.9703 2.24773 12.0362C2.08849 12.1022 1.9438 12.1989 1.82192 12.3207C1.70005 12.4426 1.60337 12.5873 1.53741 12.7466C1.47145 12.9058 1.4375 13.0765 1.4375 13.2488Z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M1.875 4.06134C1.875 4.40944 2.01328 4.74328 2.25942 4.98942C2.50556 5.23556 2.8394 5.37384 3.1875 5.37384C3.5356 5.37384 3.86944 5.23556 4.11558 4.98942C4.36172 4.74328 4.5 4.40944 4.5 4.06134C4.5 3.71324 4.36172 3.3794 4.11558 3.13326C3.86944 2.88712 3.5356 2.74884 3.1875 2.74884C2.8394 2.74884 2.50556 2.88712 2.25942 3.13326C2.01328 3.3794 1.875 3.71324 1.875 4.06134Z" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M10.4214 5.578L12.3231 3.67633" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M10.7964 8.17033L12.1293 9.50325" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M8.875 9.31134V11.9363" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M7.32974 8.66908L3.67749 12.3213" strokeLinecap="round" strokeLinejoin="round"></path>
                <path d="M6.83388 6.33692L4.27246 4.79984" strokeLinecap="round" strokeLinejoin="round"></path>
              </g>
            </svg>
            <span>Explore</span>
          </Link>
          <Link to="/dashboards" className={`relative flex items-center space-x-3 rounded-md px-3 py-2 text-sm font-medium ${isActive('dashboards')}`}>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"></path>
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
