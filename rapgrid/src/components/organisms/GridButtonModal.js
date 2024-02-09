import { Label, Modal, TextInput } from 'flowbite-react';
import { useRef, useState } from 'react';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';

const sdk = SpotifyApi.withClientCredentials("7b1532e31e4f4ab28f471527aa4ab785", "4099a973c7084a31972ed8a44c878796");

export default function GridButtonModal({ artistID, categID }) {
  const imgRef = useRef(null);
  const btnRef = useRef(null);


  const [openModal, setOpenModal] = useState(false);
  const textInputRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchSearchResults = async (term) => {
    try {
      setLoading(true);
      const items = await sdk.search(`${term}`, ["album"], "US", 20);

      let data = [];
      items.albums.items.filter((item) => item.album_type !== "single").forEach(item => {
        data.push({
          albumData: item,
          name: item.name,
          img: item.images[0].url,
        })
      });
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      setLoading(false);
    }
  };

  // Handle input change
  const handleInputChange = async (event) => {
    const term = event.target.value;
    setSearchTerm(term);
    if (term.trim() !== '') {
      await fetchSearchResults(term);
    } else {
      setSearchResults([]);
    }
  };

  const fetchDataAlbum = async (id) => {
    try {
      const album = await sdk.albums.tracks(id, "US", 50);
      console.log('fetchDataAlbum', album); 
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      //setLoading(false);
    }
  };

  // Handle user selection
  const handleSelectResult = (result) => {
    //fetchDataAlbum(result.id);

    let checkCol = false;
    let checkRow = result.artists.some(artist => artist.id === artistID);

    switch (categID) {
      case 1:
        checkCol = parseInt(result.release_date.split('-')[0]) >= 2006 && parseInt(result.release_date.split('-')[0]) <= 2024;
        break;
      case 2:
        checkCol = parseInt(result.release_date.split('-')[0]) >= 1991 && parseInt(result.release_date.split('-')[0]) <= 2005;
        break;
      case 3:
        checkCol = "aeiouy".includes(result.name.charAt(0).toLowerCase());
        break;
      case 4:
        let patternThe = /^[Tt][Hh][Ee] [A-Za-z]+$/;
        let oneWord = /^[A-Za-z]+$/;
        checkCol = patternThe.test(result.name) || oneWord.test(result.name);
        break;
      case 5:
        checkCol = result.total_tracks > 16;
        break;
      case 6:
        checkCol = result.total_tracks <= 16;
        break;
      default:
        break;
    }

    if (checkCol && checkRow) {
      imgRef.current.classList.remove("invisible");
      imgRef.current.src = result.images[1].url; 
      btnRef.current.classList.add("invisible");
    }

    setSearchTerm('');
    setSearchResults([]);
    setOpenModal(false)
  };


  return (
    <>
      <img ref={imgRef} className="invisible" src="" alt="" />
      <button ref={btnRef} className="h-full w-full text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600" onClick={() => setOpenModal(true)}></button>
      <Modal className="dark bg-opacity-50" show={openModal} size="4xl" position="top-center" onClose={() => setOpenModal(false)} initialFocus={textInputRef}>
        <Modal.Header>Guess the album !</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label value="The album name :" />
              </div>
              <div>
                <TextInput
                  ref={textInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder="Search..."
                />
                {loading && <p>Loading...</p>}
                {!loading && searchResults.length > 0 && (
                  <ul className="dropdown-content bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md mt-2 w-full">
                    {searchResults.map((result, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelectResult(result.albumData)}
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
                      >
                        <div className="flex items-center">
                          <img className="h-10 max-w-lg rounded-lg mr-2" src={result.img} alt={result.name} />
                          {result.name}
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  );
}
