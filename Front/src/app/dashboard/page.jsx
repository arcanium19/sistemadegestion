"use client";
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/loading/Loading';
import NavBar from '@/components/navbar/NavBar';
import Statistics from '@/components/views/statistics';
import Clients from '@/components/views/Clients';

export default function Dashboard() {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = window.location.hash;
    if (path === '') {
      setActiveComponent('home');
    } else if (path === '#client') {
      setActiveComponent('client');
    }
    setLoading(false); // Simula el tiempo de carga
  }, [router]);

  const handleNavigation = (component, path) => {
    setLoading(true); // Mostrar loading
    setTimeout(() => {
      setActiveComponent(component);
      router.push(path);
      setLoading(false); // Ocultar loading después de un breve retraso
    }, 200); // Simula el tiempo de carga (ajusta según sea necesario)
  };

  const renderComponent = () => {
    switch (activeComponent) {
      case 'home':
        return <Statistics />;
      case 'client':
        return <Clients />;
      default:
        return <Statistics />;
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gradient-to-b from-dark to-dark-gray">
      <NavBar handleNavigation={handleNavigation} />
      <div className="w-full pl-0 p-4">
        {loading ? (
          <Loading />
        ) : (
          renderComponent()
        )}
      </div>
    </div>
  );
}