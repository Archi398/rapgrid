export default function GridLoading({ loading }) {
  return (
    <div className={loading}>
      <div className="border border-blue-300 shadow rounded-md p-4">
        <div className="animate-pulse grid grid-cols-4 gap-4 text-white">
          <div className=""></div>
          <div className="w-20 h-6 md:w-40 md:h-12 bg-slate-700 rounded-md"></div>
          <div className="w-20 h-6 md:w-40 md:h-12 bg-slate-700 rounded-md"></div>
          <div className="w-20 h-6 md:w-40 md:h-12 bg-slate-700 rounded-md"></div>
          <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
          <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
          <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
          <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
          <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
          <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
          <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
          <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
          <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
          <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
          <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
          <div className="size-20 md:size-40 bg-slate-700 rounded-md"></div>
        </div>
      </div>
    </div>
  )
}