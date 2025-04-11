
export async function POST(req: Request) {
    const body = await req.json();
    console.log("[Test Webhook] Received:", JSON.stringify(body));
    return new Response("Received", { status: 200 });
  }
  
  export async function GET() {
    return Response.json({ message: 'Hello World' })
  }