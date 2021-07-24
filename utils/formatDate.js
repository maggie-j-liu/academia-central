const formatDate = (date) => {
  const dateToString = date.toString();
  const splitted = dateToString.split(" ");
  return `${splitted[1]} ${splitted[2]}, ${splitted[3]}`;
};

export default formatDate;
