import { GSAPReveal } from "@/components/Shared/GSAPReveal";
import { dataFeatures } from "./Features.data";

export function Features() {
  return (
    <div className="max-w-6xl mx-auto p-6 lg:py-40 bg-gradient-to-r from-blue-50 to-purple-100 rounded-lg">
      <GSAPReveal>
        <h3 className="text-4xl lg:text-6xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-neutral-900 to-purple-800 animate-text">
          Key Features
        </h3>
      </GSAPReveal>
      <GSAPReveal delay={0.4}>
        <p className="max-w-lg mt-5 lg:mt-10 lg:mb-16 text-xl text-gray-600">
          We are all about our clients comfort and safety. That is why we
          provide the best service and the best price.
        </p>
      </GSAPReveal>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {dataFeatures.map(({ icon: Icon, text, bg, delay }) => (
          <GSAPReveal
            key={text}
            className="p-8 rounded-2xl bg-white shadow-lg hover:shadow-2xl transition-shadow duration-300 flex flex-col items-center"
            delay={delay}
          >
            <div
              className={`rounded-full ${bg} w-16 h-16 flex items-center justify-center mb-6`}
            >
              <Icon className="w-8 h-8 text-gray-800" />
            </div>
            <p className="font-bold text-center text-xl text-gray-800">{text}</p>
          </GSAPReveal>
        ))}
      </div>
    </div>
  );
}