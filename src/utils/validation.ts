export const getMissingFields = (
  req: any,
  model: { [key: string]: any }
): string[] => {
  return Object.entries(model)
    .filter(([_, prop]) => prop.required)
    .map(([propName, _]) => propName)
    .filter((field) => !req.body[field] && req.body[field] !== 0);
};
