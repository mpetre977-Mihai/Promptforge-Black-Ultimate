import Stripe from 'stripe';
import { createClient } from '@supabase/supabase-js';
import { Resend } from 'resend';

export const config = { api: { bodyParser: false } };

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2023-10-16' as any });
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
const resend = new Resend(process.env.RESEND_API_KEY!);

function genKey() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ0123456789';
  let s = '';
  for (let i = 0; i < 12; i++) s += chars[Math.floor(Math.random() * chars.length)];
  return `PF-${s.slice(0,4)}-${s.slice(4,8)}-${s.slice(8,12)}`;
}

const PACKS: any = {
  basic: { name: 'Basic', subject: 'Licenta PromptForge Basic e gata! 🎉', thanks: 'Multumim ca ai ales PromptForge Basic! Ai acces la 1000+ prompturi premium.' },
  pro: { name: 'Pro', subject: 'Licenta PromptForge Pro e gata! 🚀', thanks: 'Multumim ca ai ales PromptForge Pro! Acces complet + update-uri viitoare.' },
  agency: { name: 'Agency', subject: 'Licenta PromptForge Agency e gata! 🏆', thanks: 'Multumim ca ai ales PromptForge Agency! Licenta echipa + drepturi comerciale.' },
};

export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') return res.status(405).end();
  const chunks: any[] = []; for await (const c of req) chunks.push(c);
  const buf = Buffer.concat(chunks);
  const event = stripe.webhooks.constructEvent(buf, req.headers['stripe-signature']!, process.env.STRIPE_WEBHOOK_SECRET!);

  if (event.type === 'checkout.session.completed') {
    const s: any = event.data.object;
    const email = s.customer_details?.email || s.customer_email;
    const plan = (s.metadata?.plan || 'basic').toLowerCase();
    const pack = PACKS[plan] || PACKS.basic;
    const licenseKey = genKey();

    await supabase.from('licenses').upsert({
      email, license_key: licenseKey, plan, stripe_session_id: s.id, is_active: true
    }, { onConflict: 'email' });

    try {
      await resend.emails.send({
        from: process.env.FROM_EMAIL!,
        to: email,
        subject: pack.subject,
        html: `
          <h2>${pack.thanks}</h2>
          <p><b>Cheia ta unica:</b></p>
          <h1 style="background:#000;color:#fff;padding:12px;letter-spacing:3px;text-align:center;">${licenseKey}</h1>
          <p>Pachet: <b>${pack.name.toUpperCase()}</b></p>
          <p>Activeaza aici: https://promptforge-black-ultimate.vercel.app/activate?key=${licenseKey}</p>
          <p>PDF-ul pentru ${pack.name} il adaugam imediat dupa test.</p>
          <br><p>Echipa PromptForge</p>
        `,
      });
    } catch (e) { console.error('Resend error', e); }
  }
  return res.status(200).json({ received: true });
}
