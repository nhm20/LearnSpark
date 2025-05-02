import React from "react";
import PricingCard from "./PricingCard";
import Details from "./Details";

const Sidebar = ({ course, setError }) => {
  return (
    <>
      <div className="w-full lg:w-1/3 p-2">
        <div className="lg:sticky lg:top-8 space-y-6">
          <PricingCard
            course={course}
            setError={setError}
          />
          <Details course={course} />
        </div>
      </div>
    </>
  );
};

export default Sidebar;
