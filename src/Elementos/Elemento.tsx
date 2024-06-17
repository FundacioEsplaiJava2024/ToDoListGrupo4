import React from 'react';

export interface ElementoProps {
  id: number;
  title: string;
}

const Elemento: React.FC<ElementoProps> = ({ id, title }) => {
  return <li>{title}</li>;
};

export default Elemento;