import { useState } from "react";
import Step1 from "./steps/Step1";
import Step2 from "./steps/Step2";
import Step3 from "./steps/Step3";
import Step4 from "./steps/Step4";

const Airdrop = () => {
  const [currentstep, setCurrentstep] = useState(1);
  const handleNextStep = () =>
    setCurrentstep((prev) => (prev < 4 ? prev + 1 : prev));
  const handlePrevStep = () =>
    setCurrentstep((prev) => (prev > 1 ? prev - 1 : prev));
  return (
    <div>
      <div className="text-6xl font-medium w-full pb-3">Flex</div>
      {currentstep === 1 && <Step1 />}
      {currentstep === 2 && <Step2 />}
      {currentstep === 3 && <Step3 />}
      {currentstep === 4 && <Step4 />}
      <div className="grid grid-cols-2 w-full gap-x-48 mt-12">
        {currentstep > 1 ? (
          <button
            onClick={handlePrevStep}
            className="flex items-center justify-center py-4 bg-neutral-900 rounded-lg space-x-16 text-center"
          >
            <i className="far fa-chevron-left"></i>
            <span className="text-lg">Go Back</span>
          </button>
        ) : (
          <div />
        )}
        <button
          onClick={handleNextStep}
          className="flex items-center justify-center py-4 bg-white rounded-lg space-x-16 text-black text-center"
        >
          <span className="text-lg">Select Recipients</span>
          <i className="far fa-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default Airdrop;
