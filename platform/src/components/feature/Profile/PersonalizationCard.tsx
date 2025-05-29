import React from 'react'

interface PersonalizationCardProps {
    type: string;
    amountOfOccurance: number;
    description: string;
    icon: React.ReactNode;
}

const PersonalizationCard:React.FC<PersonalizationCardProps> = ({type, description, icon, amountOfOccurance}) => {
  return (
                <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                    <span className="text-white text-2xl">{icon}</span>
                </div>
                {type} ({amountOfOccurance})
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600 cursor-text">
                {description}
              </dd>
            </div>
  )
}

export default PersonalizationCard