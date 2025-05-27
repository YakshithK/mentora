import React from 'react';
import Image from 'next/image';
import { detailedFeatures as features } from '@/data/features';

const Details = () => {
  return (
    <div className="overflow-hidden bg-gray-50 py-16 sm:py-28">
      <div className="max-w-[100rem] mx-auto lg:px-0 ml-20">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-12">
            <div className="col-span-5 flex flex-col justify-center items-start px-4 lg:px-0">
                <h2 className="text-base font-semibold leading-7 text-indigo-600 cursor-text">
                Built for you
                </h2>
                <h2 className="mt-2 text-3xl font-manrope font-semibold tracking-tight text-gray-900 sm:text-5xl cursor-text">
                Relevant and personalized feedback
                </h2>
                <p className="mt-6 text-lg leading-8 text-gray-600 cursor-text">
                Mentora makes it easy to get relevant and personalized feedback on your assignments, helping you improve your grades and understanding of the subject content.
                </p>
                <div className="mt-10 space-y-10">
                  {features.map((feature) => (
                    <div key={feature.name} className="relative pl-9 cursor-text">
                      <dt className="inline font-semibold text-gray-900">
                        <feature.icon
                          className="absolute left-1 top-1 h-5 w-5 text-indigo-600"
                          aria-hidden="true"
                        />
                        {feature.name}
                      </dt>{' '}
                      <dd className="inline cursor-text">{feature.description}</dd>
                    </div>
                  ))}
                </div>
            </div>
          <div className="col-span-7 flex justify-start items-center mt-10 lg:ml-16 lg:mr-5">
            <Image
              width={1000}
              height={1000}
              src={'/images/details-image.png'}
              alt="Product screenshot"
              className="rounded-lg ring-gray-400/10 lg:px-0 px-2"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;