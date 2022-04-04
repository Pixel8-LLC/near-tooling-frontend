import { useContext } from "react";
import logo from "../../assets/img/logo.png";
import { ConnectContext } from "../../ConnectProvider";

const Header = () => {
  const { accountID, walletConnection, login, logout } =
    useContext(ConnectContext);

  return (
    <div className="flex items-center py-10 w-full">
      <div className="flex-1 flex items-center space-x-5">
        <div className="">
          <img src={logo} alt="Logo" />
        </div>
        <div className="w-px h-6 bg-white"></div>
        <div className="text-xl">Tooling</div>
      </div>
      <div className="">
        {walletConnection && walletConnection.isSignedIn() ? (
          <div className="flex items-center space-x-4">
            <div className="flex items-center font-medium space-x-4">
              <div className="rounded-full w-6 h-6 bg-neutral-300"></div>
              <div className="">{accountID}</div>
            </div>
            <button
              onClick={() => logout()}
              className="text-base font-medium bg-white text-black rounded-lg px-4 py-3"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <button
              onClick={() => login()}
              className="text-base font-medium bg-white text-black rounded-lg px-4 py-3"
            >
              Connect Wallet
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default Header;
