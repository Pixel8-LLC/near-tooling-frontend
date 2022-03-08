import logo from "../../assets/img/logo.png";

const Header = () => {
  return (
    <div className="flex items-center py-10 space-x-5 w-full">
      <div className="">
        <img src={logo} alt="Logo" />
      </div>
      <div className="w-px h-6 bg-white"></div>
      <div className="text-xl">Tooling</div>
    </div>
  );
};

export default Header;
