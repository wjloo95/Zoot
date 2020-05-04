import StripeClient from 'stripe';

const client = new StripeClient(`${process.env.S_SECRET_KEY}`, {
  apiVersion: '2020-03-02',
  typescript: true,
});

export const Stripe = {
  connect: async (code: string) => {
    const res = await client.oauth.token({
      grant_type: 'authorization_code',
      code,
    });
    return res;
  },
  charge: async (amount: number, source: string, stripeAccount: string) => {
    const res = await client.charges.create(
      {
        amount,
        currency: 'usd',
        source,
        application_fee_amount: Math.round(amount * 0.05),
      },
      { stripe_account: stripeAccount }
    );

    if (res.status !== 'succeeded') {
      throw new Error('Failed to create charge with Stripe');
    }
  },
};
