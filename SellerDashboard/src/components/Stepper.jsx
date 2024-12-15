import React, { useEffect, useState, useRef,Fragment } from "react";
const Stepper = ({ steps = [] }) => {
  const [activeStep, setActiveStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
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
    // Detect screen size
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 640); // Define your mobile threshold here
    };

    // Check on initial render
    checkScreenSize();

    // Listen for screen resize events
    window.addEventListener('resize', checkScreenSize);
    
    // Cleanup the event listener on unmount
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      
      const leftMargin = progressRef.current[0]?.offsetWidth;
      const rightMargin = progressRef.current[steps.length - 1]?.offsetWidth;
      setMargins({
        left: leftMargin,
        right: rightMargin,
      });
      
      console.log(leftMargin, rightMargin);
    }
   else {
      const leftMargin = progressRef.current[0]?.offsetHeight/2;
      const rightMargin = progressRef.current[steps.length - 1]?.offsetHeight/2;
      setMargins({
        left: leftMargin,
        right: rightMargin,

      });
      
      console.log(leftMargin, rightMargin);
    }
  }, [progressRef, steps.length, isMobile]);

const ActiveComponent = steps[activeStep - 1]?.component;

  const progress = `${((activeStep - 1) / (steps.length - 1)) * 100}%`;

  if (!steps.length) {
    return <p>No steps</p>;
    
  }


  return (
    <>
      <div className="steps flex justify-between sm:items-center flex-col sm:flex-row   relative gap-xxl">
        {steps.map((step, index) => (
          <Fragment key={step.id}>
          
          <div
            key={step.id}
            className="step z-10 sm:h-[200px] lg:h-auto lg:block flex sm:flex-col gap-md sm:gap-xxl"
            ref={(el) => (progressRef.current[index] = el)}
                      >
            <div
              className={`step-number w-[50px] h-[50px] rounded-full flex justify-center items-center ${
                activeStep > index + 1 || isCompleted ? " text-primary-base border border-primary-base  bg-yellow-100"
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

            <div className="step-title sm:absolute w-[100px] sm:w-auto top-[50px]">{step.title}</div>
          </div>
          </Fragment>
        ))}
      </div>
      <div
        className={`progress-bar absolute left-[20px]	 top-4 sm:top-[25px] bg-gray-300 ${isMobile ?  "w-2":"h-2" } sm:block`}
        style={{
          ...(isMobile
            ? { height: `calc(100vh - ${margins.left+ margins.right}px )`, marginLeft: margins.left, marginRight: margins.right }
            : { width: `calc(100% - ${margins.left + margins.right}px)`, marginLeft: margins.left/2, marginRight: margins.right/2 }
          )
         
        }}
      >
        <div
          className="progress bg-primary-base h-2"
          style={{...(isMobile ? { height: progress } : { width: progress } ) }}
        ></div>
      </div>

      <div className="component" style={{minHeight:`calc(100vh - 220px)`}}>
      <ActiveComponent />
      </div>
      <div className="btn">

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
        </div>
    </>
  );
};

export default Stepper;
