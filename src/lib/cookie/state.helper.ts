export const encodeState = (state: unknown) => {
  return Buffer.from(JSON.stringify(state)).toString('base64');
};

export const decodeState = (encodedState: string) => {
  return JSON.parse(Buffer.from(encodedState, 'base64').toString('ascii'));
};

export const validateEncodedState = (encodedState: string) => {
  return !!decodeState(encodedState);
};
