import React from "react";
import "./progressBar.scss";

interface ProgressBarProps {
  currentStep: number;
  totalSteps: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({currentStep, totalSteps}) => {
  const progressPercentage = (currentStep / totalSteps) * 100;

  return (
    <div className="progressBar">
      <div className="progress" style={{width: `${progressPercentage}%`}}></div>
    </div>
  );
};

export default ProgressBar;
