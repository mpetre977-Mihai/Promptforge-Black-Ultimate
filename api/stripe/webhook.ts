import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';

export const config = {
  api: { bodyParser: false }
}

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' as any });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

function genKey(plan: string) {
  const c = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  let s = '';
  for(let i=0;i<12;i++) s+=c[Math.floor(Math.random()*c.length)];
  return `PF-${plan.toUpperCase()}-${s.slice(0,4)}-${s.slice(4,8)}-${s.slice(8,12)}`;
}

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).send('Method not allowed');
  const sig = req.headers['stripe-signature'];
  let event;
  try {
    const chunks: any[] = [];
    for await (const chunk of req) chunks.push(chunk);
    const buf = Buffer.concat(chunks);
    event = stripe.webhooks.constructEvent(buf, sig, process.env.STRIPE_WEBHOOK_SECRET!);
  } catch (err: any) {
    return res.status(400).send(`Webhook Error: ${err.message}`);
  }
  if (event.type === 'checkout.session.completed') {
    const session: any = event.data.object;
    const email = session.customer_details?.email || session.customer_email || 'test@test.com';
    const sessionId = session.id;
    let plan = (session.metadata?.plan || 'basic').toLowerCase();
    let licenseKey = genKey(plan);
    let tries = 0;
    while (tries < 5) {
      const { data } = await supabase.from('licenses').select('id').eq('license_key', licenseKey).single();
      if (!data) break;
      licenseKey = genKey(plan);
      tries++;
    }
    const { error } = await supabase.from('licenses').upsert({ email, license_key: licenseKey, plan, stripe_session_id: sessionId, is_active: true }, { onConflict: 'email' });
    if (error) {
      console.error('SUPABASE INSERT ERROR:', error);
      return res.status(500).json({ error: error.message });
    }
  }
  return res.status(200).json({ received: true });
}
