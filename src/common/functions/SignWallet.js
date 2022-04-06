import jsonwebtoken from "jsonwebtoken";
import { KeyPair } from "near-api-js";

const SignWallet = async (body) => {
  let signature = new Uint8Array(body.signature);
  const keyPair = KeyPair.fromString(body.pk);

  const isValid = keyPair.verify(Buffer.from(body.account_id), signature);

  if (!isValid) {
    throw new Error("Invalid signature");
  }
  let user = {};
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

export default SignWallet;
