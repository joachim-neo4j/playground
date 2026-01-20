import Header from './Header';
import Sidebar from './Sidebar';
import StatusBar from './StatusBar';

export default function Layout({ children }) {
  return (
    <>
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 bg-content-area">
          <StatusBar />
          {children}
        </main>
      </div>
    </>
  );
}
