import { createClient } from 'npm:@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Client-Info, Apikey',
};

Deno.serve(async (req: Request) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    );

    // Check if demo user already exists
    const { data: existingUser } = await supabaseAdmin.auth.admin.listUsers();
    const demoUserExists = existingUser?.users.some(u => u.email === 'demo@client.com');

    if (demoUserExists) {
      return new Response(
        JSON.stringify({ message: 'Demo user already exists' }),
        {
          status: 200,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        }
      );
    }

    // Create demo user
    const { data: user, error: userError } = await supabaseAdmin.auth.admin.createUser({
      email: 'demo@client.com',
      password: 'demo123',
      email_confirm: true,
    });

    if (userError) {
      throw userError;
    }

    return new Response(
      JSON.stringify({ message: 'Demo user created successfully', user }),
      {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});