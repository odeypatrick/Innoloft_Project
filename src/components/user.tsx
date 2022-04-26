import React from "react";
import styled from "styled-components";

interface IProps {
	product: any;
}

export default function User({ product }: IProps) {
	return (
		<Container>
			<ImageContainer>
				<UserImage src={product?.user?.profilePicture} />
			</ImageContainer>

			<div>
				<p>Name: {`${product?.user?.firstName} ${product?.user?.lastName}`}</p>
				<p>Company name: {product?.company?.name}</p>
			</div>
		</Container>
	);
}

const Container = styled.div`
	grid-area: user;
	display: flex;
	flex-direction: column;
	align-items: center;
	gap: 0.5rem;

	div {
		margin-top: 0.5rem;
	}

	p {
		text-align: center;
	}
`;

const ImageContainer = styled.div`
	overflow: hidden;
	border-radius: 50%;
	width: 100px;
	height: 100px;
	margin: 0 auto;
	border: 4px solid #fff;
`;

const UserImage = styled.img`
	width: 100%;
	height: 100%;
`;
