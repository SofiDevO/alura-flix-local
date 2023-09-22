import { useEffect, useState } from "react";
import { buscar } from "../api/api";
import styled from "styled-components";
import { colorGrayDark } from "../components/UI/variables";
import { useParams, useNavigate } from "react-router-dom";
import { Btn } from "../components/UI";
import Footer from "../components/Footer";

const VerVideo = ({ url }) => {
	const [vid, setVideo] = useState({});
	const { id } = useParams();
	const navigate = useNavigate();

	useEffect(() => {
		buscar( `/videos/${id}`, setVideo).catch(() => {
			console.log(id)
		});
	}, [id]);

	return (
		<Section>
			<VerVideoContainer>
				<Portada src={`https://i.ytimg.com/vi/${vid.img}/maxresdefault.jpg`} alt={vid.title} />
				<InfoContainer>
					<h1>{vid.title}</h1>
					<Descripcion>{vid.metadescription}</Descripcion>
					<Btn onClick={() => navigate(`/play/${id}`)}>Ver video</Btn>
				</InfoContainer>
			</VerVideoContainer>
			<Footer/>
		</Section>
	);
};

export default VerVideo;


const Section = styled.section`
	background-color: ${colorGrayDark};
	height: auto;
	`

const VerVideoContainer = styled.div`
	height: 80vh;
    display: flex;
    padding: 2rem;
    justify-content: space-around;
    align-items: center;
    color: #9e9e9e;
    font-size: 1.8rem;

	@media screen and (max-width:768px) {
		flex-direction: column;
		justify-content: center;
		padding: 1rem;
		height: 86.4vh;
	}
`;
const Portada = styled.img`
	width: 65%;
	@media screen and (max-width:768px) {
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
`