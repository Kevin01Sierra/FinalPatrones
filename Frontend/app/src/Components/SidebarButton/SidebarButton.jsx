import './SidebarButton.css'

function SidebarButton({ URL_BTN, URL_IMG, nombre }) {

  const handleClick = () => {
    window.location.href = "https://backend-parqueadero-production.up.railway.app" + URL_BTN;
  };

  return (
      <div className="sidebarButton" onClick={handleClick}>
        <img src={URL_IMG} alt="" />
          <p>{nombre}</p>
        </div>
  );
}

export default SidebarButton;