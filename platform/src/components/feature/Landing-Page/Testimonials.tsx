import {testimonials} from '@/data/testimonial'
import { TestimonialCardProps } from '@/types/testimonial';

const TestimonialCard: React.FC<TestimonialCardProps> = ({ text, name, date, rotate }) => {
  // Determine rotation class based on the "rotate" prop
  const rotationClass =
    rotate === "yes-left"
      ? "-rotate-6"
      : rotate === "yes-right"
      ? "rotate-6"
      : ""; // No rotation for "no" or undefined

  return (
    <div 
      className={`bg-purple-200 relative p-6 rounded-lg w-96 h-96 flex flex-col justify-center items-center text-center ${rotationClass}`}
    >
      {/* Sticky note effect */}
      <div className="absolute top-0 -right-0.5 transform">
        <img 
          src={`/images/post-it-tip.png`}
          alt="Sticky note corner"
          className="h-12 w-12"
        />
      </div>

      {/* Review text */}
      <p className="mb-4 text-gray-800">
        {text}
      </p>

      {/* Reviewer details */}
      <div className="absolute bottom-4 left-6">
        <p className="font-bold text-gray-800">{name}</p>
        <p className="text-sm text-gray-600">{date}</p>
      </div>
    </div>
  );
};

const Testimonial = () => {

  return (
    <div className="mt-16 text-center">

      <div className="flex flex-wrap justify-center gap-8 mt-8 lg:space-x-12">
        {testimonials.map((testimonial, index) => (
          <TestimonialCard 
            key={index}
            text={testimonial.text}
            name={testimonial.name}
            date={testimonial.date}
            rotate={testimonial.rotate}
          />
        ))}
      </div>
    </div>
  );
};

export default Testimonial;