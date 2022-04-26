import React from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";

export default function Navigation() {
	return (
		<Container>
			<NavLink to="/">Home</NavLink>
			<NavLink to="/product">Product</NavLink>
		</Container>
	);
}

const Container = styled.nav`
	background-color: #eee;
	width: 30vw;
	min-width: 11rem;
	max-width: 15rem;
	padding: 0.75rem;
	display: flex;
	flex-direction: column;
	gap: 0.75rem;

	a {
		text-decoration: none;
		color: #000;
		padding: 0.75rem;
		background-color: #fff;
		border-radius: 0.25rem;
		transition: background-color 0.2s ease;
	}

	a:hover {
		background-color: #ddd;
	}

	@media (max-width: 950px) {
		width: 20vw;
	}

	@media (max-width: 500px) {
		width: 100%;
		max-width: none;
		min-width: none;
	}
`;
