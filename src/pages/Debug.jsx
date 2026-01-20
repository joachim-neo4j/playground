import Layout from '../components/Layout';

export default function Debug() {
  return (
    <Layout>
      <div className="mx-auto max-w-7xl px-6 py-6 lg:px-8 lg:py-8">
        <h1 className="mb-4 text-3xl tracking-tight lg:text-4xl">Debug</h1>
        <p className="mb-8 text-sm text-muted-foreground lg:text-base">Content for Debug page</p>
      </div>
    </Layout>
  );
}
