import { useEffect, useState } from "react";
import YoutubeEmbed from "../components/EmbedYT";
import { Btn } from "../components/UI";
import { useParams, useNavigate } from "react-router-dom";
import Footer from "../components/Footer";
import styled from "styled-components";
import { VideosDatos } from "../data/Videos";

const PlayVideo = () => {
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
      // Puedes manejar el caso de video no encontrado aquí y navegar a una página de error si lo deseas
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
      <BtnContainer>
        <Btn onClick={() => navigate(`/videos/${id}`)}>Volver</Btn>
      </BtnContainer>
      {video && (
        <YouTubeResponsive>
          <YoutubeEmbed embedId={video.embedId} />
        </YouTubeResponsive>
      )}
      <Footer />
    </>
  );
};

export default PlayVideo;

const YouTubeResponsive = styled.div`
  border-radius: 0.4rem;
  width: 100%;
  height: 65rem;
  display: flex;
  align-items: flex-start;
  justify-content: center;

  @media screen and (max-width: 768px) {
    width: 100%;
    height: 71vh;
    align-items: center;
  }
`;

const BtnContainer = styled.div`
  display: flex;
  width: 100%;
  align-items: flex-end;
  padding: 2rem 0 1rem 2rem;
  height: 19rem;
`;
