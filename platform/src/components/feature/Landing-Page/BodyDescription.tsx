import { GraduationCapIcon, Users } from 'lucide-react';

const features = [
  {
    name: 'AI Grader',
    description:
      'Mentora uses advanced AI neural networks to provide personalized feedback on your assignments, helping you understand your strengths and areas for improvement.',
    icon: GraduationCapIcon,
  },
  {
    name: 'Bias Dectection',
    description:
      'Mentora identifies and highlights any potential biases in your assignments, ensuring that your work is fair and objective.',
    icon: Users,
  },
];

const BodtyDescription = () => {
  return (
    <div className="py-24 sm:py-16 font-outfit mb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-indigo-600 cursor-text">
            Ace Your Assignments <span className="underline font-bold">Faster</span>
          </h2>
          <h2 className="mt-2 text-3xl font-manrope font-semibold tracking-tight text-gray-900 sm:text-5xl cursor-text">
            Relevant and personalized feedback
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 cursor-text">
            Mentora makes it easy to get relevant and personalized feedback on your assignments, helping you improve your grades and understanding of the subject content.
          </p>
        </div>
        <div className="mx-auto mt-8 max-w-2xl sm:mt-20 lg:mt-12 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            {features.map((feature) => (
              <div key={feature.name} className="relative pl-16">
                <dt className="text-base font-semibold leading-7 text-gray-900">
                  <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                    <feature.icon
                      className="h-6 w-6 text-white"
                      aria-hidden="true"
                    />
                  </div>
                  <div className=' cursor-text'>{feature.name}</div>                  
                </dt>
                <dd className="mt-2 text-base leading-7 text-gray-600 cursor-text">
                  {feature.description}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}

export default BodtyDescription;