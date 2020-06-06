import React from 'react';

interface IProps {
  name: string;
  image: string;
  description: string;
}

export const HomeSection = ({ name, image, description }: IProps) => {
  return (
    <div>
      {name} | {description}
    </div>
  );
};
