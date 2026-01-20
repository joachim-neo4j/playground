import { Link } from 'react-router-dom';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-12 items-center px-4">
        {/* Left side: Logo and breadcrumbs */}
        <div className="mr-4 flex items-center space-x-2 text-sm flex-1 min-w-0">
          {/* Neo4j Logo */}
          <svg width="169" height="32" viewBox="0 0 253 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="logo">
            <path d="M156.729 24.8c0-5.348 3.836-9.132 9.28-9.132 5.44 0 9.244 3.715 9.244 9.131v8.471h-2.161v-4.235c-1.222 3.055-4.082 4.686-7.432 4.686-4.85 0-8.931-3.437-8.931-8.922zm16.188-.105c0-3.958-2.792-6.874-6.908-6.874-4.118 0-6.909 2.915-6.909 6.874 0 3.958 2.791 6.873 6.909 6.873 4.117 0 6.908-2.915 6.908-6.873zM184.962 25.076v-8.957h2.337v8.957c0 4.201 2.442 6.492 6.175 6.492 3.733 0 6.176-2.291 6.176-6.492v-8.957h2.337v8.957c0 5.694-3.418 8.645-8.513 8.645s-8.512-2.951-8.512-8.645zM211.695 22.994c0-4.93 2.966-7.326 7.258-7.326s7.221 2.395 7.221 7.36v.208h-2.304v-.242c0-3.576-1.987-5.173-4.917-5.173-2.966 0-4.921 1.597-4.921 5.173V33.27h-2.337V22.994zM234.067 24.8c0-5.348 3.837-9.132 9.281-9.132 5.44 0 9.244 3.715 9.244 9.131v8.471h-2.163v-4.235c-1.222 3.055-4.081 4.686-7.43 4.686-4.85 0-8.932-3.437-8.932-8.922zm16.188-.105c0-3.958-2.791-6.874-6.908-6.874-4.117 0-6.908 2.916-6.908 6.874 0 3.958 2.791 6.873 6.909 6.873 4.116 0 6.907-2.915 6.907-6.873z" fill="#000"></path>
            <path d="M27.26 10.223c-7.972 0-13.324 4.7-13.324 13.776v6.451a5.723 5.723 0 012.567-.601c.928 0 1.802.218 2.621.601v-6.506c0-5.904 3.222-8.91 8.137-8.91 4.915 0 8.136 3.006 8.136 8.91v14.16h5.188v-14.16c.055-9.13-5.351-13.721-13.324-13.721zM43.425 24.49c0-8.254 6.007-14.322 14.527-14.322s14.417 6.068 14.417 14.323v1.913H48.941c.764 4.865 4.368 7.544 9.064 7.544 3.496 0 5.953-1.093 7.537-3.444h5.734c-2.075 5.084-6.99 8.309-13.27 8.309-8.52 0-14.582-6.068-14.582-14.323h.001zm23.537-2.733c-1.038-4.373-4.587-6.725-8.955-6.725-4.369 0-7.864 2.405-8.901 6.725h17.858-.002zM75.21 24.49c0-8.254 6.006-14.322 14.526-14.322 8.519 0 14.526 6.068 14.526 14.323s-6.007 14.323-14.526 14.323c-8.52 0-14.527-6.068-14.527-14.323zm23.864 0c0-5.52-3.713-9.456-9.284-9.456-5.57 0-9.283 3.935-9.283 9.457 0 5.521 3.713 9.457 9.283 9.457 5.57 0 9.284-3.936 9.284-9.457zM133.969 43.517h.601c3.331 0 4.587-1.476 4.587-5.358V11.098h5.188v26.733c0 6.725-2.621 10.17-9.284 10.17h-1.092V43.515zM131.404 40.727h-5.19v-6.45h-13.16c-2.622 0-4.915-1.312-5.953-3.39-.983-1.968-.71-4.264.71-6.177l11.85-15.58c1.694-2.297 4.587-3.226 7.264-2.352 2.73.875 4.479 3.335 4.479 6.232v16.673h3.93v4.648h-3.93v6.396zm-19.278-13.175c-.164.22-.219.492-.219.766 0 .71.6 1.312 1.311 1.312h12.996V12.846c0-.874-.655-1.203-.927-1.257-.109-.055-.273-.055-.492-.055-.328 0-.71.11-1.038.547l-11.631 15.471z" fill="#1A1B1D"></path>
            <path d="M141.774 0c-2.458 0-4.424 2.022-4.424 4.483 0 2.462 2.021 4.483 4.424 4.483 2.402 0 4.423-2.023 4.423-4.483 0-2.46-2.021-4.483-4.423-4.483zM2.25 25.804c-.655.328-1.256.874-1.693 1.586-.437.71-.6 1.476-.547 2.24.055 1.368.82 2.625 2.075 3.335 1.147.655 2.458.491 3.713.219 1.53-.383 2.84-.547 4.205.274h.055c2.349 1.367 2.349 4.81 0 6.177h-.055c-1.366.82-2.676.656-4.205.273-1.202-.327-2.512-.491-3.713.22C.83 40.837.12 42.15.01 43.46c-.055.766.11 1.531.547 2.241.436.711.983 1.258 1.693 1.586a4.182 4.182 0 003.932-.108c1.147-.656 1.694-1.914 2.021-3.117.437-1.53.928-2.734 2.349-3.5 1.366-.82 2.676-.655 4.205-.272 1.202.328 2.512.492 3.713-.219 1.256-.71 1.966-2.022 2.075-3.334v-.546c-.055-1.367-.82-2.624-2.075-3.335-1.147-.656-2.458-.491-3.713-.218-1.53.382-2.84.546-4.205-.274-1.366-.82-1.911-1.969-2.349-3.5-.327-1.203-.874-2.404-2.02-3.116-1.256-.547-2.731-.547-3.933.055z" fill="#014063"></path>
          </svg>

          <span className="text-gray-300">/</span>
          
          <div className="flex items-center space-x-1.5 text-gray-700">
            <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
            </svg>
            <span>Neo4j</span>
            <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
          
          <span className="text-gray-300">/</span>
          
          <div className="flex items-center space-x-1.5 text-gray-700">
            <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path>
            </svg>
            <span>New project</span>
            <svg className="h-4 w-4 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
            </svg>
          </div>
        </div>

        {/* Right side: Action icons */}
        <div className="ml-auto flex items-center space-x-2">
          <div className="hidden lg:flex items-center space-x-2">
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"></path>
              </svg>
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0"></path>
              </svg>
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z"></path>
              </svg>
            </button>
            <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10">
              <div className="flex items-center justify-center h-8 w-8 rounded-full bg-neo-blue-light text-neo-blue-dark font-semibold text-sm" style={{ backgroundColor: '#e6f2f8', color: '#084d73' }}>
                JL
              </div>
            </button>
          </div>
          {/* Mobile menu button */}
          <button className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 hover:bg-accent hover:text-accent-foreground h-10 w-10 lg:hidden">
            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
