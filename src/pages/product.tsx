import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Map, Tabs, User } from "../components";
import { axios } from "../config";

export default function Product() {
	const [product, setProduct] = useState<any>({});
	const [isLoading, setIsLoading] = useState(true);

	useEffect(() => {
		(async function () {
			try {
				const res = await axios.get("product/6781/");
				setProduct(res.data);
				setIsLoading(false);
			} catch (err: any) {
				console.log(err.message);
				setIsLoading(false);
				alert("Failed to load product");
			}
		})();
	}, []);

	return (
		<Wrapper>
			{isLoading ? (
				<div>Loading...</div>
			) : (
				<>
					<ImageContainer>
						<Image src={product?.picture} />
					</ImageContainer>

					<User product={product} />

					<ProductInfo>
						<p>Title: {product?.name}</p>
						<p>Type: {product?.type?.name}</p>
					</ProductInfo>

					<Tabs product={product} />
					<Map product={product} />
				</>
			)}
		</Wrapper>
	);
}

const Wrapper = styled.div`
	padding: 0.75rem;
	display: grid;
	gap: 1rem;
	grid-template-areas:
		"image image user"
		"productInfo productInfo user"
		"tab tab map"
		"tab tab map";

	& > * {
		background-color: #ddd;
		min-height: 3rem;
		padding: 0.75rem;
	}

	h2 {
		margin-bottom: 0.5rem;
	}

	@media (max-width: 800px) {
		grid-template-areas:
			"image image"
			"user productInfo"
			"tab tab"
			"map map";
	}

	@media (max-width: 600px) {
		grid-template-areas:
			"image"
			"user"
			"productInfo"
			"tab"
			"map";
	}
`;

const ImageContainer = styled.div`
	width: 100%;
	height: 15rem;
	grid-area: image;
`;

const Image = styled.img`
	width: 100%;
	height: 100%;
	object-fit: contain;
`;

const ProductInfo = styled.div`
	grid-area: productInfo;
`;
