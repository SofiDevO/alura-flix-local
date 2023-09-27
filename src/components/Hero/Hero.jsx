import styled from "styled-components";
import TextContainer from "./TextContainer";
import { Link } from "react-router-dom";
import { Btn } from "../UI/index";
import heroImg from "../../assets/img/JAVASCRIPT.png"
import { useNavigate } from "react-router-dom";
import { VideosDatos } from "../../data/Videos";

const Hero = () => {
  const navigate = useNavigate();

  if (!VideosDatos || VideosDatos.length === 0) {
    return null;
  }

  const randomIndex = Math.floor(Math.random() * VideosDatos.length);
  const videoAleatorio = VideosDatos[randomIndex];

  return (
    <HeroContainer>
      <TextContainer videoId={videoAleatorio.id} /> {/* Pasa el id del video actual */}
      <CajaBtn>
        <Btn onClick={() => navigate(`/videos/${videoAleatorio.id}`)}>ver</Btn>
      </CajaBtn>

      <ContenedorYT>
        <Link to={`/videos/${videoAleatorio.id}`}>
          <PortadaYT
            src={`http://img.youtube.com/vi/${videoAleatorio.img}/maxresdefault.jpg`}
            alt="portada YouTube"
          />
        </Link>
      </ContenedorYT>
    </HeroContainer>
  );
};


export default Hero;

const HeroContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
  flex-wrap: wrap;
  width: 100%;
  height: 100rem;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: bottom;
  background-image: linear-gradient(
    90deg,
    rgba(1, 8, 22, 0.811) 59%,
    rgba(0, 5, 13, 0.849) 95%
  ), url(${heroImg}); 

  @media screen and (max-width: 768px) {
    height: 31.8072rem;
    align-content: flex-end;
    padding: 2rem 0;
  }
`;

const ContenedorYT = styled.div`
  display: block;

  @media screen and (max-width: 768px) {
    display: none;
  }
`;
const CajaBtn = styled.div`
  display: none;
  @media screen and (max-width:768px) {
    display: block;
  }
`

const PortadaYT = styled.img`
  width: 59rem;
`;
