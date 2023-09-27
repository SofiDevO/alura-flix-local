import  from "react";
import AgregarVideoForm from "./AgregarVideoForm";

const AgregarVideo = ({ onAgregarVideo }) => {
  return (
    <div>
      <h2>Agregar Nuevo Video</h2>
      <AgregarVideoForm onAgregarVideo={onAgregarVideo} />
    </div>
  );
};

export default AgregarVideo;
