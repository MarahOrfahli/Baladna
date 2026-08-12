import { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAreaChart,
  faBuildingColumns,
  faCircleCheck,
  faHourglassEnd
} from "@fortawesome/free-solid-svg-icons";

const StaticCard = ({ type, statusNumber, description }) => {
  const [count, setCount] = useState(0),
   [hasStarted, setHasStarted] = useState(false),
   elementRef = useRef(null),
   duration = 1500

   useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          setHasStarted(true);
        }
      },
      { threshold: 0.5 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }
  }, [hasStarted]);

  useEffect(() => {
    if (!hasStarted) return;

    let start = 0;
    const increment = statusNumber / (duration / 16);
    
    const timer = setInterval(() => {
      start += increment;
      if (start >= statusNumber) {
        setCount(statusNumber);
        clearInterval(timer);
      } else {
        setCount(Math.ceil(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [hasStarted, statusNumber, duration]);

  const formattedNumber = new Intl.NumberFormat().format(count);


  function checkType(type_icon) {
    return type_icon == "resolved_reports" ? (
      <FontAwesomeIcon icon={faCircleCheck} />
    ) : type_icon == "pending_reports" ? (
      <FontAwesomeIcon icon={faHourglassEnd} />
    ) : type_icon == "active_areas" ? (
      <FontAwesomeIcon icon={faAreaChart} />
    ) : type_icon == "active_agencies" ? (
      <FontAwesomeIcon icon={faBuildingColumns} />
    ) : (
      ""
    );
  }
  return (
    <div ref={elementRef} className="relative overflow-hidden text-[#d8d4d4] p-6 text-center rounded-[1.3rem] shadow-[0.1px_1px_2px_1px_#9b9595] h-50">
      <div className="flex flex-col justify-around h-full">
        <div className="text-4xl">
          <span>{checkType(type)}</span>
        </div>
        <div className="pt-2">{formattedNumber}</div>
        <div className="text-xl">{description}</div>
      </div>
    </div>
  );
};

export default StaticCard;
