import {testimonials} from '@/data/testimonial'
import TestimonialCard from '@/components/feature/Common/TestimonialCard';

const Testimonial = () => {

  return (
    <div className="mt-16 text-center">
      <div className="mx-auto px-4 sm:px-6 lg:px-8 lg:mb-20">
        <h2 className="text-base font-semibold leading-7 text-indigo-600 cursor-text">
            Trusted by professionals and students
        </h2>
        <h2 className="mt-2 text-3xl font-manrope font-semibold tracking-tight text-gray-900 sm:text-5xl cursor-text mb-8">
            Not convinced? Listen to students <i>like you</i>.
        </h2>
      </div>

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