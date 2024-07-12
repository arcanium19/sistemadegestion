// /components/StatisticsCard.js
import React from 'react';

const StatisticsCard = ({ title, value, colorClass, widthClass }) => {
  return (
    <div className={`bg-dark-light shadow-md rounded-md p-4 ${widthClass}`}>
      <h3 className={`text-xl font-bold mb-2 text-${colorClass}`}>{title}</h3>
      <p className="text-white-for-text-4 text-lg">{value}</p>
    </div>
  );
};

export default StatisticsCard;
