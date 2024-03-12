import React from 'react';
import { MutatingDots } from 'react-loader-spinner';
import { LoaderContainer } from './Loader.styled';

const Loader = () => {
  return (
    <LoaderContainer>
      <MutatingDots
        visible={true}
        height="100"
        width="100"
        color="#fff"
        secondaryColor="#fff"
        radius="12.5"
        ariaLabel="mutating-dots-loading"
        wrapperStyle={{}}
        wrapperClass=""
      />
    </LoaderContainer>
  );
};

export default Loader;
