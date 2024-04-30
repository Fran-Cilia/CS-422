import React, { useState } from "react";

const UserGuide = () => {
  const [currentStep, setCurrentStep] = useState<number>(0);

  const steps = [
    "SURVEY: Skim the text focusing on the main ideas (chapters, headers, diagrams, models etc.",
    "QUESTION: Formulate questions based on the observed main ideas.",
    "READ: Read through the text finding answers to your questions.",
    "RECITE: Recite what you learned in your own words",
    "REVIEW: Review the material by reapeating back to yourself the purpose of the passage.",
  ];

  return (
    <div className="border-[1px] border-[#e4e4e7] rounded-lg my-8 p-4">
      <h1 className="border-[1.5px] border-[#e4e4e7] rounded-lg p-2 w-8 h-8 flex flex-row items-center justify-center font-medium text-black text-lg">
        {currentStep + 1}
      </h1>
      <h1 className="my-4 font-semibold">{steps[currentStep]}</h1>
      <div className="flex flex-row items-center justify-between">
        <div></div>
        <div className="flex flex-row items-center gap-x-2">
          <button
            className="border-[1px] border-[#e4e4e7] rounded-md px-2 py-1"
            onClick={() => {
              if (currentStep > 0) {
                setCurrentStep(currentStep - 1);
              }
            }}
          >
            <h1 className="text-sm font-medium">← Previous Step</h1>
          </button>
          <button
            className="border-[1px] border-[#e4e4e7] rounded-md px-2 py-1"
            onClick={() => {
              if (currentStep < steps.length - 1) {
                setCurrentStep(currentStep + 1);
              }
            }}
          >
            <h1 className="text-sm font-medium">Next Step →</h1>
          </button>
        </div>
      </div>
    </div>
  );
};

export { UserGuide };
