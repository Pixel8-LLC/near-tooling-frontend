import { useMemo, useState } from "react";
import { ReactComponent as AngleRight } from "../assets/img/angle-right.svg";
import { ReactComponent as FileExport } from "../assets/img/file-export.svg";
import { ReactComponent as Eye } from "../assets/img/eye.svg";
import clipboard from "../assets/img/clipboard.svg";
import link from "../assets/img/link.svg";
import { ReactComponent as RedTimes } from "../assets/img/red-times.svg";
import { ReactComponent as GreenCheck } from "../assets/img/green-check.svg";
import { ReactComponent as GreyClock } from "../assets/img/grey-clock.svg";
import ReactTable from "../components/ReactTable";

const Fans = () => {
  const [contractAddress, setContractAddress] = useState("");
  const statusIcon = useMemo(
    () => ({
      Succeeded: <GreenCheck />,
      Failed: <RedTimes />,
      Pending: <GreyClock />,
    }),
    []
  );
  const data = useMemo(
    () => [
      {
        date: "2/27/22",
        minter: "pixel8llc.near",
        no_of_mints: 2,
        type: "Transfer",
        explorer_link: "",
        status: "Succeeded",
      },
      {
        date: "2/27/22",
        minter: "pixel8llc.near",
        no_of_mints: 2,
        type: "Transfer",
        explorer_link: "",
        status: "Failed",
      },
      {
        date: "2/27/22",
        minter: "pixel8llc.near",
        no_of_mints: 1,
        type: "Mint",
        explorer_link: "",
        status: "Pending",
      },
      {
        date: "2/27/22",
        minter: "pixel8llc.near",
        no_of_mints: 1,
        type: "Transfer",
        explorer_link: "",
        status: "Succeeded",
      },
      {
        date: "2/27/22",
        minter: "pixel8llc.near",
        no_of_mints: 0,
        type: "Transfer",
        explorer_link: "",
        status: "Failed",
      },
      {
        date: "2/27/22",
        minter: "pixel8llc.near",
        no_of_mints: 2,
        type: "Mint",
        explorer_link: "",
        status: "Pending",
      },
    ],
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "Minter",
        accessor: "minter",
      },
      {
        Header: "Number of mints",
        accessor: "no_of_mints",
      },
      {
        Header: "Type",
        accessor: "type",
      },
      {
        Header: "Explorer Link",
        accessor: "explorer_link",
        Cell: ({ row, value }) => (
          <div className="flex items-center space-x-2">
            <div className="">{statusIcon[row.original.status] || ""}</div>
            <div className="w-16">{row.original.status || "N/A"}</div>
            <a href="#a">
              <i className="fas fa-link"></i>
            </a>
            <button>
              <i className="fas fa-clipboard"></i>
            </button>
          </div>
        ),
      },
      {
        Header: () => <div className="text-right">Action</div>,
        id: "action",
        Cell: () => (
          <div className="flex justify-end">
            <button className="mr-2">
              <Eye />
            </button>
          </div>
        ),
      },
    ],
    [statusIcon]
  );
  return (
    <div className="pb-10">
      <div className="text-6xl font-medium w-full pb-3">Flex</div>
      <div className="flex items-end space-x-6 text-lg mt-6">
        <div className="flex-1">
          <div className="text-lg">Enter minting contract address</div>
          <div className="mt-4 text-lg rounded-lg w-11/12 border flex items-center">
            <input
              value={contractAddress}
              onChange={(e) => setContractAddress(e.target.value)}
              className="bg-black flex-1 rounded-l-lg py-2.5 px-5 border-r"
              placeholder="nft1.example.near"
            />
            <button className="py-2.5 px-4">
              <AngleRight />
            </button>
          </div>
        </div>
        <div className="ml-auto">
          <button className="bg-zinc-800 py-4 text-base px-10 flex items-center space-x-4 rounded-md">
            <FileExport />
            <div className="">Export Fans</div>
          </button>
        </div>
      </div>

      <div className="text-xs mt-10">
        <ReactTable data={data} columns={columns} />
      </div>
    </div>
  );
};

export default Fans;
