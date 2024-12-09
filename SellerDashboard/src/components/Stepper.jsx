import React, { useEffect, useState, useRef } from "react";
import { TruckOutlined } from "@ant-design/icons";
const Stepper = ({ steps = [] }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [margins, setMargins] = useState({
    left: 0,
    right: 0,
  });
  const progressRef = useRef([]);

  const handleNextStep = () => {
    if (activeStep < steps.length) {
      setActiveStep(activeStep + 1);
    }
    if (activeStep === steps.length) {
        setIsCompleted(true);
      setActiveStep((prevStep) => prevStep);
      console.log(isCompleted);
      
    }
  };

  const handlePreviousStep = () => {
    if (activeStep > 1) {
      setActiveStep(activeStep - 1);
    }
    if (activeStep === steps.length) {
        setIsCompleted(false);
      setActiveStep((prevStep) => prevStep);
      console.log(isCompleted);
      
    }
  };


  useEffect(() => {
    const leftMargin = progressRef.current[0]?.offsetWidth;
    const rightMargin = progressRef.current[steps.length - 1]?.offsetWidth;
    setMargins({
      left: leftMargin,
      right: rightMargin,
    });
    console.log(leftMargin, rightMargin);
  }, [progressRef, steps.length]);

  const ActiveComponent = steps[activeStep - 1]?.component;

  const progress = `${((activeStep - 1) / (steps.length - 1)) * 100}%`;

  if (!steps.length) {
    return <p>No steps</p>;
    
  }

  return (
    <>
      <div className="steps flex justify-between items-center relative">
        {steps.map((step, index) => (
          <div
            key={index}
            className="step z-10"
            ref={(el) => (progressRef.current[index] = el)}
          >
            <div
              className={`step-number w-[50px] h-[50px] rounded-full flex justify-center items-center ${
                activeStep > index + 1 || isCompleted ? "bg-[#E6F4FF] text-primary-base border border-primary-base"
                  : "bg-background-controlItemBgActive"
              } ${
                activeStep === index + 1 && "bg-primary-base text-white"
                 
              }
              `}
            >
              {activeStep > index + 1 || isCompleted ? (
                <span className="text-primary-base">&#10004;</span>
              ) : (
                step.id
              )}
            </div>

            <div className="step-title">{step.title}</div>
          </div>
        ))}
      </div>
      <div
        className="progress-bar absolute top-[25px] bg-gray-300 h-2"
        style={{
          width: `calc(100% - ${margins.left + margins.right}px)`,
          marginLeft: margins.left / 2,
          marginRight: margins.right / 2,
        }}
      >
        <div
          className="progress bg-primary-base h-2"
          style={{ width: progress }}
        ></div>
      </div>
      <ActiveComponent />
      <button
        onClick={handlePreviousStep}
        className="btn border  px-4 py-2 rounded mt-4"
      >
        Previous
      </button>
      <button
        onClick={handleNextStep}
        className="btn bg-primary-base text-white px-4 py-2 rounded mt-4"
      >
        {activeStep === steps.length ? "Finish" : "Next"}
     
      </button>
    </>
  );
};

export default Stepper;
