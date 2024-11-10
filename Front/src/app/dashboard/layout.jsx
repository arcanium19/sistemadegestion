"use client"
import NavBar from '@/components/navbar/NavBar';

export default function DashboardLayout({ children }) {
  return (
    <div className="flex lg:flex-row flex-col min-h-screen bg-gradient-to-b from-dark to-dark-gray">
      <NavBar />
      <div className="w-full lg:pl-0 p-4">
        {children}
      </div>
    </div>
  );
}
