
import React, {useState} from 'react';

function App() {

  // This variable holds all the instructions to follow through the SQ3R format
  const steps = ["SURVEY: Skim the text focusing on the main ideas (chapters, headers, diagrams, models etc.", 
                 "QUESTION: Formulate questions based on the observed main ideas.", 
                 "READ: Read through the text finding answers to your questions.", 
                 "RECITE: Recite what you learned in your own words", 
                 "REVIEW: Review the material by reapeating back to yourself the purpose of the passage."];

  // This is the value of the current step
  const [currentStep, setCurrentStep] = useState(0);

  // If the button is clicked this goes to the next prompt
  const handleNextStep = () => {
    setCurrentStep((currentStep) => (currentStep + 1) % 5);
  };
  

  return (
    <div className = "fixed bottom-0 left-0 bg-gray-200 w-3/5 h-24 p-5 border border-gray-300 flex flex-col rounded-md">
      <h1 className = "text-center">{steps[currentStep]}</h1>
      <button type = "button" className = "mt-1 p-1 bg-gray-700 text-white rounded-md hover:bg-gray-800" onClick = {() => handleNextStep()}>Next</button>
    </div>
    
  );
}

export default App;
