import React from 'react';
import QuizButton from '../atoms/QuizButton';
import QuizImg from '../atoms/QuizImg';
import QuizTitle from '../atoms/QuizTitle';
import img1 from '../../img/quizFR/1.GAV.jpg';
import img2 from '../../img/quizFR/2.MEURTRE.jpeg';
import img3 from '../../img/quizFR/3.VOITURE.jpg';
import img4 from '../../img/quizFR/4.BOITE.jpg';
import img5 from '../../img/quizFR/5.BOISSON.png';
import img6 from '../../img/quizFR/6.PARENTS.jpg';
import img7 from '../../img/quizFR/7.ECOLE.jpg';
import img8 from '../../img/quizFR/8.LUXE.jpg';
import img9 from '../../img/quizFR/9.AMOUR.jpg';
import img10 from '../../img/quizFR/10.MORT.jpg';
import img11 from '../../img/quizFR/11.INSPIRATION.png';




export default function QuizQuestion({ id, buttonClick }) {

  const answers = [
    {
      id: 1,
      group: 1,
      artist: "booba",
      text: "Rester dans le plus grand des silences au commissariat."
    },
    {
      id: 2,
      group: 1,
      artist: "sch",
      text: "Leur sourire car tu gagnes largement plus qu'eux."
    },
    {
      id: 3,
      group: 1,
      artist: "jul",
      text: "Cavale, exil, serrage, asile."
    },
    {
      id: 4,
      group: 1,
      artist: "lacrim",
      text: "Partir en Espagne, là où il y a des villes que la PJ ne connaît pas..."
    },
    {
      id: 5,
      group: 2,
      artist: "lacrim",
      text: "Tu te prépares en bonne et due forme en t'équipant avec les armes de Terminator."
    },
    {
      id: 6,
      group: 2,
      artist: "jul",
      text: "Tu décides de passer par Rabatau en conduisant khabat avec ton métaux."
    },
    {
      id: 7,
      group: 2,
      artist: "sch",
      text: "Tu tournes dans la ville avec la pookie dans le coffre, histoire de le torturer."
    },
    {
      id: 8,
      group: 2,
      artist: "booba",
      text: "Un petit tour aux toilettes, c'est important."
    },
    {
      id: 9,
      group: 3,
      artist: "sch",
      text: "Une féfé pour se pavaner sur les Champs-Elysées."
    },
    {
      id: 10,
      group: 3,
      artist: "jul",
      text: "La voiture à Batman."
    },
    {
      id: 11,
      group: 3,
      artist: "booba",
      text: "Tu restes sur ta voiture préférée, la voiture bélier."
    },
    {
      id: 12,
      group: 3,
      artist: "lacrim",
      text: "Pour toi pas besoin d'acheter, tu rafales une vie et tu récupères ainsi sa voiture."
    },
    {
      id: 13,
      group: 4,
      artist: "lacrim",
      text: "De la faire venir à ta table, c'est quand même une des plus belles de Paname, et tu te moques de ton voisin, même pas michtonnable."
    },
    {
      id: 14,
      group: 4,
      artist: "sch",
      text: "De la baiser sans savoir son name, ni savoir son prix."
    },
    {
      id: 15,
      group: 4,
      artist: "jul",
      text: "Qu'après t'être fais chauffer et chambrer, tu en as marre d'être seul dans ta chambre, donc c'est le coup de foudre."
    },
    {
      id: 16,
      group: 4,
      artist: "booba",
      text: "De la faire venir, car du cash t'en as."
    },
    {
      id: 17,
      group: 5,
      artist: "jul",
      text: "Vodka - Schweppes Agrumes, histoire d'avoir le cerveau qui fume."
    },
    {
      id: 18,
      group: 5,
      artist: "booba",
      text: "Un verre de Klawi Juice."
    },
    {
      id: 19,
      group: 5,
      artist: "sch",
      text: "Un petit thé après avoir passé les portes du rrain-te."
    },
    {
      id: 20,
      group: 5,
      artist: "lacrim",
      text: "Tu optes pour du champagne, surtout pas de la bière."
    },
    {
      id: 21,
      group: 6,
      artist: "booba",
      text: "Grosse villa sur la corniche, c'est ce que le daron veut."
    },
    {
      id: 22,
      group: 6,
      artist: "jul",
      text: "Tout ce qu'il faut pour les mettre à l'abri. Le classique."
    },
    {
      id: 23,
      group: 6,
      artist: "lacrim",
      text: "Un billet. Et tu n'oublies pas de rappeler à ta mère de regarder par la fenêtre, il faut toujours se méfier."
    },
    {
      id: 24,
      group: 6,
      artist: "sch",
      text: "Un empire, maman doit vivre mieux."
    },
    {
      id: 25,
      group: 7,
      artist: "lacrim",
      text: "Toujours blasé, tu te dirigeais vers l'école, mais sans cartable."
    },
    {
      id: 26,
      group: 7,
      artist: "booba",
      text: "Qui mangeait du sable et qui se pissait dessus..."
    },
    {
      id: 27,
      group: 7,
      artist: "jul",
      text: "Qui y allait, pour réussir ton bac, évidemment tu le fais pour ta mère."
    },
    {
      id: 28,
      group: 7,
      artist: "sch",
      text: "Qui a très vite quitté l'école, quitté l'école, tout pour le code."
    },
    {
      id: 29,
      group: 8,
      artist: "sch",
      text: "Rolex au poignet et souliers Fendi, la classe à l'italienne."
    },
    {
      id: 30,
      group: 8,
      artist: "jul",
      text: "Kalenji et Quechua, tu n'hésites pas à sortir la parka quand il fait froid."
    },
    {
      id: 31,
      group: 8,
      artist: "booba",
      text: "Louis Vuiton, Dior, Louboutin, toi le luxe, ça te connaît."
    },
    {
      id: 32,
      group: 8,
      artist: "lacrim",
      text: "Uniquement du Philipp Plein, comme tous tes comparses."
    },
    {
      id: 33,
      group: 9,
      artist: "jul",
      text: "Peut te tuer du regard et faire fondre ton p'tit coeur comme un glaçon."
    },
    {
      id: 34,
      group: 9,
      artist: "sch",
      text: "Se mélange à la haine quand tu penses à ta dulcinée."
    },
    {
      id: 35,
      group: 9,
      artist: "lacrim",
      text: "Ca t'apaise, tout comme la foi."
    },
    {
      id: 36,
      group: 9,
      artist: "booba",
      text: "S'efface, mais tu n'y penses pas, faut qu'les choses se passent."
    },
    {
      id: 37,
      group: 10,
      artist: "jul",
      text: "Tu penses qu'ils veulent ta mort, sur grand-père."
    },
    {
      id: 38,
      group: 10,
      artist: "booba",
      text: "Elle leur va si bien..."
    },
    {
      id: 39,
      group: 10,
      artist: "sch",
      text: "Tes ennemis sont morts, pendant que toi tu es mort de rire."
    },
    {
      id: 40,
      group: 10,
      artist: "lacrim",
      text: "Tu la souhaites par pendaison à tes détracteurs."
    },
    {
      id: 41,
      group: 11,
      artist: "booba",
      text: "Des pionniers avant toi, Public Enemy et Renaud."
    },
    {
      id: 42,
      group: 11,
      artist: "sch",
      text: "Quand tu écris seul tes textes dans le noir."
    },
    {
      id: 43,
      group: 11,
      artist: "jul",
      text: "D'ailleurs."
    },
    {
      id: 44,
      group: 11,
      artist: "lacrim",
      text: "De tes nombreux aller-retours en Espagne et en prison."
    },
  ];

  const questions = [
    {
      id: 1,
      text: "Tu te retrouves malencontreusement en garde à vue. Après un face à face avec la police judiciaire tu décides de...",
      img: img1
    },
    {
      id: 2,
      text: "Tu t'apprêtes à en finir avec un ennemi. Que fais-tu avant de passer à l'acte ?",
      img: img2
    },
    {
      id: 3,
      text: "Tu dois opter pour un gamos...",
      img: img3
    },
    {
      id: 4,
      text: "En boîte de nuit, une jeune femme s'approche de toi et tu devines très vite ses sombres intentions. Tu choisis donc...",
      img: img4
    },
    {
      id: 5,
      text: "Tu as besoin d'une bonne boisson pour te remonter le moral.",
      img: img5
    },
    {
      id: 6,
      text: "Malgré tes airs de gros durs, tu penses avant tout à tes parents. Pour eux, tu décides de leur offrir...",
      img: img6
    },
    {
      id: 7,
      text: "A l'école, tu étais un élève...",
      img: img7
    },
    {
      id: 8,
      text: "Tu es complètement fan de marque de luxe. D'ailleurs tu préfères surtout...",
      img: img8
    },
    {
      id: 9,
      text: "Tu as tout de même un coeur immense. D'ailleurs, pour toi l'amour...",
      img: img9
    },
    {
      id: 10,
      text: "Mais en tant qu'artiste torturé, tu penses également beaucoup à la mort.",
      img: img10
    },
    {
      id: 11,
      text: "Et ton inspiration vient surtout....",
      img: img11
    },
  ];

  const currentQuestion = questions.find((question) => question.id === id);

  return (
    <div>
      <QuizTitle>{currentQuestion.id}. {currentQuestion.text}</QuizTitle>
      <div className="flex">
        <div className="flex flex-col w-1/2">
          <QuizImg src={currentQuestion.img} alt={""} />
        </div>
        <div className="flex flex-col w-1/2 ml-16 justify-center">
          {
            answers.filter((answer) => answer.group === id).map((answer, index) => {
              return (
                <QuizButton
                  key={answer.id}
                  onClick={buttonClick}
                  artist={answer.artist}
                >{answer.text}</QuizButton>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}
