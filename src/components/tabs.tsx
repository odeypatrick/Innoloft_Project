import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import parse from "html-react-parser";
import { IconButton, Tooltip } from "@material-ui/core";
import { Edit } from "@material-ui/icons";
import { axios } from "../config";

interface IProps {
	product: any;
}

export default function Tabs({ product }: IProps) {
	const [currentTab, setCurrentTab] = useState("description");
	const [isSaving, setIsSaving] = useState(false);
	const [allTrls, setAllTrls] = useState([]);
	const descriptionRef = useRef<any>();
	const trlSelectRef = useRef<any>();
	const trlRef = useRef<any>();

	useEffect(() => {
		(async function () {
			try {
				const res = await axios.get("trl/");
				setAllTrls(res.data);
			} catch (err: any) {
				console.log(err.message);
			}
		})();
	}, []);

	const handleEditDescription = async () => {
		try {
			setIsSaving(true);
			const edit = prompt(
				"Edit description",
				descriptionRef.current.innerHTML
			) as string;
			await axios.put("product/6781/", { description: edit });
			setIsSaving(false);
			descriptionRef.current.innerHTML = parse(edit);
			alert("Description updated successfully.");
		} catch (err: any) {
			setIsSaving(false);
			console.log(err.message);
			alert("Failed");
		}
	};

	const handleEditTRLAttribute = async (e: any) => {
		try {
			e.preventDefault();
			setIsSaving(true);
			const trl = trlSelectRef.current.value;

			await axios.put("product/6781/", { trl });
			setIsSaving(false);
			trlRef.current.innerHTML = trl;
			alert("TRL updated successfully.");
		} catch (err: any) {
			setIsSaving(false);
			console.log(err.message);
			alert("Failed to update TRL");
		}
	};

	return (
		<TabsContainer>
			<TabsWrapper>
				<Tab onClick={() => setCurrentTab("description")}>
					<h3>Description</h3>
				</Tab>
				<Tab onClick={() => setCurrentTab("attributes")}>
					<h3>Attributes</h3>
				</Tab>
			</TabsWrapper>

			<TabContent>
				{currentTab === "attributes" ? (
					<AttributesTabContent>
						<div>
							<h3>Categories</h3>
							{product?.categories?.map((category: any) => (
								<p key={category.id}>{category.name}</p>
							))}
						</div>

						<div>
							<h3>Business models</h3>
							{product?.businessModels?.map((category: any) => (
								<p key={category.id}>{category.name}</p>
							))}
						</div>

						<div>
							<h3>TRL</h3>
							<p ref={trlRef} key={product?.trl?.id}>
								{product?.trl?.name}
							</p>

							<form>
								<select name="trl" ref={trlSelectRef}>
									{allTrls.map((trl: any) => (
										<Tooltip
											title={trl.name.split(" – ")[1]}
											arrow
											placement="right"
										>
											<option key={trl.id} value={trl.name}>
												{trl.name.split(" – ")[0]}
											</option>
										</Tooltip>
									))}
								</select>

								<button onClick={handleEditTRLAttribute}>Update</button>
							</form>
						</div>
					</AttributesTabContent>
				) : (
					<DescriptionTabContent>
						<p ref={descriptionRef}>{parse(product?.description)}</p>

						<Tooltip title="Edit description" arrow placement="right">
							<EditIconWrapper>
								<IconButton color="inherit" onClick={handleEditDescription}>
									<Edit fontSize="small" />
								</IconButton>
							</EditIconWrapper>
						</Tooltip>
						{isSaving && <p style={{ textAlign: "center" }}>Saving...</p>}
					</DescriptionTabContent>
				)}
			</TabContent>
		</TabsContainer>
	);
}

const TabsContainer = styled.div`
	grid-area: tab;
`;

const Tab = styled.button`
		display: block;
		flex: 1;
		height: 3rem;
		cursor: pointer;
		border: 1px solid #bbb;
		background-color: #eee;
		border-radius: 0.25rem;
		padding: 0.5rem;
		outline: none;

	&:hover {
		background-color: #fff;
`;

const EditIconWrapper = styled.div`
	background-color: #fff;
	border-radius: 50%;
	width: fit-content;
	margin-left: auto;
	color: red;
	margin-bottom: 0.5rem;

	button {
		width: 35px;
		height: 35px;
	}
`;

const TabContent = styled.article``;

const AttributesTabContent = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
	gap: 1.5rem;

	form {
		margin-top: 0.5rem;
		display: flex;
		gap: 1rem;
	}
`;

const DescriptionTabContent = styled.div``;

const TabsWrapper = styled.div`
	display: flex;
	gap: 1rem;
	margin-bottom: 0.75rem;
`;
