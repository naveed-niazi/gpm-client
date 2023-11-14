export const generateRule = (fieldName, isRequired = true) => {
  return [
    {
      required: isRequired,
      message: `'${fieldName}' required!`,
    },
  ];
};
