// LoadingOverlay.jsx
import React from 'react';
import { 
  FileText, 
  LayoutGrid, 
  ListChecks,
  Files,
  CheckCircle 
} from 'lucide-react';
import './LoadingOverlay.css';

const LoadingOverlay = ({ loadingState }) => {
  const [completedSteps, setCompletedSteps] = React.useState(0);
  
  const steps = [
    {
      message: "Initializing exam paper...",
      Icon: FileText,
      color: "#4f46e5" // indigo
    },
    {
      message: "Configuring sections...",
      Icon: LayoutGrid,
      color: "#7c3aed" // purple
    },
    {
      message: "Adding questions...",
      Icon: ListChecks,
      color: "#0ea5e9" // sky
    },
    {
      message: "Compiling exam structure...",
      Icon: Files,
      color: "#0d9488" // teal
    },
    {
      message: "Finishing up...",
      Icon: CheckCircle,
      color: "#22c55e" // green
    }
  ];

  React.useEffect(() => {
    let interval;
    
    if (loadingState) {
      interval = setInterval(() => {
        setCompletedSteps(prev => {
          if (prev < steps.length - 1) return prev + 1;
          return prev;
        });
      }, 2000);
    } else {
      setCompletedSteps(0);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [loadingState]);

  if (!loadingState) return null;

  return (
    <div className="loading-overlay">
      <div className="loading-card">
        {steps.map((step, index) => {
          const { Icon, message, color } = step;
          const isActive = index === completedSteps;
          const isCompleted = index < completedSteps;
          
          return (
            <div 
              key={index} 
              className={`step-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
            >
              <div className="icon-wrapper" style={{ backgroundColor: color }}>
                <Icon className="step-icon" size={24} color="white" />
              </div>
              <p className="step-message">{message}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoadingOverlay;