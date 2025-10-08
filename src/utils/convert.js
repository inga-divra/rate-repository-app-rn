const convert = (value) => {
  if (value >= 1000000) {
    return (value / 1000000).toFixed(1).replace('.0', '') + 'M';
  } else if (value >= 1000) {
    return (value / 1000).toFixed(1).replace('.0', '') + 'K';
  }
  return value;
};

export default convert;
