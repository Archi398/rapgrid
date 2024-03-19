export default function ATAFromToHead({ artistFrom, artistTo }) {
  return (
    <div>
      {
        artistFrom != null && artistTo != null
          ?
          <div className="flex flex-col md:flex-row justify-between mb-4">
            <div className="flex items-center w-1/3">
              <img className="size-12 rounded-lg" src={artistFrom.images[0].url} alt={artistFrom.name} />
              <h3 className="ml-2 text-xl font-bold">{artistFrom.name}</h3>
            </div>
            <div className="flex justify-center items-center w-1/3">
              <svg className="size-12 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
              </svg>
            </div>
            <div className="flex items-center justify-end w-1/3">
              <img className="size-12 rounded-lg" src={artistTo.images[0].url} alt={artistTo.name} />
              <h3 className="ml-2 text-xl font-bold text-center">{artistTo.name}</h3>
            </div>
          </div>
          :
          null
      }
    </div>
  )
}