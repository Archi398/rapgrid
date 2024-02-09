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

export const questions = [
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

export const answers = [
  {
    id: 1,
    group: 1,
    artist: "booba",
    text: "Rester dans le plus grand des silences au commissariat.",
    source: {
      song: "JDC",
      lyrics: "Au commissariat dans l'plus grand des silences",
      link: "https://genius.com/Booba-jdc-lyrics#note-8563668"
    }
  },
  {
    id: 2,
    group: 1,
    artist: "sch",
    text: "Leur sourire car tu gagnes largement plus qu'eux.",
    source: {
      song: "Incompris",
      lyrics: "Cent fois son annuel donc j'souris au feu-keus",
      link: "https://genius.com/Sch-incompris-lyrics#note-15628967"
    }
  },
  {
    id: 3,
    group: 1,
    artist: "jul",
    text: "Cavale, exil, serrage, asile.",
    source: {
      song: "Dans un autre monde",
      lyrics: "Cavale, exil, serrage, asile",
      link: "https://genius.com/Jul-dans-un-autre-monde-lyrics"
    }
  },
  {
    id: 4,
    group: 1,
    artist: "lacrim",
    text: "Partir en Espagne, là où il y a des villes que la PJ ne connaît pas...",
    source: {
      song: "Espana",
      lyrics: "Y'a des villes en Espagne qu'la PJ n'connaisse pas",
      link: "https://genius.com/Lacrim-espana-lyrics#note-11512702"
    }
  },
  {
    id: 5,
    group: 2,
    artist: "lacrim",
    text: "Tu te prépares en bonne et due forme en t'équipant avec les armes de Terminator.",
    source: {
      song: "Tuer un homme",
      lyrics: "Pour toi je pousse les rapports avec les armes de Terminator",
      link: "https://genius.com/Kery-james-tuer-un-homme-lyrics"
    }
  },
  {
    id: 6,
    group: 2,
    artist: "jul",
    text: "Tu décides de passer par Rabatau en conduisant khabat avec ton métaux.",
    source: {
      song: "Y'a la police",
      lyrics: "J'passe vers Rabatau, j'conduis khabat, eh ça sort le métaux, ça veut t'abattre",
      link: "https://genius.com/Jul-ya-la-police-lyrics"
    }
  },
  {
    id: 7,
    group: 2,
    artist: "sch",
    text: "Tu tournes dans la ville avec la pookie dans le coffre, histoire de le torturer.",
    source: {
      song: "Prêt à partir",
      lyrics: "On prend en otage dans l'fre-co du Audi",
      link: "https://genius.com/Sch-pret-a-partir-lyrics"
    }
  },
  {
    id: 8,
    group: 2,
    artist: "booba",
    text: "Un petit tour aux toilettes, c'est important.",
    source: {
      song: "La mort leur va si bien",
      lyrics: "Avant de tuer, j'commence par iech",
      link: "https://genius.com/Booba-la-mort-leur-va-si-bien-lyrics#note-2766918"
    }
  },
  {
    id: 9,
    group: 3,
    artist: "sch",
    text: "Une féfé pour se pavaner sur les Champs-Elysées.",
    source: {
      song: "Champs-Elysées",
      lyrics: "Féfé sur les Champs, pas loué, pas loué",
      link: "https://genius.com/Sch-champs-elysees-lyrics#note-8194879"
    }
  },
  {
    id: 10,
    group: 3,
    artist: "jul",
    text: "La voiture à Batman.",
    source: {
      song: "Dans la voiture à Batman",
      lyrics: "J'suis dans la voiture à Batman J'suis dans la voiture à Batman",
      link: "https://genius.com/Jul-dans-la-voiture-a-batman-lyrics"
    }
  },
  {
    id: 11,
    group: 3,
    artist: "booba",
    text: "Tu restes sur ta voiture préférée, la voiture bélier.",
    source: {
      song: "Daniel Sam",
      lyrics: "https://genius.com/Booba-daniel-sam-lyrics#note-11075731",
      link: "https://genius.com/Jul-dans-la-voiture-a-batman-lyrics"
    }
  },
  {
    id: 12,
    group: 3,
    artist: "lacrim",
    text: "Pour toi pas besoin d'acheter, tu rafales une vie et tu récupères ainsi sa voiture.",
    source: {
      song: "Ca rigole pas",
      lyrics: "Une rafale, et puis ta vie s'évapore oh j'récupère ton gamos",
      link: "https://genius.com/Lacrim-ca-rigole-pas-lyrics"
    }
  },
  {
    id: 13,
    group: 4,
    artist: "lacrim",
    text: "De la faire venir à ta table, c'est quand même une des plus belles de Paname, et tu te moques de ton voisin, même pas michtonnable.",
    source: {
      song: "Ce soir ne sors pas",
      lyrics: "Ce soir c'est sûr, y'a les plus belles de Paname, personne à ta table, t'es même pas michtonable",
      link: "https://genius.com/Lacrim-ce-soir-ne-sors-pas-lyrics"
    }
  },
  {
    id: 14,
    group: 4,
    artist: "sch",
    text: "De la baiser sans savoir son name, ni savoir son prix.",
    source: {
      song: "6.45i",
      lyrics: "J'veux la baiser, j'veux pas savoir son name ni savoir son prix",
      link: "https://genius.com/Sch-645i-lyrics#note-10982873"
    }
  },
  {
    id: 15,
    group: 4,
    artist: "jul",
    text: "Qu'après t'être fais chauffer et chambrer, tu en as marre d'être seul dans ta chambre, donc c'est le coup de foudre.",
    source: {
      song: "Coup de foudre",
      lyrics: "Elle me chauffe que elle me chambre, palalala, en plus j'me sens seul dans ma chambre, palalala",
      link: "https://genius.com/Jul-coup-de-foudre-lyrics"
    }
  },
  {
    id: 16,
    group: 4,
    artist: "booba",
    text: "De la faire venir, car du cash t'en as.",
    source: {
      song: "Pinocchio",
      lyrics: "Si t'es une michto, viens m'voir du cash j'en ai",
      link: "https://genius.com/Booba-pinocchio-lyrics#note-8302975"
    }
  },
  {
    id: 17,
    group: 5,
    artist: "jul",
    text: "Vodka - Schweppes Agrumes, histoire d'avoir le cerveau qui fume.",
    source: {
      song: "Sous la lune",
      lyrics: "Alors j'fais Vodka-Schweppes Agrume, j'ai le cerveau qui fume",
      link: "https://genius.com/Jul-sous-la-lune-lyrics"
    }
  },
  {
    id: 18,
    group: 5,
    artist: "booba",
    text: "Un verre de Klawi Juice.",
    source: {
      song: "113",
      lyrics: "Zerma tu cuisines, tu bibi rien du tout, tu n'as pas de klawi juice.",
      link: "https://genius.com/Booba-113-lyrics#note-13141522"
    }
  },
  {
    id: 19,
    group: 5,
    artist: "sch",
    text: "Un petit thé après avoir passé les portes du rrain-te.",
    source: {
      song: "Prêt à partir",
      lyrics: "J'passe les portes invisibles du rrain-te, puto, sers-moi un thé, ah",
      link: "https://genius.com/Sch-pret-a-partir-lyrics"
    }
  },
  {
    id: 20,
    group: 5,
    artist: "lacrim",
    text: "Tu optes pour du champagne, surtout pas de la bière.",
    source: {
      song: "Freestyle 1er juin",
      lyrics: "Bouffon j'bois du champagne, tu peux garder ta bière",
      link: "https://genius.com/Lacrim-freestyle-1er-juin-lyrics#note-9889928"
    }
  },
  {
    id: 21,
    group: 6,
    artist: "booba",
    text: "Grosse villa sur la corniche, c'est ce que le daron veut.",
    source: {
      song: "Parlons peu",
      lyrics: "Grosse villa sur la corniche : ce que le daron veut",
      link: "https://genius.com/Booba-parlons-peu-lyrics#note-2400186"
    }
  },
  {
    id: 22,
    group: 6,
    artist: "jul",
    text: "Tout ce qu'il faut pour les mettre à l'abri. Le classique.",
    source: {
      song: "La route est longue",
      lyrics: "Nous on veut innover, des lovés, mettre nos darons à l'abri",
      link: "https://genius.com/Amy-la-route-est-longue-lyrics"
    }
  },
  {
    id: 23,
    group: 6,
    artist: "lacrim",
    text: "Un billet. Et tu n'oublies pas de rappeler à ta mère de regarder par la fenêtre, il faut toujours se méfier.",
    source: {
      song: "Pardon mama",
      lyrics: "Pardon ma Mama, j'te laisse un billet, regarde par la fenêtre, faut te méfier",
      link: "https://genius.com/Lacrim-pardon-mama-lyrics"
    }
  },
  {
    id: 24,
    group: 6,
    artist: "sch",
    text: "Un empire, maman doit vivre mieux.",
    source: {
      song: "Allô Maman",
      lyrics: "Mais Maman devait vivre mieux, maman mérite un empire",
      link: "https://genius.com/Sch-allo-maman-lyrics#note-10459660"
    }
  },
  {
    id: 25,
    group: 7,
    artist: "lacrim",
    text: "Toujours blasé, tu te dirigeais vers l'école, mais sans cartable.",
    source: {
      song: "Éprouvé",
      lyrics: "J'étais blasé, j'marchais vers l'école mais sans cartable",
      link: "https://genius.com/Lacrim-eprouve-lyrics"
    }
  },
  {
    id: 26,
    group: 7,
    artist: "booba",
    text: "Qui mangeait du sable et qui se pissait dessus...",
    source: {
      song: "Foetus",
      lyrics: "En maternelle, je mange du sable, je me pisse dessus",
      link: "https://genius.com/Booba-ftus-lyrics#note-117609"
    }
  },
  {
    id: 27,
    group: 7,
    artist: "jul",
    text: "Qui y allait, pour réussir ton bac, évidemment tu le fais pour ta mère.",
    source: {
      song: "Arrête",
      lyrics: "Pour ta mère, va à l'école, réussis le bac",
      link: "https://genius.com/Szeravrdfz3121"
    }
  },
  {
    id: 28,
    group: 7,
    artist: "sch",
    text: "Qui a très vite quitté l'école, quitté l'école, tout pour le code.",
    source: {
      song: "Le code",
      lyrics: "On a quitté l'école, quitté l'école, tout pour le code",
      link: "https://genius.com/Sch-le-code-lyrics"
    }
  },
  {
    id: 29,
    group: 8,
    artist: "sch",
    text: "Rolex au poignet et souliers Fendi, la classe à l'italienne.",
    source: {
      song: "J't'en prie",
      lyrics: "Le temps se fout du prix d'ma Rolex et mes souliers Fendi",
      link: "https://genius.com/Sch-jten-prie-lyrics#note-15758106"
    }
  },
  {
    id: 30,
    group: 8,
    artist: "jul",
    text: "Kalenji et Quechua, tu n'hésites pas à sortir la parka quand il fait froid.",
    source: {
      song: "Dans le 13",
      lyrics: "Il fait froid, j'ai mis la Parka, j'suis en Kalenji en Quéchua",
      link: "https://genius.com/Jul-dans-le-13-lyrics#note-11920767"
    }
  },
  {
    id: 31,
    group: 8,
    artist: "booba",
    text: "Louis Vuiton, Dior, Louboutin, toi le luxe, ça te connaît.",
    source: {
      song: "Scarface",
      lyrics: "Louis Vuiton, Dior, Louboutin, marre de défourailler des putains d'ailleurs",
      link: "https://genius.com/Booba-scarface-lyrics#note-4170106"
    }
  },
  {
    id: 32,
    group: 8,
    artist: "lacrim",
    text: "Uniquement du Philipp Plein, comme tous tes comparses.",
    source: {
      song: "Philippins",
      lyrics: "Butin, je le tiens, 36 balles, j'sors de Philipp Plein",
      link: "https://genius.com/Lacrim-philippins-lyrics"
    }
  },
  {
    id: 33,
    group: 9,
    artist: "jul",
    text: "Peut te tuer du regard et faire fondre ton p'tit coeur comme un glaçon.",
    source: {
      song: "Mon bébé d'amour",
      lyrics: "Elle m'a tuée du regard. Elle a fait fondre mon petit coeur comme un glaçon.",
      link: "https://genius.com/Jul-mon-bebe-damour-lyrics"
    }
  },
  {
    id: 34,
    group: 9,
    artist: "sch",
    text: "Se mélange à la haine quand tu penses à ta dulcinée.",
    source: {
      song: "Tirer un trait",
      lyrics: "Un mélange de haine et d'amour quand j'pense à toi",
      link: "https://genius.com/Sch-tirer-un-trait-lyrics#note-18824011"
    }
  },
  {
    id: 35,
    group: 9,
    artist: "lacrim",
    text: "Ca t'apaise, tout comme la foi.",
    source: {
      song: "S'il vous plaît",
      lyrics: "L'amour et puis la foi qui nous apaise",
      link: "https://genius.com/Lacrim-sil-vous-plait-lyrics#note-6719792"
    }
  },
  {
    id: 36,
    group: 9,
    artist: "booba",
    text: "S'efface, mais tu n'y penses pas, faut qu'les choses se passent.",
    source: {
      song: "Magnifique",
      lyrics: "Autour de toi, l'amour s'efface, mais tu n'y penses pas, faut qu'les choses se passent",
      link: "https://genius.com/Booba-magnifique-lyrics"
    }
  },
  {
    id: 37,
    group: 10,
    artist: "jul",
    text: "Tu penses qu'ils veulent ta mort, sur grand-père.",
    source: {
      song: "Ça",
      lyrics: "Ils veulent ma mort sur grand-père",
      link: "https://genius.com/Jul-ca-lyrics"
    }
  },
  {
    id: 38,
    group: 10,
    artist: "booba",
    text: "Elle leur va si bien...",
    source: {
      song: "La mort leur va si bien",
      lyrics: "Izi, la muerte leur va si bien",
      link: "https://genius.com/Booba-la-mort-leur-va-si-bien-lyrics#note-2766654"
    }
  },
  {
    id: 39,
    group: 10,
    artist: "sch",
    text: "Tes ennemis sont morts, pendant que toi tu es mort de rire.",
    source: {
      song: "Mort de rire",
      lyrics: "T'es mort, on est mort de rire",
      link: "https://genius.com/Sch-mort-de-rire-lyrics#note-15011827"
    }
  },
  {
    id: 40,
    group: 10,
    artist: "lacrim",
    text: "Tu la souhaites par pendaison à tes détracteurs.",
    source: {
      song: "Sablier",
      lyrics: "J'leur souhaite la mort par pendaison",
      link: "https://genius.com/Lacrim-sablier-lyrics#note-6483566"
    }
  },
  {
    id: 41,
    group: 11,
    artist: "booba",
    text: "Des pionniers avant toi, Public Enemy et Renaud.",
    source: {
      song: "",
      lyrics: "",
      link: ""
    }
  },
  {
    id: 42,
    group: 11,
    artist: "sch",
    text: "Quand tu écris seul tes textes dans le noir.",
    source: {
      song: "",
      lyrics: "",
      link: ""
    }
  },
  {
    id: 43,
    group: 11,
    artist: "jul",
    text: "D'ailleurs.",
    source: {
      song: "",
      lyrics: "",
      link: ""
    }
  },
  {
    id: 44,
    group: 11,
    artist: "lacrim",
    text: "De tes nombreux aller-retours en Espagne et en prison.",
    source: {
      song: "",
      lyrics: "",
      link: ""
    }
  },
];



export default function QuizQuestion({ id, buttonClick }) {
  const currentQuestion = questions.find((question) => question.id === id);

  return (
    <div>
      <QuizTitle>{currentQuestion.id}. {currentQuestion.text}</QuizTitle>
      <div className="md:flex">
        <div className="flex flex-col md:w-1/2">
          <QuizImg src={currentQuestion.img} alt={""} />
        </div>
        <div className="flex flex-col md:w-1/2 md:ml-16 mt-8 md:mt-0 justify-center">
          {
            answers.filter((answer) => answer.group === id).map((answer, index) => {
              return (
                <QuizButton
                  key={answer.id}
                  onClick={buttonClick}
                  artist={answer.artist}
                  source={answer.source}
                >{answer.text}</QuizButton>
              )
            })
          }
        </div>
      </div>
    </div>
  );
}
