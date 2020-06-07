export interface LogInArgs {
  input: { code: string; email: string; password: string } | null;
}
export interface RegisterArgs {
  input: { name: string; email: string; password: string };
}

export interface ConnectStripeArgs {
  input: { code: string };
}
