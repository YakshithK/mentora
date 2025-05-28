import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="py-24 sm:py-16 font-outfit mb-10">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl lg:text-center">
          <h2 className="text-base font-semibold leading-7 text-purple-600 cursor-text">
            Your data <span className="underline font-bold">matters</span>
          </h2>
          <h2 className="mt-2 text-3xl font-manrope font-semibold tracking-tight text-gray-900 sm:text-5xl cursor-text">
            Our <span className="font-bold bg-gradient-to-r from-violet-500 via-indigo-500 to-indigo-400 inline-block text-transparent bg-clip-text">Privacy Promise</span>
          </h2>
          <p className="mt-6 text-lg leading-8 text-gray-600 cursor-text">
            We are committed to protecting your privacy. This policy outlines how we handle your data with care and transparency.
          </p>
        </div>

        <div className="mx-auto mt-8 max-w-2xl sm:mt-20 lg:mt-12 lg:max-w-4xl">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-10 lg:max-w-none lg:grid-cols-2 lg:gap-y-16">
            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                  <span className="text-white text-xl">🔐</span>
                </div>
                <div className="cursor-text">Data Collection</div>
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600 cursor-text">
                We collect minimal data necessary to provide personalized feedback and improve our services. No data is sold or shared without consent.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                  <span className="text-white text-xl">🛡️</span>
                </div>
                <div className="cursor-text">Data Security</div>
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600 cursor-text">
                Your data is stored securely using encryption and access control. We use industry best practices to protect your information.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                  <span className="text-white text-xl">📄</span>
                </div>
                <div className="cursor-text">Data Usage</div>
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600 cursor-text">
                We use your information only to enhance your experience on our platform—never for advertising or unrelated purposes.
              </dd>
            </div>

            <div className="relative pl-16">
              <dt className="text-base font-semibold leading-7 text-gray-900">
                <div className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center rounded-lg bg-purple-600">
                  <span className="text-white text-xl">🔄</span>
                </div>
                <div className="cursor-text">Policy Updates</div>
              </dt>
              <dd className="mt-2 text-base leading-7 text-gray-600 cursor-text">
                We may update this policy occasionally. You’ll always be notified of significant changes via the app or email.
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
