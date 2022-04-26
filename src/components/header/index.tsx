import React from "react";
import logo from "../../assets/logo_innoloft.svg";
import styled from "styled-components";

export default function Header() {
	return (
		<Container>
			<Logo src={logo} alt="innoloft_logo" />
		</Container>
	);
}

const Container = styled.header`
	padding: 1rem;
	background-color: #7b56f5;
`;

const Logo = styled.img`
	object-fit: contain;
	width: 200px;

	@media (max-width: 500px) {
		width: 120px;
	}
`;
