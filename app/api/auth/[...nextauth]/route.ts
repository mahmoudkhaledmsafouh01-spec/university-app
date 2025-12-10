export { GET, POST } from "@/lib/auth";

// Ensure the credentials provider runs on the Node.js runtime so native bcrypt works
export const runtime = "nodejs";