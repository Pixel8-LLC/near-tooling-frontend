import { useMemo } from "react";
import { useParams } from "react-router-dom";
import { ReactComponent as ShareFromSquare } from "../assets/img/share-from-square.svg";
import artworks from "../constants/artWorks";
import { ReactComponent as Eye } from "../assets/img/eye.svg";
import { ReactComponent as RedTimes } from "../assets/img/red-times.svg";
import { ReactComponent as GreenCheck } from "../assets/img/green-check.svg";
import { ReactComponent as GreyClock } from "../assets/img/grey-clock.svg";
import ReactTable from "../components/ReactTable";

const SingleNFT = () => {
  const { id } = useParams();
  const artwork = artworks.find((val) => val.id === +id) || {};

  const statusIcon = useMemo(
    () => ({
      Succeeded: <GreenCheck />,
      Failed: <RedTimes />,
      Pending: <GreyClock />,
    }),
    []
  );
  const columns = useMemo(
    () => [
      {
        Header: "Date",
        accessor: "date",
      },
      {
        Header: "From",
        accessor: "from",
      },

      {
        Header: "To",
        accessor: "to",
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
    <div>
      <div className="flex items-center">
        <div className="text-4xl font-medium">{artwork.title}</div>
        <div className="ml-auto">
          <button className="bg-zinc-800 py-4 px-10 flex items-center font-bold space-x-4 rounded-md">
            <ShareFromSquare />
            <div className="">Share</div>
          </button>
        </div>
      </div>
      <div className="flex space-x-14 mt-8">
        <div className="">
          <img
            src={artwork.image}
            alt={artwork.title}
            className="rounded-xl "
          />
          <div className="text-sm mt-4">
            <div className="">Royalty: {artwork.royalty}</div>
            <div className="">Current Floor: {artwork.currentFloor}</div>
            <div className="flex items-center space-x-4">
              <div className="">Rarity:</div> {artwork.rarity}
            </div>
          </div>
          <div className="mt-6 space-y-2.5">
            <button className="rounded-md text-sm bg-zinc-800 py-3 text-center w-full">
              Transfer NFT
            </button>
            <button className="rounded-md text-sm bg-zinc-800 py-3 text-center w-full">
              Burn NFT
            </button>
            <button className="rounded-md text-sm bg-zinc-800 py-3 text-center w-full">
              Other Functions
            </button>
          </div>
        </div>
        <div className="flex-1">
          <div className="text-xl font-bold">NFT History</div>
          <div className="text-xs">
            <ReactTable columns={columns} data={artwork.history} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleNFT;
