import React from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import LabTabs from './components/LabTabs';

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100">
      <Header />
      <main className="flex-1">
        <LabTabs />
      </main>
      <Footer />
    </div>
  );
}

export default App;