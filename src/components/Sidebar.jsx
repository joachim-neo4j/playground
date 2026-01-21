import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { createPortal } from 'react-dom';
import { CodeBracketIconOutline, CircleStackIconOutline } from '@neo4j-ndl/react/icons';

export default function Sidebar() {
  const location = useLocation();
  const activePage = location.pathname.replace('/', '') || 'get-started';
  const [showPlaygroundMenu, setShowPlaygroundMenu] = useState(false);
  const [playgroundMenuPosition, setPlaygroundMenuPosition] = useState(null);
  
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
    // Check if we're on a playground exploration page
    if (location.pathname.startsWith('/playground/')) {
      return page === 'playground' ? 'bg-neo-blue-light text-neo-blue' : 'text-gray-700 hover:bg-gray-100';
    }
    const currentPage = pageMap[location.pathname] || 'get-started';
    return currentPage === page ? 'bg-neo-blue-light text-neo-blue' : 'text-gray-700 hover:bg-gray-100';
  };

  return (
    <aside className="hidden lg:block border-r bg-white fixed top-12 left-0 bottom-0 overflow-y-auto" style={{ width: '194px' }}>
      <nav className="px-2 pt-6 pb-2" style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        {/* Top Section */}
        <div className="mb-4">
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <Link to="/" className={`relative flex items-center space-x-3 rounded-md px-3 text-sm font-medium ${isActive('get-started')}`} style={{ height: '32px' }}>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.7" stroke="currentColor" aria-hidden="true" data-slot="icon">
                <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21H3.375c-.621 0-1.125-.504-1.125-1.125V16.5m13.5 0v-4.875c0-.621-.504-1.125-1.125-1.125h-2.25c-.621 0-1.125.504-1.125 1.125v4.875m0 0H21M9.75 9.75l3-3m0 0 3 3m-3-3v12" />
              </svg>
              <span>Get started</span>
            </Link>
            <Link to="/developer-hub" className={`relative flex items-center space-x-3 rounded-md px-3 text-sm font-medium ${isActive('developer-hub')}`} style={{ height: '32px' }}>
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.7" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.7" d="m6.75 7.5 3 2.25-3 2.25m4.5 0h3m-9 8.25h13.5A2.25 2.25 0 0 0 21 18V6a2.25 2.25 0 0 0-2.25-2.25H5.25A2.25 2.25 0 0 0 3 6v12a2.25 2.25 0 0 0 2.25 2.25Z" />
              </svg>
              <span>Developer hub</span>
            </Link>
            <div 
              className="relative"
              onMouseEnter={(e) => {
                setShowPlaygroundMenu(true);
                const rect = e.currentTarget.getBoundingClientRect();
                setPlaygroundMenuPosition({ top: rect.top, left: rect.right });
              }}
              onMouseLeave={(e) => {
                // Only close if we're not moving to the dropdown
                const relatedTarget = e.relatedTarget;
                if (!relatedTarget || !relatedTarget.closest('.playground-dropdown')) {
                  setShowPlaygroundMenu(false);
                }
              }}
            >
              <div className={`relative flex items-center space-x-3 rounded-md px-3 text-sm font-medium ${isActive('playground')}`} style={{ height: '32px', cursor: 'pointer' }}>
                <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m3.75 13.5 10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75Z" />
                </svg>
                <span className="flex-1">Playground</span>
                <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
                </svg>
              </div>
            </div>
            {showPlaygroundMenu && playgroundMenuPosition && createPortal(
              <div 
                className="playground-dropdown fixed bg-white border border-gray-200 rounded-md shadow-lg z-[9999] min-w-[200px] py-1"
                style={{ top: `${playgroundMenuPosition.top}px`, left: `${playgroundMenuPosition.left}px` }}
                onMouseEnter={() => setShowPlaygroundMenu(true)}
                onMouseLeave={() => setShowPlaygroundMenu(false)}
              >
                <Link to="/playground/exploration-1" className="block px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Exploration 1</Link>
                <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Exploration 2</div>
                <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Exploration 3</div>
                <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Exploration 4</div>
                <div className="px-3 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer">Exploration 5</div>
              </div>,
              document.body
            )}
          </div>
        </div>

        {/* Data services Section */}
        <div className="mb-4">
          <h3 className="mb-3 px-3 text-sm font-bold text-gray-900" style={{ fontSize: '14px', letterSpacing: '0px' }}>Data services</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Link to="/instances" className={`relative flex items-center space-x-3 rounded-md px-3 text-sm font-medium ${isActive('instances')}`} style={{ height: '32px' }}>
            <CircleStackIconOutline className="h-5 w-5" />
            <span>Instances</span>
          </Link>
          <Link to="/graph-analytics" className={`relative flex items-center space-x-3 rounded-md px-3 text-sm font-medium ${isActive('graph-analytics')}`} style={{ height: '32px' }}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
              <path d="M12.0068 13.6942C12.9387 13.6942 13.6943 12.9387 13.6943 12.0067C13.6943 11.0748 12.9387 10.3192 12.0068 10.3192C11.0748 10.3192 10.3193 11.0748 10.3193 12.0067C10.3193 12.9387 11.0748 13.6942 12.0068 13.6942Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M14.7912 14.791C19.1846 10.3976 21.4996 5.58948 19.9619 4.05179C18.4242 2.5141 13.6161 4.82911 9.22275 9.22251C4.82935 13.6159 2.51434 18.424 4.05203 19.9617C5.58972 21.4994 10.3978 19.1844 14.7912 14.791Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
              <path d="M19.9619 19.9617C21.4996 18.424 19.1846 13.6159 14.7912 9.22251C10.3978 4.82911 5.58972 2.5141 4.05203 4.05179C2.51434 5.58948 4.82935 10.3976 9.22275 14.791C13.6162 19.1844 18.4242 21.4994 19.9619 19.9617Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span>Graph Analytics</span>
          </Link>
          <Link to="/data-apis" className={`relative flex items-center space-x-3 rounded-md px-3 text-sm font-medium ${isActive('data-apis')}`} style={{ height: '32px' }}>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m21 7.5-2.25-1.313M21 7.5v2.25m0-2.25-2.25 1.313M3 7.5l2.25-1.313M3 7.5l2.25 1.313M3 7.5v2.25m9 3 2.25-1.313M12 12.75l-2.25-1.313M12 12.75V15m0 6.75 2.25-1.313M12 21.75V19.5m0 2.25-2.25-1.313m0-16.875L12 2.25l2.25 1.313M21 14.25v2.25l-2.25 1.313m-13.5 0L3 16.5v-2.25"></path>
            </svg>
            <span>Data APIs</span>
          </Link>
          <Link to="/agents" className={`relative flex items-center space-x-3 rounded-md px-3 text-sm font-medium ${isActive('agents')}`} style={{ height: '32px' }}>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6.429 9.75 2.25 12l4.179 2.25m0-4.5 5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0 4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0-5.571 3-5.571-3"></path>
            </svg>
            <span>Agents</span>
            <span className="ml-auto rounded-full bg-neo-blue px-2 text-xs text-white leading-tight" style={{ paddingTop: '0px', paddingBottom: '0px', lineHeight: '1.25rem' }}>Preview</span>
          </Link>
          </div>
        </div>

        {/* Tools Section */}
        <div>
          <h3 className="mb-3 px-3 text-sm font-bold text-gray-900" style={{ fontSize: '14px', letterSpacing: '0px' }}>Tools</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Link to="/import" className={`relative flex items-center space-x-3 rounded-md px-3 text-sm font-medium ${isActive('import')}`} style={{ height: '32px' }}>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" data-slot="icon">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9.75v6.75m0 0-3-3m3 3 3-3m-8.25 6a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"></path>
            </svg>
            <span>Import</span>
          </Link>
          <Link to="/query" className={`relative flex items-center space-x-3 rounded-md px-3 text-sm font-medium ${isActive('query')}`} style={{ height: '32px' }}>
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.6" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
            </svg>
            <span>Query</span>
          </Link>
          <Link to="/explore" className={`relative flex items-center space-x-3 rounded-md px-3 text-sm font-medium ${isActive('explore')}`} style={{ height: '32px' }}>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="none" strokeWidth="1.2" stroke="currentColor">
              <g>
                <path d="M6.6875 7.12384C6.6875 7.41111 6.74408 7.69556 6.85401 7.96096C6.96395 8.22636 7.12508 8.46751 7.3282 8.67064C7.53133 8.87376 7.77248 9.03489 8.03788 9.14483C8.30328 9.25476 8.58773 9.31134 8.875 9.31134C9.16227 9.31134 9.44672 9.25476 9.71212 9.14483C9.97752 9.03489 10.2187 8.87376 10.4218 8.67064C10.6249 8.46751 10.7861 8.22636 10.896 7.96096C11.0059 7.69556 11.0625 7.41111 11.0625 7.12384C11.0625 6.83657 11.0059 6.55212 10.896 6.28672C10.7861 6.02132 10.6249 5.78017 10.4218 5.57704C10.2187 5.37392 9.97752 5.21279 9.71212 5.10285C9.44672 4.99292 9.16227 4.93634 8.875 4.93634C8.58773 4.93634 8.30328 4.99292 8.03788 5.10285C7.77248 5.21279 7.53133 5.37392 7.3282 5.57704C7.12508 5.78017 6.96395 6.02132 6.85401 6.28672C6.74408 6.55212 6.6875 6.83657 6.6875 7.12384Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"></path>
                <path d="M11.9375 2.74884C11.9375 3.09694 12.0758 3.43078 12.3219 3.67692C12.5681 3.92306 12.9019 4.06134 13.25 4.06134C13.5981 4.06134 13.9319 3.92306 14.1781 3.67692C14.4242 3.43078 14.5625 3.09694 14.5625 2.74884C14.5625 2.40074 14.4242 2.0669 14.1781 1.82076C13.9319 1.57462 13.5981 1.43634 13.25 1.43634C12.9019 1.43634 12.5681 1.57462 12.3219 1.82076C12.0758 2.0669 11.9375 2.40074 11.9375 2.74884Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"></path>
                <path d="M11.9375 10.1863C11.9375 10.5344 12.0758 10.8683 12.3219 11.1144C12.5681 11.3606 12.9019 11.4988 13.25 11.4988C13.5981 11.4988 13.9319 11.3606 14.1781 11.1144C14.4242 10.8683 14.5625 10.5344 14.5625 10.1863C14.5625 9.83824 14.4242 9.5044 14.1781 9.25826C13.9319 9.01212 13.5981 8.87384 13.25 8.87384C12.9019 8.87384 12.5681 9.01212 12.3219 9.25826C12.0758 9.5044 11.9375 9.83824 11.9375 10.1863Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"></path>
                <path d="M7.5625 13.2488C7.5625 13.5969 7.70078 13.9308 7.94692 14.1769C8.19306 14.423 8.5269 14.5613 8.875 14.5613C9.2231 14.5613 9.55694 14.423 9.80308 14.1769C10.0492 13.9308 10.1875 13.5969 10.1875 13.2488C10.1875 12.9007 10.0492 12.5669 9.80308 12.3207C9.55694 12.0746 9.2231 11.9363 8.875 11.9363C8.5269 11.9363 8.19306 12.0746 7.94692 12.3207C7.70078 12.5669 7.5625 12.9007 7.5625 13.2488Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"></path>
                <path d="M1.4375 13.2488C1.4375 13.4212 1.47145 13.5919 1.53741 13.7511C1.60337 13.9103 1.70005 14.055 1.82192 14.1769C1.9438 14.2988 2.08849 14.3955 2.24773 14.4614C2.40697 14.5274 2.57764 14.5613 2.75 14.5613C2.92236 14.5613 3.09303 14.5274 3.25227 14.4614C3.41151 14.3955 3.5562 14.2988 3.67808 14.1769C3.79995 14.055 3.89663 13.9103 3.96259 13.7511C4.02855 13.5919 4.0625 13.4212 4.0625 13.2488C4.0625 13.0765 4.02855 12.9058 3.96259 12.7466C3.89663 12.5873 3.79995 12.4426 3.67808 12.3207C3.5562 12.1989 3.41151 12.1022 3.25227 12.0362C3.09303 11.9703 2.92236 11.9363 2.75 11.9363C2.57764 11.9363 2.40697 11.9703 2.24773 12.0362C2.08849 12.1022 1.9438 12.1989 1.82192 12.3207C1.70005 12.4426 1.60337 12.5873 1.53741 12.7466C1.47145 12.9058 1.4375 13.0765 1.4375 13.2488Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"></path>
                <path d="M1.875 4.06134C1.875 4.40944 2.01328 4.74328 2.25942 4.98942C2.50556 5.23556 2.8394 5.37384 3.1875 5.37384C3.5356 5.37384 3.86944 5.23556 4.11558 4.98942C4.36172 4.74328 4.5 4.40944 4.5 4.06134C4.5 3.71324 4.36172 3.3794 4.11558 3.13326C3.86944 2.88712 3.5356 2.74884 3.1875 2.74884C2.8394 2.74884 2.50556 2.88712 2.25942 3.13326C2.01328 3.3794 1.875 3.71324 1.875 4.06134Z" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"></path>
                <path d="M10.4214 5.578L12.3231 3.67633" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"></path>
                <path d="M10.7964 8.17033L12.1293 9.50325" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"></path>
                <path d="M8.875 9.31134V11.9363" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"></path>
                <path d="M7.32974 8.66908L3.67749 12.3213" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"></path>
                <path d="M6.83388 6.33692L4.27246 4.79984" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.2"></path>
              </g>
            </svg>
            <span>Explore</span>
          </Link>
          <Link to="/dashboards" className={`relative flex items-center space-x-3 rounded-md px-3 text-sm font-medium ${isActive('dashboards')}`} style={{ height: '32px' }}>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 7.125C2.25 6.504 2.754 6 3.375 6h6c.621 0 1.125.504 1.125 1.125v3.75c0 .621-.504 1.125-1.125 1.125h-6a1.125 1.125 0 0 1-1.125-1.125v-3.75ZM14.25 8.625c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v8.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-8.25ZM3.75 16.125c0-.621.504-1.125 1.125-1.125h5.25c.621 0 1.125.504 1.125 1.125v2.25c0 .621-.504 1.125-1.125 1.125h-5.25a1.125 1.125 0 0 1-1.125-1.125v-2.25Z"></path>
            </svg>
            <span>Dashboards</span>
          </Link>
          </div>
        </div>

        {/* Separator */}
        <div className="border-t border-gray-200" style={{ marginTop: '4px', marginBottom: '4px' }}></div>

        {/* Bottom Section */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
          <Link to="/operations" className={`relative flex items-center space-x-3 rounded-md px-3 text-sm font-medium ${isActive('operations')}`} style={{ height: '32px' }}>
            <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" strokeWidth="1.5">
              <path d="M2 11.666H5.11125C5.37454 11.6661 5.63197 11.5882 5.85107 11.4421C6.07017 11.296 6.24113 11.0882 6.34242 10.8451L8.65363 5.40614C8.70642 5.28187 8.79565 5.17656 8.90954 5.10412C9.02343 5.03168 9.15661 4.99553 9.29147 5.00044C9.42634 5.00536 9.55654 5.05111 9.66486 5.13165C9.77318 5.21219 9.85452 5.32372 9.89813 5.45151L14.1063 18.5485C14.1499 18.6763 14.2313 18.7878 14.3396 18.8684C14.4479 18.9489 14.5781 18.9946 14.713 18.9996C14.8478 19.0045 14.981 18.9683 15.0949 18.8959C15.2088 18.8234 15.298 18.7181 15.3508 18.5939L17.6576 12.487C17.7589 12.2438 17.9298 12.0361 18.1489 11.89C18.368 11.7439 18.6255 11.6659 18.8888 11.666H22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
            </svg>
            <span className="flex-1">Operations</span>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
            </svg>
          </Link>
          <Link to="/project" className={`relative flex items-center space-x-3 rounded-md px-3 text-sm font-medium ${isActive('project')}`} style={{ height: '32px' }}>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.75V12A2.25 2.25 0 0 1 4.5 9.75h15A2.25 2.25 0 0 1 21.75 12v.75m-8.69-6.44-2.12-2.12a1.5 1.5 0 0 0-1.061-.44H4.5A2.25 2.25 0 0 0 2.25 6v12a2.25 2.25 0 0 0 2.25 2.25h15A2.25 2.25 0 0 0 21.75 18V9a2.25 2.25 0 0 0-2.25-2.25h-5.379a1.5 1.5 0 0 1-1.06-.44Z"></path>
            </svg>
            <span className="flex-1">Project</span>
            <svg className="h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5"></path>
            </svg>
          </Link>
          
          {/* Divider */}
          <div className="border-t border-gray-200" style={{ marginTop: '4px', marginBottom: '4px' }}></div>
          
          <Link to="/learning" className={`relative flex items-center space-x-3 rounded-md px-3 text-sm font-medium ${isActive('learning')}`} style={{ height: '32px' }}>
            <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5"></path>
            </svg>
            <span>Learning</span>
          </Link>
        </div>
      </nav>
    </aside>
  );
}
