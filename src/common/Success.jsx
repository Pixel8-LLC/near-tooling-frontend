import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { connect, KeyPair } from "near-api-js";
import SignWallet from "./functions/SignWallet";
import { config, net } from "../constants";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let parsed = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const account_id = parsed.get("account_id");

  useEffect(() => {
    const generateToken = async () => {
      try {
        const near = await connect(config);
        let pk =
          near.connection.signer.keyStore.localStorage[
            `near-api-js:keystore:${account_id}:${net}`
          ];
        console.log(pk);
        const keyPair = KeyPair.fromString(pk);

        const signedObj = keyPair.sign(Buffer.from(account_id));

        let signature = Array.from(signedObj.signature);
        const sign = await SignWallet({
          account_id: parsed.get("account_id"),
          near_public_key: parsed.get("public_key"),
          signature: signature,
          pk,
        });
        console.log(sign);
        if (sign.success) {
          localStorage.setItem("nt_token", sign.token);
          navigate("/");
          window.location.reload();
        }
      } catch (e) {
        console.error(e);
      }
    };

    if (account_id) {
      setTimeout(() => {
        generateToken();
      }, 500);
    }
  }, [account_id, navigate, parsed]);

  return <div>Redirecting....</div>;
};

export default Success;
