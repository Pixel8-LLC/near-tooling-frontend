import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo } from "react";
import { connect, KeyPair, keyStores } from "near-api-js";
import jsonwebtoken from "jsonwebtoken";

const Success = () => {
  const navigate = useNavigate();
  const location = useLocation();
  let parsed = useMemo(
    () => new URLSearchParams(location.search),
    [location.search],
  );
  const account_id = parsed.get("account_id");

  const SignWallet = async (body) => {
    let signature = new Uint8Array(body.signature);
    const keyPair = KeyPair.fromString(body.pk);

    const isValid = keyPair.verify(Buffer.from(body.account_id), signature);

    if (!isValid) {
      throw new Error("Invalid signature");
    }
    let user = {};
    // let user = await User.query().findOne({
    //   near_account_id: body.account_id,
    //   is_deleted: false,
    // });
    // if (!user) {
    //   user = await User.query().insert({
    //     username: body.account_id,
    //   });
    // }
    // const cards = await getUserSupportCard({ userId: body.account_id });
    let token = jsonwebtoken.sign(
      {
        near_account_id: body.account_id,
        near_public_key: body.near_public_key,
        id: user.id,
      },
      "secret",
    );
    return {
      success: true,
      token,
    };
  };

  useEffect(() => {
    const generateToken = async () => {
      try {
        let net =
          process.env.REACT_APP_CONTEXT === "production"
            ? "mainnet"
            : "testnet";
        const config = {
          networkId: net,
          keyStore: new keyStores.BrowserLocalStorageKeyStore(), // optional if not signing transactions
          nodeUrl: `https://rpc.${net}.near.org`,
          walletUrl: `https://wallet.${net}.near.org`,
          helperUrl: `https://helper.${net}.near.org`,
          explorerUrl: `https://explorer.${net}.near.org`,
          appKeyPrefix: "nt_app",
        };
        const near = await connect(config);
        let pk =
          near.connection.signer.keyStore.localStorage[
            `near-api-js:keystore:${account_id}:${net}`
          ];
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
