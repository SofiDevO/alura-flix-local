import styled from "styled-components";
import { useEffect, useState } from "react";
import { VideosDatos } from "../../data/Videos";

const TextContainer = ({ videoId }) => {
	const [videoInfo, setVideoInfo] = useState(null);

	useEffect(() => {
		// Busca el video correspondiente en VideosDatos usando el videoId
		const video = VideosDatos.find((video) => video.id === videoId);
		setVideoInfo(video);
	}, [videoId]);

	if (!videoInfo) {
		return null; // Si no hay datos disponibles, no renderiza nada
	}

	return (
		<CajaTexto>
			<Titulo backgroundcolor={videoInfo.categoria.color}>
				{videoInfo.title}
			</Titulo>
			<Styledh3 backgroundcolor={videoInfo.categoria.color}>
				{videoInfo.categoria.nombre}
			</Styledh3>
			<Parrafo>{videoInfo.metadescription}</Parrafo>
		</CajaTexto>
	);
};

export default TextContainer;

const CajaTexto = styled.div`
	    display: flex;
    flex-direction: column;
    width: 88.1rem;
    color: white;
    padding: 0 2.8rem;
    justify-content: space-between;
    gap: 2rem;
`;
const Titulo = styled.h1`
	display: flex;
	width: 100%;
	min-height: 13.2rem;
	flex-direction: column;
	justify-content: center;
	flex-shrink: 0;
	font-family: "Roboto";
	font-size: 4.1rem;
	font-style: normal;
	font-weight: 400;
	text-align: center;
	line-height: normal;
	background: rgba(255, 255, 255, 0.072);
	box-shadow: 0 8px 32px 0 rgba(123, 132, 255, 0.268);
	backdrop-filter: blur(12px);
	-webkit-backdrop-filter: blur(12px);
	border-radius: 10px;
	border: 1px solid rgba(255, 255, 255, 0.18);
	color: #ffffff;
	@media screen and (max-width: 768px) {
		font-size: 2.7rem;
		text-align: center;
	}
`;

const Styledh3 = styled.h3`
	font-family: Roboto;
    font-size: 4.6rem;
    font-style: normal;
    font-weight: 400;
    line-height: normal;
    padding: 1rem;
    background-color: #6BD1FF;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;
    width: auto;
    border-radius: 1.2rem;
	@media screen and (max-width: 768px) {
		display: none;
	}
`;
const Parrafo = styled.p`
	font-family: Roboto;
	font-size: 1.8rem;
	font-style: normal;
	font-weight: 300;
	line-height: normal;
	padding: 0.9rem;
	white-space: pre-wrap;
	@media screen and (max-width: 768px) {
		display: none;
	}
`;
