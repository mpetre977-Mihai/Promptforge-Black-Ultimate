import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' as any });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

function genKey() {
  const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  let s = '';
  for(let i=0;i<12;i++) s+=c[Math.floor(Math.random()*c.length)];
  return `PF-BASIC-${s.slice(0,4)}-${s.slice(4,8)}-${s.slice(8,12)}`;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();
  const chunks: any[] = [];
  for await (const chunk of req) chunks.push(chunk);
  const buf = Buffer.concat(chunks);
  const event = stripe.webhooks.constructEvent(buf, req.headers['stripe-signature']!, process.env.STRIPE_WEBHOOK_SECRET!);
  
  if (event.type === 'checkout.session.completed') {
    const s: any = event.data.object;
    const email = s.customer_details?.email || s.customer_email;
    if (email) {
      await supabase.from('licenses').upsert({
        email,
        license_key: genKey(),
        plan: 'basic',
        stripe_session_id: s.id,
        is_active: true
      }, { onConflict: 'email' });
    }
  }
  return res.status(200).json({ received: true });
}
