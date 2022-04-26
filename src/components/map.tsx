import React from "react";
import styled from "styled-components";

interface IProps {
	product: any;
}

export default function Map({ product }: IProps) {
	return (
		<Container>
			<h2>Address</h2>
			<p>{`${product?.company?.address?.house} 
						${product?.company?.address?.street}, 
						${product?.company?.address?.city?.name},
						${product?.company?.address?.country?.name}`}</p>
		</Container>
	);
}

const Container = styled.div`
	grid-area: map;
`;
