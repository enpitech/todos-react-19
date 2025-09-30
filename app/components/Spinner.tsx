import { LoaderCircle } from "lucide-react";

export default function Spinner({ size = "small", color = "primary" }) {
  return <LoaderCircle className="animate-spin" />;
}
