import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL || "", { ssl: "require" });

async function listInvoices() {
  try {
    const data = await sql`
      SELECT invoices.amount, customers.name
      FROM invoices
      JOIN customers ON invoices.customer_id = customers.id
      WHERE invoices.amount = 666;
    `;
    return data;
  } catch (error) {
    console.error("Error fetching invoices:", error);
    throw new Error("Failed to fetch invoices.");
  }
}

export async function GET() {
  try {
    const invoices = await listInvoices();
    return Response.json(invoices);
  } catch (_) {
    // return Response.json({ error: error.message }, { status: 500 });
  }
}
