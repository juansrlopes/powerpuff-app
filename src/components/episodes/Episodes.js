import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Episodes.scss";

const Episodes = () => {
	const [episodesData, setEpisodesData] = useState(null);
	const [showList, setShowList] = useState(false);
	useEffect(() => {
		axios
			.get("http://api.tvmaze.com/shows/6771/episodes")
			.then(res => {
				setEpisodesData(res.data);
			})
			.catch(error => {
				console.log("Something went wrong fetching the episodes: ", error);
			});
	}, []);
	return (
		<div className="episodes-box container">
			{episodesData !== null && (
				<>
					<div
						className="episodes-header"
						onClick={() => setShowList(!showList)}
					>
						<h3>Episodes:</h3>
						<i
							className={`fa fa-arrow-${showList ? "up" : "down"}`}
							aria-hidden="true"
						></i>
					</div>
					{showList && (
						<div className="episodes-list">
							<ul className="list">
								{episodesData.map((episode, index) => {
									return (
										<li key={episode.id}>
											<Link to={`/episode/${episode.season}/${episode.number}`}>
												{index + 1}: {episode.name}
											</Link>
										</li>
									);
								})}
							</ul>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default Episodes;
