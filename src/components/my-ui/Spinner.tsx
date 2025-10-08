export default function Spinner() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div
        className="w-16 h-16 border-8 border-t-8 border-gray-300 border-t-[#4f46e5] rounded-full animate-spin"
        role="status"
      ></div>
    </div>
  );
}
