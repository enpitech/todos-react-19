import { Link, useNavigation } from "react-router";
import Spinner from "~/components/Spinner";

export default function Welcome() {
  const navigation = useNavigation();

  if (navigation.state === "loading") {
    return <div>Loading...</div>;
  }

  return <Link to="/home">Go Home</Link>;
}
