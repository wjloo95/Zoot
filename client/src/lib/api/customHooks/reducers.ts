import { State, Action } from './types';

export const reducer = <TData>() => (
  state: State<TData>,
  action: Action<TData>
) => {
  switch (action.type) {
    case 'FETCH':
      return { ...state, loading: true };
    case 'FETCH_SUCCESS':
      return {
        ...state,
        data: action.payload,
        loading: false,
        error: false,
      };
    case 'FETCH_ERROR':
      return { ...state, loading: false, error: true };
    default:
      throw new Error();
  }
};
