import React from 'react';
import Navbar from './Navbar';
import { cn } from '../../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  className?: string;
}

const Layout: React.FC<LayoutProps> = ({ children, className }) => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar />
      <main className={cn('flex-grow container mx-auto px-4 py-8', className)}>
        {children}
      </main>
      <footer className="bg-white border-t border-gray-200 py-6">
        <div className="container mx-auto px-4">
          <div className="text-center text-sm text-gray-500">
            <p>© {new Date().getFullYear()} StoreRater. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;