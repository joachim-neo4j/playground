import Header from './Header';
import Sidebar from './Sidebar';
import StatusBar from './StatusBar';

export default function Layout({ children }) {
  return (
    <div className="flex flex-col h-full">
      <Header />
      <div className="flex flex-1 min-h-0">
        <Sidebar />
        <main className="flex-1 bg-content-area overflow-auto">
          <StatusBar />
          {children}
        </main>
      </div>
    </div>
  );
}
