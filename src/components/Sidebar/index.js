import "./style.css";
import logo from "../../assets/Logo.svg";

export default function SideBar({ handleReset }) {
  function handleResetGame() {}

  return (
    <div className="sidebar">
      <img src={logo} alt="logo da cubos academy" />
      <button onClick={() => handleReset()}>RESET</button>
    </div>
  );
}
