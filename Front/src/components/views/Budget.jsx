import React from 'react'
import ButtonOption from '../buttons/ButtonOption'
import { useRouter } from 'next/navigation'

const Budget = () => {
	const router = useRouter();

  const handleRedirect = () => {
    router.push("/dashboard/budgets/new");
  };
  return (
	<div>
		<ButtonOption actionType='Nuevo' additionalText='Presupuesto' onClick={handleRedirect}/>
	</div>
  )
}

export default Budget