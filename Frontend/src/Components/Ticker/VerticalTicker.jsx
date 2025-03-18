import React from "react";
import "./ind.css";

const VerticalTicker = () => {
  return (
    <div className="relative  flex items-center justify-center w-full h-full z-10 ">
      <div className="scroll-container m-3 w-100% flex items-center justify-center gap-3 h-full w-full">
        <div className="scroll" style={{ "--t": "20s" }}>
          <div>
            <span>Alegbra</span>
            <span>Geometry</span>
            <span>Calculus</span>
            <span>Trigonometry</span>
            <span>Statistics</span>
            <span>Probability</span>
            <span>Permutations</span>
          </div>
          <div aria-hidden="true">
            <span>Alegbra</span>
            <span>Geometry</span>
            <span>Calculus</span>
            <span>Trigonometry</span>
            <span>Statistics</span>
            <span>Probability</span>
            <span>Permutations</span>
          </div>
        </div>

        <div className="scroll" style={{ "--t": "20s" }}>
          <div>
            <span>Magnetism</span>
            <span>Electricity</span>
            <span>Optics</span>
            <span>Thermodynamics</span>
            <span>Motion</span>
            <span>Sound</span>
            <span>Light</span>
          </div>
          <div aria-hidden="true">
            <span>Magnetism</span>
            <span>Electricity</span>
            <span>Optics</span>
            <span>Thermodynamics</span>
            <span>Motion</span>
            <span>Sound</span>
            <span>Light</span>
          </div>
        </div>

        <div className="scroll" style={{ "--t": "20s" }}>
          <div>
            <span>Bases </span>
            <span>Acids</span>
            <span>Salts</span>
            <span>Periodic Table</span>
            <span>Atoms</span>
            <span>Reactions</span>
            <span>Elements</span>
          </div>
          <div aria-hidden="true">
            <span>Bases </span>
            <span>Acids</span>
            <span>Salts</span>
            <span>Periodic Table</span>
            <span>Atoms</span>
            <span>Reactions</span>
            <span>Elements</span>
          </div>
        </div>

        <div className="scroll" style={{ "--t": "20s" }}>
          <div>
            <span>Cells</span>
            <span>Genetics</span>
            <span>Evolution</span>
            <span>Ecology</span>
            <span>Biomes</span>
            <span>Human Body</span>
            <span>Nervous System</span>
          </div>
          <div aria-hidden="true">
            <span>Cells</span>
            <span>Genetics</span>
            <span>Evolution</span>
            <span>Ecology</span>
            <span>Biomes</span>
            <span>Human Body</span>
            <span>Nervous System</span>
          </div>
        </div>

        <div className="scroll" style={{ "--t": "20s" }}>
          <div>
            <span>Vocabulary</span>
            <span>Grammar</span>
            <span>Comprehension</span>
            <span>Composition</span>
            <span>Spelling</span>
            <span>Phonics</span>
            <span>Tenses</span>
          </div>
          <div aria-hidden="true">
            <span>Vocabulary</span>
            <span>Grammar</span>
            <span>Comprehension</span>
            <span>Composition</span>
            <span>Spelling</span>
            <span>Phonics</span>
            <span>Tenses</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerticalTicker;
