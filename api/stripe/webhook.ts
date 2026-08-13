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
  const sig = req.headers['stripe-signature'];
  let event: any;
  try {
    event = stripe.webhooks.constructEvent(buf, sig!, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    console.error('SIG FAIL', err.message);
    return res.status(400).send(err.message);
  }

  console.log('EVENT:', event.type);
  
  if (event.type === 'checkout.session.completed') {
    const s = event.data.object;
    const email = s.customer_details?.email || s.customer_email || 'noemail@test.com';
    const key = genKey();
    console.log('TRY INSERT', email, key);
    console.log('HAS ENV', !!process.env.SUPABASE_URL, !!process.env.SUPABASE_SERVICE_ROLE_KEY);
    
    const { data, error } = await supabase.from('licenses').insert({
      email,
      license_key: key,
      plan: 'basic',
      stripe_session_id: s.id,
      is_active: true
    }).select();

    if (error) {
      console.error('SUPABASE ERROR', error);
      return res.status(500).json({ error: error.message });
    }
    console.log('INSERT OK', data);
  }
  return res.status(200).json({ received: true });
}
