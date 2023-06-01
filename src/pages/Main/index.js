import "./style.css";
import SideBar from "../../components/Sidebar/index";
import Cards from "../../components/Cards/index";
import databank from "../../databank/databank";
import cardBack from "../../assets/card-back.png";
import Congratulation from "../../components/Congratulations";
import { useState } from "react";

function Main() {
  const [cardsData, setCardsData] = useState([...databank]);
  const [selectedCards, setSelectedCards] = useState([]);
  const [winner, setWinner] = useState(false);

  function handleShowCard(event) {
    const idCard = event.target.id;
    const localCardsData = [...cardsData];
    const cardSelected = localCardsData.find((card) => card.id === +idCard);
    const localSelectedCards = [...selectedCards];

    cardSelected.selected = true;

    if (localSelectedCards.length > 0 && localSelectedCards[0].id === +idCard) {
      return;
    }

    if (localSelectedCards.length > 1) {
      return;
    }

    localSelectedCards.push(cardSelected);
    setCardsData((prevCardsData) => (prevCardsData = localCardsData));
    setSelectedCards(
      (prevSelectedCards) => (prevSelectedCards = localSelectedCards)
    );

    if (
      localSelectedCards.length > 1 &&
      localSelectedCards[0].name !== localSelectedCards[1].name
    ) {
      for (let card of localCardsData) {
        if (
          card.id === localSelectedCards[0].id ||
          card.id === localSelectedCards[1].id
        ) {
          const timeout = setTimeout(() => {
            card.selected = false;
            setCardsData((prevCardsData) => (prevCardsData = localCardsData));
            setSelectedCards([]);
          }, 350);
        }
      }
      return;
    }
    if (localSelectedCards.length > 1) {
      const localCardsDataFiltred = localCardsData.filter(
        (card) => card.name !== localSelectedCards[0].name
      );
      const timeout = setTimeout(() => {
        setCardsData(
          (prevCardsData) => (prevCardsData = localCardsDataFiltred)
        );
        setSelectedCards([]);
      }, 500);
      return;
    }
    if (cardsData.length === 2) {
      const timeout = setTimeout(() => {
        setWinner(true);
      }, 1700);
    }
  }

  function handleReset() {
    const localCardsData = [...databank];

    for (const card of localCardsData) {
      if (card.selected) {
        card.selected = false;
      }
    }
    setWinner(false);
    setCardsData((prevCardsData) => (prevCardsData = localCardsData));
  }

  return (
    <div className="container">
      <div className="container-sidebar">
        <SideBar handleReset={handleReset} />
      </div>
      <div className="container-cards">
        {!winner ? (
          cardsData.map((card) => (
            <Cards
              key={card.id}
              card={card}
              image={card.selected ? card.image : cardBack}
              handleShowCard={handleShowCard}
            />
          ))
        ) : (
          <Congratulation />
        )}
      </div>
    </div>
  );
}

export default Main;
