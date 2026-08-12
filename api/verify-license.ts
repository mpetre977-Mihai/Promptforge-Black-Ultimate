import { createClient } from '@supabase/supabase-js';
const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

export default async function handler(req:any,res:any){
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Methods','POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers','Content-Type');
  if(req.method==='OPTIONS') return res.status(200).end();
  if(req.method!=='POST') return res.status(405).json({valid:false});
  const {email, license_key} = req.body;
  if(!email || !license_key) return res.status(400).json({valid:false});
  const {data} = await supabase.from('licenses').select('plan').eq('email',email).eq('license_key',license_key).eq('is_active',true).single();
  if(data) return res.status(200).json({valid:true, plan:data.plan});
  return res.status(200).json({valid:false});
}
