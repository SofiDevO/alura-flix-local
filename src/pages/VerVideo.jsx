import { useEffect, useState } from "react";

import { Btn } from "../components/UI";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import styled from "styled-components";
import { VideosDatos } from "../data/Videos"; 
import { colorGrayDark } from "../components/UI/variables"; 

const VerVideo = () => {
  const [video, setVideo] = useState({});
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const listaCombinada = [...VideosDatos, ...(JSON.parse(localStorage.getItem("nuevosVideos")) || [])];
    
    console.log("Lista combinada:", listaCombinada);

    const videoEncontrado = listaCombinada.find((videoItem) => videoItem.id === id.toString());

    console.log("Video encontrado:", videoEncontrado);

    if (videoEncontrado) {
      setVideo(videoEncontrado);
      setLoading(false);
    } else {
      console.log("No se encontró un video con ID:", id, listaCombinada);
      console.log("Datos del video no encontrados:", video);
    /* navigate("/error"); */
    }
  }, [id]);

  if (loading) {
    return <p>Cargando...</p>;
  }

  if (!video.title) {
    return (
      <div>
        <p>El video no se encontró.</p>
      </div>
    );
  }

  return (
    <>
    
      <Section>
        <VerVideoContainer>
          <Portada
            src={`http://img.youtube.com/vi/${video.img}/maxresdefault.jpg`}
            alt={video.title}
          />
          <InfoContainer>
            <h1>{video.title}</h1>
            <Descripcion>{video.metadescription}</Descripcion>
            <Btn onClick={() => navigate(`/play/${id}`)}>Play</Btn>
          </InfoContainer>
        </VerVideoContainer>
      </Section>
      <Footer />
    </>
  );
};

export default VerVideo;

const Section = styled.section`
  background-color: ${colorGrayDark}; // Asegúrate de que colorGrayDark esté importado correctamente
  height: auto;
`;

const VerVideoContainer = styled.div`
  height: 112vh;
  display: flex;
  padding: 2rem;
  justify-content: center;
  align-items: center;
  color: #9e9e9e;
  font-size: 1.8rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    justify-content: center;
    padding: 1rem;
    height: 93.4vh;
  }
`;

const Portada = styled.img`
  width: 65%;

  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const InfoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  gap: 3rem;
  padding: inherit;
`;

const Descripcion = styled.p`
  white-space: pre-wrap;
`;


