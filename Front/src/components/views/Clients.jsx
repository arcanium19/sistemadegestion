'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchClients } from '@/redux/actions';
import Loading from '../loading/Loading';

const Clients = () => {
  const dispatch = useDispatch();
  const { clients, loading, error, totalPages, currentPage } = useSelector((state) => state.clients);
  const [page, setPage] = useState(1);
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchClients(page));
  }, [dispatch, page]);

  const handleClientClick = (clientId) => {
    router.push(`/clients/${clientId}`);
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div>
      <h1>Clientes</h1>
      {
      clients?.length === 0 ? (
        <p>No se han creado clientes aún...</p>
      ) : (
        <ul>
          {clients?.map((client) => (
            <li key={client.id} onClick={() => handleClientClick(client.id)}>
              {client.name}
            </li>
          ))}
        </ul>
      )}
      <div>
        <button 
          onClick={() => handlePageChange(page - 1)} 
          disabled={page === 1}
        >
          Anterior
        </button>
        <span> Página {currentPage} de {totalPages} </span>
        <button 
          onClick={() => handlePageChange(page + 1)} 
          disabled={page === totalPages}
        >
          Siguiente
        </button>
      </div>
    </div>
  );
};

export default Clients;
