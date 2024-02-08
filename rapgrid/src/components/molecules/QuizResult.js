import React from 'react';
import QuizImg from '../atoms/QuizImg';
import QuizTitle from '../atoms/QuizTitle';
import QuizText from '../atoms/QuizText';
import imgbooba from '../../img/quizFR/BOOBA.gif';
import imgsch from '../../img/quizFR/SCH.gif';
import imgjul from '../../img/quizFR/JUL.gif';
import imglacrim from '../../img/quizFR/LACRIM.gif';



export default function QuizResult({ id, artistr }) {

  const artists = [
    {
      id: 1,
      artistslug: "booba",
      title: "BOOBA",
      text: "Tu es le boss de ce rap jeu, tu t'es hissé parmi les plus grands, comme une étoile, pour t'asseoir sur le trône. Que l'on t'appelle désormais: le Duc.",
      img: imgbooba
    },
    {
      id: 2,
      artistslug: "sch",
      title: "SCH",
      text: "Toi, Tu as du sang allemand dans les veines. Tu es arrivé au sommet, et cela en leur glissant juste un doigt. Mvthvfvck !",
      img: imgsch
    },
    {
      id: 3,
      artistslug: "jul",
      title: "Jul",
      text: "Tu peux te vanter d'avoir vendu le plus de disques de l'histoire de ce putain de rap français. Tu repartiras comme tu es arrivé, on t'appelera dorénavant l'OVNI.",
      img: imgjul
    },
    {
      id: 4,
      artistslug: "lacrim",
      title: "Lacrim",
      text: "Tu as longuement tenté d'échapper aux forces de l'ordre, et tes efforts n'ont pas été vains. Malgré tes goûts vestimentaires douteux, tu possèdes une maison à Miami et… un tigre.",
      img: imglacrim
    },
  ];

  const currentArtists = artists.find((artist) => artist.artistslug === artistr);

  return (
    <div>
      <div className="flex justify-center mb-4">
        <QuizTitle>{currentArtists.title}</QuizTitle>
      </div>
      <div className="flex">
        <div className="flex flex-col w-1/2">
          <QuizImg src={currentArtists.img} alt={""} />
        </div>
        <div className="flex flex-col w-1/2 ml-16 justify-center">
          <QuizText>{currentArtists.text}</QuizText>
        </div>
      </div>
    </div>
  );
}
