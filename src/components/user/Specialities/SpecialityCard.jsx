import React from 'react'

function SpecialityCard({speciality}) {
  return (
    <div className="max-w-xs p-4 rounded-md shadow-md dark:bg-gray-900 dark:text-gray-50 cursor-pointer">
	<img src={speciality.deptImg} alt="" className="object-cover object-center w-full rounded-md h-25 dark:bg-gray-500" />
	<div className="mt-6 mb-2">
		<span className="block text-xs font-medium tracking-widest uppercase dark:text-violet-400">{speciality.name}</span>
		<h2 className="text-xs  tracking-wide">{speciality.description}</h2>
	</div>
</div>
  )
}

export default SpecialityCard