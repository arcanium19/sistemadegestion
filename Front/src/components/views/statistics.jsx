// Ejemplo de uso en una página
import StatisticsCard from "@/components/cards/Statistics-card";
import ButtonOption from "../buttons/ButtonOption";

const Statistics = () => {
  return (
    <div className="flex flex-wrap gap-4">
      <StatisticsCard
        title="Usuarios Activos"
        value="1200"
        colorClass="white-for-text-4"
        widthClass="w-full md:w-1/2 lg:w-2/4"
      />
      <StatisticsCard
        title="Ingresos Mensuales"
        value="$50,000"
        colorClass="white-for-text-4"
        widthClass="w-full md:w-1/2 lg:w-2/4"
      />
      <StatisticsCard
        title="Ventas Diarias"
        value="300"
        colorClass="white-for-text-4"
        widthClass="w-full md:w-1/2 lg:w-3/4"
      />
      <StatisticsCard
        title="Productos Vendidos"
        value="1500"
        colorClass="white-for-text-4"
        widthClass="w-full md:w-1/2 lg:w-1/4"
      />
      <div className="flex lg:flex-row flex-col items-center space-x-2 mt-3 lg:mt-0 justify-between">
        <ButtonOption
          actionType="Aceptar"
          onClick={() => console.log("Aceptar")}
        />
        <ButtonOption
          actionType="Cancelar"
          onClick={() => console.log("Cancelar")}
        />
        <ButtonOption
          actionType="Guardar"
          onClick={() => console.log("Guardar")}
        />
        <ButtonOption
          actionType="Borrar"
          onClick={() => console.log("Borrar")}
        />
        <ButtonOption
          actionType="More"
          onClick={() => console.log("Ver mas")}
        />
        <ButtonOption
          actionType="Editar"
          onClick={() => console.log("Editar")}
        />
        <ButtonOption
          actionType="Nuevo"
          onClick={() => console.log("Nuevo")}
          uppercase={false}
        />
        <ButtonOption
          actionType="Nueva"
          onClick={() => console.log("Nueva")}
          uppercase={false}
          additionalText="Herramienta"
        />
        <ButtonOption
          actionType="Aceptar"
          onClick={() => console.log("Disabled")}
          disabled={true}
        />
		<ButtonOption
			actionType="Nuevo"
			onClick={()=> console.log("Loading")}
			isLoading
		/>
      </div>
    </div>
  );
};

export default Statistics;
