"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Loading from '@/components/loading/Loading';
import NavBar from '@/components/navbar/NavBar';

export default function Dashboard() {
  const router = useRouter();
  const [activeComponent, setActiveComponent] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const path = window.location.hash;
    if (path === '#user') {
      setActiveComponent('component1');
    } else if (path === '#client') {
      setActiveComponent('component2');
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
      case 'component1':
        return <Component1 />;
      case 'component2':
        return <Component2 />;
      default:
        return <Component1 />;
    }
  };

  return (
    <div className="flex min-h-screen bg-gradient-to-b from-dark to-gray-dark">
      <NavBar handleNavigation={handleNavigation} />
      <div className="w-4/5 p-4">
        {loading ? (
          <Loading />
        ) : (
          renderComponent()
        )}
      </div>
    </div>
  );
}

const Component1 = () => (
  <div className="p-4 bg-dark-light shadow-md rounded-md text-blue-500">
    <h3 className="text-xl font-bold mb-2">Component 1</h3>
    <p>This is the content for Component 1.</p>
  </div>
);

const Component2 = () => (
  <div className="p-4 bg-white shadow-md rounded-md">
    <h3 className="text-xl font-bold mb-2">Component 2</h3>
    <p>This is the content for Component 2.</p>
  </div>
);
