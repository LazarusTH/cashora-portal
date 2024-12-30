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

    const { action, userId, data } = await req.json()

    switch (action) {
      case 'updateLimits': {
        const { type, period, amount } = data
        const { error } = await supabase
          .from('user_limits')
          .upsert({
            user_id: userId,
            type,
            period,
            amount
          })

        if (error) throw error
        break
      }

      case 'updateFees': {
        const { fee_type, fee_value } = data
        const { error } = await supabase
          .from('user_fees')
          .upsert({
            user_id: userId,
            fee_type,
            fee_value
          })

        if (error) throw error
        break
      }

      default:
        throw new Error('Invalid action')
    }

    return new Response(
      JSON.stringify({ success: true }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    )
  }
})