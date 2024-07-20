// Ejemplo de uso en una página
import StatisticsCard from '@/components/cards/Statistics-card';

const Statistics = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <StatisticsCard title="Usuarios Activos" value="1200" colorClass="white-for-text-4" widthClass="w-full md:w-1/2 lg:w-2/4" />
      <StatisticsCard title="Ingresos Mensuales" value="$50,000" colorClass="white-for-text-4" widthClass="w-full md:w-1/2 lg:w-2/4" />
      <StatisticsCard title="Ventas Diarias" value="300" colorClass="white-for-text-4" widthClass="w-full md:w-1/2 lg:w-3/4" />
      <StatisticsCard title="Productos Vendidos" value="1500" colorClass="white-for-text-4" widthClass="w-full md:w-1/2 lg:w-1/4" />
    </div>
  );
};

export default Statistics;
