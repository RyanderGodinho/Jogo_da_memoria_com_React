import "./style.css";
import winnerImage from "../../assets/congrats.png";

export default function Congratulation() {
  return <img className="winner" src={winnerImage} />;
}
