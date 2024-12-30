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

    const { action, bankId, userId, data } = await req.json()

    switch (action) {
      case 'assignUser': {
        const { error } = await supabase
          .from('bank_assignments')
          .insert({
            bank_id: bankId,
            user_id: userId
          })

        if (error) throw error
        break
      }

      case 'removeUser': {
        const { error } = await supabase
          .from('bank_assignments')
          .delete()
          .eq('bank_id', bankId)
          .eq('user_id', userId)

        if (error) throw error
        break
      }

      case 'createBank': {
        const { name } = data
        const { error } = await supabase
          .from('banks')
          .insert({ name })

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