import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Get stats
    const { data: totalUsers } = await supabase
      .from('profiles')
      .select('id', { count: 'exact' })
      .eq('role', 'user')

    const { data: totalDeposits } = await supabase
      .from('transactions')
      .select('amount')
      .eq('type', 'deposit')
      .eq('status', 'approved')

    const { data: totalWithdrawals } = await supabase
      .from('transactions')
      .select('amount')
      .eq('type', 'withdrawal')
      .eq('status', 'approved')

    const { data: totalSends } = await supabase
      .from('transactions')
      .select('amount')
      .eq('type', 'send')
      .eq('status', 'approved')

    const stats = {
      totalUsers: totalUsers?.length || 0,
      totalDeposits: totalDeposits?.reduce((sum, t) => sum + Number(t.amount), 0) || 0,
      totalWithdrawals: totalWithdrawals?.reduce((sum, t) => sum + Number(t.amount), 0) || 0,
      totalSends: totalSends?.reduce((sum, t) => sum + Number(t.amount), 0) || 0,
    }

    return new Response(
      JSON.stringify(stats),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})