import Layout from '../components/Layout';

export default function DeveloperHub() {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8 lg:py-8">
        <h1 className="mb-4 text-3xl font-bold tracking-tight lg:text-4xl">Developer Hub</h1>
        <p className="mb-8 text-sm text-muted-foreground lg:text-base">Resources, documentation, and tools for building with Neo4j</p>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-lg border bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold">Documentation</h3>
            <p className="mb-4 text-sm text-muted-foreground">Comprehensive guides and API references for Neo4j development</p>
            <button className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">View Docs</button>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold">Code Examples</h3>
            <p className="mb-4 text-sm text-muted-foreground">Sample code, tutorials, and best practices</p>
            <button className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">Browse Examples</button>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold">SDKs & Drivers</h3>
            <p className="mb-4 text-sm text-muted-foreground">Official drivers for JavaScript, Python, Java, and more</p>
            <button className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">Get Drivers</button>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold">GraphQL API</h3>
            <p className="mb-4 text-sm text-muted-foreground">Build GraphQL APIs on top of your Neo4j database</p>
            <button className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">Learn More</button>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold">Community</h3>
            <p className="mb-4 text-sm text-muted-foreground">Connect with developers, ask questions, and share knowledge</p>
            <button className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">Join Community</button>
          </div>
          <div className="rounded-lg border bg-white p-6">
            <h3 className="mb-2 text-lg font-semibold">Blog & News</h3>
            <p className="mb-4 text-sm text-muted-foreground">Latest updates, tutorials, and insights from the Neo4j team</p>
            <button className="inline-flex items-center justify-center rounded-md bg-white border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 transition-colors hover:bg-gray-50">Read Blog</button>
          </div>
        </div>
      </div>
    </Layout>
  );
}
