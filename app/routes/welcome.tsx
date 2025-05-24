import { Link, useNavigation } from "react-router";
import Spinner from "~/components/Spinner";

export default function Welcome() {
  const navigation = useNavigation();

  const loading = navigation.state === "loading";

  return (
    <button>
      <Link to="/home">{loading ? <Spinner /> : "Show Todos"}</Link>
    </button>
  );
}
