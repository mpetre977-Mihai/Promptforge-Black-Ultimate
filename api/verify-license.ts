import { createClient } from '@supabase/supabase-js';

export default async function handler(req: any, res: any) {
  const key = (req.query.key as string) || req.body?.key;
  if (!key) return res.status(400).json({ valid: false });

  const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);
  const { data } = await supabase.from('licenses').select('*').eq('license_key', key).single();

  if (!data) return res.status(404).json({ valid: false });
  return res.status(200).json({ valid: true, plan: data.plan, email: data.email, is_active: data.is_active });
}
