import './Loading.css'

export default function Loading () {
  return (
    <div className="grid place-items-center h-screen bg-black bg-opacity-70">
        <div className="loader w-12 h-12 mt-2 border-white border-solid border-4 rounded-full" />
    </div>
  );
}