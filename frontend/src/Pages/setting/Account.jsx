export default function Account() {
  return (
    <div className="w-full flex flex-col gap-y-8 pt-10 ml-32">
      <div className="bg-[#D9D9D9] text-[#e2fbe4] bg-opacity-10 rounded-3xl w-[700px]  p-10">
        <h1 className="text-2xl">Account</h1>
        <div className="mt-5 flex justify-between">
          <h4 className="text-md">Delete your account</h4>
          <button className="px-2 py-1 bg-red-800 rounded-md hover:bg-red-900 shadow-xl">
            Delete Account
          </button>
        </div>
      </div>
    </div>
  );
}
