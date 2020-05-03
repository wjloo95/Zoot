import StripeClient from 'stripe';

const client = new StripeClient(`${process.env.S_SECRET_KEY}`, {
  apiVersion: '2020-03-02',
  typescript: true,
});

export const Stripe = {
  connect: async (code: string) => {},
};
