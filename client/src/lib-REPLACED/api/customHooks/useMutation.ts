import { useReducer } from 'react';
import { server } from '../server';
import { MutationTuple } from './types';
import { reducer } from './reducers';

// From Scratch implementation of @apollo/react-hooks useMutation, only difference is how query is passed in
// This expects a string, while actual one expects a tree from gql``
export const useMutation = <TData = any, TVariables = any>(
  query: string
): MutationTuple<TData, TVariables> => {
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false,
  });

  const fetch = async (variables?: TVariables) => {
    try {
      dispatch({ type: 'FETCH' });

      const { data, errors } = await server.fetch<TData, TVariables>({
        query,
        variables,
      });

      if (errors && errors.length) {
        throw new Error(errors[0].message);
      }
      dispatch({ type: 'FETCH_SUCCESS', payload: data });
    } catch (err) {
      dispatch({ type: 'FETCH_ERROR' });
      throw console.error(err);
    }
  };

  return [fetch, state];
};
