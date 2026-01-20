import Layout from '../components/Layout';

export default function GetStarted() {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8 lg:py-8">
        {/* Title and Action Buttons */}
        <div className="mb-6 flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div className="mb-4 sm:mb-0">
            <h1 className="mb-2 text-3xl lg:text-4xl">Get started</h1>
            <p className="text-sm text-muted-foreground lg:text-base">Explore the content below to maximize your Neo4j Aura experience</p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <button className="inline-flex items-center justify-center gap-2 rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" style={{ height: '16px', width: '16px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M18 7.5v3m0 0v3m0-3h3m-3 0h-3m-2.25-4.125a3.375 3.375 0 1 1-6.75 0 3.375 3.375 0 0 1 6.75 0ZM3 19.235v-.11a6.375 6.375 0 0 1 12.75 0v.109A12.318 12.318 0 0 1 9.374 21c-2.331 0-4.512-.645-6.374-1.766Z"></path>
              </svg>
              <span>Invite your team</span>
            </button>
            <button className="inline-flex items-center justify-center gap-2 rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" aria-hidden="true" style={{ height: '16px', width: '16px' }}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"></path>
              </svg>
              <span>Ask Neo4j AI</span>
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="mb-8 border-b">
          <div className="flex space-x-6">
            <button className="border-b-2 border-neo-blue pb-4 px-2 text-sm font-bold text-neo-blue">
              Application development
            </button>
            <button className="border-b-2 border-transparent pb-4 px-2 text-sm font-bold transition-colors hover:text-gray-900 tab-inactive">
              Self-managed deployments
            </button>
          </div>
        </div>

        {/* Steps */}
        <div className="max-w-4xl">
          {/* Step 1 */}
          <div className="relative pb-12">
            <div className="absolute left-4 top-8 bottom-0 hidden w-0.5 bg-neo-blue lg:block"></div>
            
            <div className="flex items-start space-x-4 lg:space-x-6">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neo-blue text-sm font-bold text-white">
                  1
                </div>
              </div>
              
              <div className="flex-1">
                <div className="mb-4">
                  <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold lg:text-2xl">
                    <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
                    </svg>
                    Import your data
                  </h2>
                  <p className="mb-4 text-sm text-muted-foreground lg:text-base">
                    Data in Neo4j is stored as a graph rather than tables. Import your data to begin organizing it into nodes and relationships.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:text-base">
                      Import your data
                    </button>
                    <button className="inline-flex items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-neo-blue ring-offset-background transition-colors hover:text-neo-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:text-base">
                      Try a sample dataset
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="relative pb-12">
            <div className="absolute left-4 top-8 bottom-0 hidden w-0.5 bg-neo-blue lg:block"></div>
            
            <div className="flex items-start space-x-4 lg:space-x-6">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neo-blue text-sm font-bold text-white">
                  2
                </div>
              </div>
              
              <div className="flex-1">
                <div className="mb-4">
                  <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold lg:text-2xl">
                    <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 9l3 3-3 3m5 0h3M5 20h14a2 2 0 002-2V6a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                    </svg>
                    Query your data
                  </h2>
                  <p className="mb-4 text-sm text-muted-foreground lg:text-base">
                    Use natural language to instantly query your data. Effortlessly explore connections, analyze patterns, and gain a deeper understanding of your connected data.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:text-base">
                      Go to Query
                    </button>
                    <button className="inline-flex items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-neo-blue ring-offset-background transition-colors hover:text-neo-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:text-base">
                      Cypher manual
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="flex items-start space-x-4 lg:space-x-6">
              <div className="flex-shrink-0">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-neo-blue text-sm font-bold text-white">
                  3
                </div>
              </div>
              
              <div className="flex-1">
                <div className="mb-4">
                  <h2 className="mb-2 flex items-center gap-2 text-xl font-semibold lg:text-2xl">
                    <svg className="h-5 w-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                    </svg>
                    Build an application
                  </h2>
                  <p className="mb-4 text-sm text-muted-foreground lg:text-base">
                    Bring your ideas to life with Neo4j. Easily build an application or proof-of-concept with popular drivers, like Python and GraphQL, to unlock the power of your connected data.
                  </p>
                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:text-base">
                      Go to Developer hub
                    </button>
                    <button className="inline-flex items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium text-neo-blue ring-offset-background transition-colors hover:text-neo-blue-dark focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:text-base">
                      Explore courses in GraphAcademy
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
}
