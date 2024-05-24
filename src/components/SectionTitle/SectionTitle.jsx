/* eslint-disable react/prop-types */

const SectionTitle = ({ heading, subHeading }) => {
  return (
    <div className="max-w-96 mx-auto text-center mb-5">
      <p className="text-center mb-2 text-yellow-600 italic">
        --- {subHeading} ---
      </p>
      <h1 className="text-4xl uppercase text-gray-800 text-center font-semibold border-y-2 py-2">
        {heading}
      </h1>
    </div>
  );
};

export default SectionTitle;
