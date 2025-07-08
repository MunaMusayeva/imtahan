import { createClient } from "@/utils/supabase/server";

export async function GET(request, { params }) {
  const supabase = createClient();
  const { id } = params;
  const { data, error } = await supabase
    .from("blogs")
    .select("*,authors(*),categories(id,name)")
    .eq("id", id)
    .single();

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }

  return new Response(JSON.stringify(data), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
}