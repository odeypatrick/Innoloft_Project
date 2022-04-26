import "@fontsource/roboto";
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import styled from "styled-components";
import { Header, Navigation } from "./components";
import { Home, Product } from "./pages";

function App() {
	return (
		<Wrapper>
			<Router>
				<Header />

				<Content>
					<Navigation />

					<Main>
						<Routes>
							<Route path="/" element={<Home />} />
							<Route path="/product" element={<Product />} />
						</Routes>
					</Main>
				</Content>
			</Router>
		</Wrapper>
	);
}

export default App;

const Wrapper = styled.div`
	min-height: 100vh;
	display: flex;
	flex-direction: column;
`;

const Content = styled.section`
	flex: 1;
	display: flex;
	padding: 1rem;
	gap: 0.5rem;

	@media (max-width: 500px) {
		flex-direction: column;
	}
`;

const Main = styled.main`
	background-color: #eee;
	flex: 1;
`;
