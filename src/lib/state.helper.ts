type State = {
  resumeUrl: string;
};

export const encodeState = (state: State): string => {
  return Buffer.from(JSON.stringify(state)).toString('base64');
};

export const decodeState = (encodedState: string): State | null => {
  try {
    const state = JSON.parse(
      Buffer.from(encodedState, 'base64').toString('utf8'),
    );

    if (typeof state.resumeUrl !== 'string') {
      return null;
    }

    return state;
  } catch (e) {
    return null;
  }
};
