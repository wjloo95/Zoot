export interface State<TData> {
  data: TData | null;
  loading: boolean;
  error: boolean;
}

export interface QueryResult<TData> extends State<TData> {
  refetch: () => void;
}

export type MutationTuple<TData, TVariables> = [
  (variables?: TVariables | undefined) => Promise<void>,
  State<TData>
];

export type Action<TData> =
  | { type: 'FETCH' }
  | { type: 'FETCH_SUCCESS'; payload: TData }
  | { type: 'FETCH_ERROR' };
