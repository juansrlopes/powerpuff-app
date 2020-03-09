import React, { useEffect, useState } from "react";
import axios from "axios";
import Episodes from "../episodes/Episodes";
import "./Home.scss";

const Home = () => {
	const [showData, setShowData] = useState(null);
	useEffect(() => {
		axios
			.get("http://api.tvmaze.com/singlesearch/shows?q=the-powerpuff-girls")
			.then(res => {
				setShowData(res.data);
			})
			.catch(error => {
				console.log("Something went wrong fetching the show: ", error);
			});
	}, []);
	return (
		<div className="home-wrapper">
			{showData !== null && (
				<div className="home-top-box container">
					<div className="home-box-inner left">
						<img
							className="main-image"
							src={showData.image.original}
							alt="The powerpuff girls"
						/>
					</div>
					<div className="home-box-inner right">
						<h2>{showData.name}</h2>
						<div className="box-info">
							<h3>Info:</h3>
							<p>Status: {showData.status}</p>
							<p>Type: {showData.type}</p>
							<p>Premiered: {showData.premiered}</p>
							<p>
								Genres:{" "}
								{showData.genres.map((genre, index) => (
									<span key={index}>
										{genre} {showData.genres.length === index + 1 ? "" : "| "}
									</span>
								))}
							</p>
							<p dangerouslySetInnerHTML={createMarkup(showData.summary)} />
						</div>
					</div>
				</div>
			)}
			<Episodes />
		</div>
	);
};

function createMarkup(summary) {
	return { __html: `Summary: ${summary}` };
}
export default Home;
