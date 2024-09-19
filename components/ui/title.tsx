import React from 'react';

type TitleSize = 'xs' | 'sm' | 'md' | 'lg' | 'xl' ;

interface Props {
  size?: TitleSize;
  className?: string;
  text: string;
}

export const Title: React.FC<Props> = ({ text, size = 'lg', className='' }) => {
  const mapTagBySize = {
    xs: 'h5',
    sm: 'h4',
    md: 'h3',
    lg: 'h2',
    xl: 'h1',
  } as const;
  
  const mapClassNameBySize = {
    xs: 'title_h5',
    sm: 'title_h4',
    md: 'title_h3',
    lg: 'title_h2',
    xl: 'title_h1',
  } as const;
  
  return React.createElement(
    mapTagBySize[size],
    { className: `main_title ${mapClassNameBySize[size]} ${className}` },
    text,
  );
};

// <Title size='xl' text='Title' className='custom_class'/>