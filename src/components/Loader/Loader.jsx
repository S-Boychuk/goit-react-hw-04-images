import { Hearts } from 'react-loader-spinner';

const Loader = () => {
  const wrapperStyles = {
    display: 'flex',
    justifyContent: 'center',
  };
  return (
    <Hearts
      margin="0 auto"
      height="80"
      width="80"
      color="#3f51b5"
      ariaLabel="hearts-loading"
      wrapperStyle={wrapperStyles}
      visible={true}
    />
  );
};

export default Loader;
