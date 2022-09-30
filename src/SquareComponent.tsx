import { ICellRendererParams } from "ag-grid-community";
import React, { useState } from "react";
import styled from "styled-components";

interface SquareProps {
  isSelected?: boolean;
}

//  background-color: rgba(217, 217, 217, 1);
const Square = styled.div<SquareProps>`
  max-width: 2.2rem;
  height: 2.2rem;

  border: 2px solid rgba(250, 250, 250, 1);
  border-radius: 0.5rem;

  background-color: ${(props) => (props.isSelected ? "green" : "grey")};
`;

const SquareComponent = (props: ICellRendererParams) => {
  const [isSelected, setIsSelected] = useState(props.value);

  return (
    <Square
      onClick={() => setIsSelected(!isSelected)}
      isSelected={isSelected}
    ></Square>
  );
};

export default SquareComponent;
