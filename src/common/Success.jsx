import { useLocation, useNavigate } from "react-router-dom";
import q from "querystring";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let parsed = new URLSearchParams(location.search);
  const account_id = parsed.get("account_id");

  return <div>Success</div>;
};

export default Success;
