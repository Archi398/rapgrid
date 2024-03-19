import { toast } from 'react-toastify';

export default function GridPersonalOptions() {
  const optionsToast = {
    theme: "dark",
    autoClose: 2500,
  };

  async function generateShareLink() {
    const listArtists = [
      document.getElementById("10").querySelector("span").getAttribute("data-id"),
      document.getElementById("20").querySelector("span").getAttribute("data-id"),
      document.getElementById("30").querySelector("span").getAttribute("data-id"),
    ];

    const listCategs = [
      document.getElementById("01").querySelector("span").getAttribute("data-id"),
      document.getElementById("02").querySelector("span").getAttribute("data-id"),
      document.getElementById("03").querySelector("span").getAttribute("data-id"),
    ];


    const params = new URLSearchParams();
    listArtists.forEach((artist, index) => params.append(`artist${index + 1}`, artist));
    listCategs.forEach((categ, index) => params.append(`categ${index + 1}`, categ));

    const url = `${process.env.REACT_APP_BASE_URL}/rapgrid/shared?${params.toString()}`;

    try {
      await navigator.clipboard.writeText(url);
      toast.success("Lien copié dans le presse-papier !", optionsToast);
      return true;
    } catch (error) {
      console.error('Error copying text to clipboard:', error);
      return false;
    }
  }

  return (
    <>
      <div className="text-gray text-center mt-4">
        <p>Les artistes sont basés sur vos artistes les plus écoutés sur Spotify.</p>
      </div>
      <button className="focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 mt-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800" onClick={generateShareLink}>Partager cette grille</button>
    </>
  )
}