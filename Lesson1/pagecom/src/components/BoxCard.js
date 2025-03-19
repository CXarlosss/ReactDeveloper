import React from "react";
import PropTypes from "prop-types";

export const BoxCard = ({ result = "default", children, setShow, show }) => {
  return (
    <div className={`box ${result}`}>
      {children}
      <button onClick={() => setShow(!show)} className="trigger">
        {show ? "Hide Box" : "Show Box"}
      </button>
    </div>
  );
};

// Validación de propiedades con PropTypes
BoxCard.propTypes = {
  result: PropTypes.string,
  children: PropTypes.node,
  setShow: PropTypes.func.isRequired, // Ahora es requerido
  show: PropTypes.bool.isRequired,
};
