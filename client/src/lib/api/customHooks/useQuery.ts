import { useEffect, useCallback, useReducer } from 'react';
import { server } from '../server';
import { QueryResult } from './types';
import { reducer } from './reducers';

export const useQuery = <TData = any>(query: string): QueryResult<TData> => {
  const fetchReducer = reducer<TData>();
  const [state, dispatch] = useReducer(fetchReducer, {
    data: null,
    loading: false,
    error: false,
  });

  const fetch = useCallback(() => {
    const fetchApi = async () => {
      try {
        dispatch({ type: 'FETCH' });

        const { data, errors } = await server.fetch<TData>({
          query,
        });

        if (errors && errors.length) {
          throw new Error(errors[0].message);
        }
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_ERROR' });
        throw console.error(error);
      }
    };

    fetchApi();
  }, [query]);

  useEffect(() => {
    fetch();
  }, [fetch]);

  return { ...state, refetch: fetch };
};
