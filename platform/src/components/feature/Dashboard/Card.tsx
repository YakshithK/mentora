
import useModalStore from '@/store/modal';
import { ModalType } from '@/types/modal';
import React from 'react';

interface CardProps {
  icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
  title: string;
  description: string;
  type: ModalType;
}

const Card: React.FC<CardProps> = ({
  icon: Icon,
  title,
  description,
  type
}) => {

  const { onOpen } = useModalStore();
  
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-8 w-full max-w-md hover:shadow-sm transition-shadow relative pb-16">
      <div className="mb-6">
        <div className="w-12 h-12 bg-gray-50 rounded-lg flex items-center justify-center mb-4">
          <Icon className="w-6 h-6 text-gray-600" />
        </div>
        <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 leading-relaxed">{description}</p>
      </div>
      <button
        onClick={() => onOpen(type)}
        className="cursor-pointer absolute bottom-8 left-8 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
      >
        Open
      </button>
    </div>
  )
};

export default Card;
