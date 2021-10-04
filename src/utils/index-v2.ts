type Parts = (string | false | undefined)[];

export const buildClassName = (...parts: Parts) => {
  return parts.filter(Boolean).join(' ');
};
