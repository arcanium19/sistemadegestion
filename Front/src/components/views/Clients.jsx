'use client';

import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useRouter } from 'next/navigation';
import { fetchClients } from '@/redux/actions';
import Loading from '../loading/Loading';
import PaginationComponent from '../pagination/Pagination';
import ClientCard from '../cards/Clients-card';

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

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  if (loading) return <Loading />;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="min-h-full flex flex-col">
      {clients?.length === 0 ? (
        <p>No se han creado clientes aún...</p>
      ) : (
        <ul className="flex-1 overflow-y-auto">
          {clients?.map((client) => (
            <ClientCard key={client.id} client={client} />
          ))}
        </ul>
      )}
      <div className="flex justify-center items-end h-12">
        <PaginationComponent
          page={page}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default Clients;
