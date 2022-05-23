export type useFetchType = [
  {
    response: { [key: string]: string } | null;
    isLoading: boolean;
    error: string | null;
  },
  (options: { [key: string]: string }) => void
];
