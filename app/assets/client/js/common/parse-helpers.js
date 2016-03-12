export default class ParseHelpers { }

export let orNull = ParseHelpers.orNull = (func) => {
  return (input) => {
    if (input === null || input === 'null') {
      return null;
    }

    return func(input);
  };
};

export let parseAngle = ParseHelpers.parseAngle = (input) => {
  return parseFloat(input) * Math.PI / 180.0;
};
