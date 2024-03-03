import { Label, Modal, TextInput } from 'flowbite-react';
import { useEffect, useRef, useState, useCallback } from 'react';
import { SpotifyApi } from '@spotify/web-api-ts-sdk';
import { debounce } from '../../utils/debounce';
import { toast } from 'react-toastify';

const sdk = SpotifyApi.withClientCredentials("7b1532e31e4f4ab28f471527aa4ab785", "4099a973c7084a31972ed8a44c878796");

export default function GridButtonModal({ divID, todaySeed, setLives, isDaily, artistID, categ, isCoverChecked }) {
  const imgRef = useRef(null);
  const btnRef = useRef(null);

  const [openModal, setOpenModal] = useState(false);
  const textInputRef = useRef(null);

  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const optionsToast = {
    theme: "dark",
    autoClose: 2500,
  };

  const fetchSearchResults = async (term) => {
    try {
      const items = await sdk.search(`album:${term}`, ["album"], "", 50);

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

  const debouncedFetchSearchResults = debounce(fetchSearchResults, 250);

  const handleInputChange = useCallback((event) => {
    const term = event.target.value;
    setLoading(true);
    setSearchTerm(term);
    if (term.trim() !== '') {
      debouncedFetchSearchResults(term);
    } else {
      setSearchResults([]);
    }
  }, [setLoading, setSearchTerm, setSearchResults, debouncedFetchSearchResults]);

  const fetchDataAlbum = async (id) => {
    try {
      const album = await sdk.albums.get(id, "", 50);
      return album;
    } catch (error) {
      console.error('Error fetching search results:', error);
    } finally {
      //setLoading(false);
    }
  };

  const isAlbumIdInRow = (albumId) => {
    return document.querySelectorAll(`[data-album-id="${albumId}"]`).length > 0;
  };

  const handleSelectResult = async (result) => {
    const album = await fetchDataAlbum(result.id);

    const checkCol = categ.check(album);
    const checkRow = album.artists.some(artist => artist.id === artistID);
    const isAlbumInRow = isAlbumIdInRow(album.id);

    if (checkCol && checkRow && !isAlbumInRow) {
      imgRef.current.classList.remove("invisible");
      imgRef.current.src = album.images[1].url;
      imgRef.current.setAttribute("data-album-id", album.id);
      btnRef.current.classList.add("invisible");
      if (isDaily) {
        localStorage.setItem(`result_album_id_${todaySeed}_${divID}`, album.id);
        localStorage.setItem(`result_img_${todaySeed}_${divID}`, album.images[1].url);
        localStorage.setItem(`result_correct_${todaySeed}_all`, parseInt(localStorage.getItem(`result_correct_${todaySeed}_all`)) + 1);
      }
      toast.success("Bonne réponse !", optionsToast);
    } else {
      if (!checkCol || !checkRow) toast.error("Cet album ne correspond pas !", optionsToast);
      if (isAlbumInRow) toast.warn("Cet album a déjà été trouvé", optionsToast);
    }

    if (isDaily) localStorage.setItem(`lives_${todaySeed}`, localStorage.getItem(`lives_${todaySeed}`) - 1)
    if (isDaily) setLives(localStorage.getItem(`lives_${todaySeed}`));

    setSearchTerm('');
    setSearchResults([]);
    setOpenModal(false)
  };


  useEffect(() => {
    if (isDaily && localStorage.getItem(`result_img_${todaySeed}_${divID}`)) {
      imgRef.current.classList.remove("invisible");
      imgRef.current.src = localStorage.getItem(`result_img_${todaySeed}_${divID}`);
      imgRef.current.setAttribute("data-album-id", localStorage.getItem(`result_album_id_${todaySeed}_${divID}`));
      btnRef.current.classList.add("invisible");
    } else {
      imgRef.current.classList.add("invisible");
      imgRef.current.src = '';
      btnRef.current.classList.remove("invisible");
    }
  }, [divID, todaySeed, isDaily]);


  return (
    <>
      <img ref={imgRef} className="invisible" src="" alt="" />
      <button ref={btnRef} data-isbutton="true" className="h-full w-full text-gray-900 hover:text-white border border-gray-800 hover:bg-gray-900 font-medium rounded-lg text-sm text-center dark:border-gray-600 dark:text-gray-400 dark:hover:text-white dark:hover:bg-gray-600" onClick={() => setOpenModal(true)}></button>
      <Modal className="dark bg-opacity-50" show={openModal} size="4xl" position="top-center" onClose={() => setOpenModal(false)} initialFocus={textInputRef}>
        <Modal.Header>Devinez l'album !</Modal.Header>
        <Modal.Body>
          <div className="space-y-6">
            <div>
              <div className="mb-2 block">
                <Label value="Le nom de l'album :" />
              </div>
              <div>
                <TextInput
                  ref={textInputRef}
                  type="text"
                  value={searchTerm}
                  onChange={handleInputChange}
                  placeholder="Search..."
                />
                {loading ? <p className="mt-2 ml-1">Chargement...</p> : null}
                {searchResults.length > 0 && (
                  <ul className="dropdown-content bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-md mt-2 w-full">
                    {searchResults.map((result, index) => (
                      <li
                        key={index}
                        onClick={() => handleSelectResult(result.albumData)}
                        className="cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 p-2"
                      >
                        <div className="flex items-center">
                          {isCoverChecked && <img className="h-10 max-w-lg rounded-lg mr-2" src={result.img} alt={result.name} />}
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
