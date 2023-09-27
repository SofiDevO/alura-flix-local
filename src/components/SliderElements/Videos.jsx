import React from "react";
import Slider from "react-slick";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { CategoriasDatos } from "../../data/Categorias";
import { VideosDatos } from "../../data/Videos";

const VideoSlider = ({ settings, videos }) => {
  return (
    <Slider {...settings}>
      {videos.map((video) => (
        <Link to={`/videos/${video.id}`} key={video.id}>
          <CajaVideo>
            <ImagenVideo
              src={`http://img.youtube.com/vi/${video.img}/maxresdefault.jpg`}
              alt={video.title}
              bordercolor={video.categoria ? video.categoria.color : "#000"}
            />
          </CajaVideo>
        </Link>
      ))}
    </Slider>
  );
};

const CajaVideo = styled.div`
  max-width: 1280px;
  margin: 0 auto;
  padding: 1rem 0;
  text-align: center;
  :hover {
    transform: scale(1.1);
  }
`;

const ImagenVideo = styled.img`
  width: 70%;
  border: 3px solid ${(props) => props.bordercolor};
  @media screen and (max-width: 768px) {
    width: 100%;
  }
`;

const VideoLista = () => {
  const [videosPorCategoria, setVideosPorCategoria] = React.useState({});

  React.useEffect(() => {
    // Combina los datos de VideosDatos con los nuevos videos de localStorage
    const todosLosVideos = [...VideosDatos, ...(JSON.parse(localStorage.getItem("nuevosVideos")) || [])];

    // Organiza los videos por categoría utilizando las categorías y los nuevos videos
    const videosCategorizados = CategoriasDatos.reduce((acc, categoria) => {
      const categoriaNombre = categoria.nombre;
      const videosDeCategoria = todosLosVideos.filter(
        (video) => video.categoria.nombre === categoriaNombre
      );

      acc[categoriaNombre] = {
        color: categoria.color,
        videos: videosDeCategoria,
      };
      return acc;
    }, {});

    setVideosPorCategoria(videosCategorizados);
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div>
      {Object.keys(videosPorCategoria).map((categoriaNombre) => (
        <div key={categoriaNombre}>
          <CategoriaTitulo color={videosPorCategoria[categoriaNombre]?.color}>
            {categoriaNombre}
          </CategoriaTitulo>
          <VideoSlider
            settings={settings}
            videos={videosPorCategoria[categoriaNombre]?.videos || []}
          />
        </div>
      ))}
    </div>
  );
};

const CategoriaTitulo = styled.h2`
  text-align: center;
  display: flex;
  width: 19.3043rem;
  height: 6rem;
  flex-direction: column;
  justify-content: center;
  font-family: Roboto;
  font-size: 3.5rem;
  font-style: normal;
  font-weight: 400;
  line-height: normal;
  background-color: ${(props) => props.color};
  color: white;
`;

export default VideoLista;
