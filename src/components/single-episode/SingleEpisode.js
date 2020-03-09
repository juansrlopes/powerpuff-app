import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, Link } from "react-router-dom";
import "./SingleEpisode.scss";

const SingleEpisode = () => {
	let { season, episode } = useParams();
	const [episodeData, setEpisodeData] = useState(null);
	useEffect(() => {
		axios
			.get(
				`http://api.tvmaze.com/shows/6771/episodebynumber?season=${season}&number=${episode}`
			)
			.then(res => {
				setEpisodeData(res.data);
			})
			.catch(error => {
				console.log("Something went wrong fetching the episode: ", error);
			});
	}, [episode, season]);
	return (
		<div className="episode-wrapper container">
			<Link to="/" className="btn btn-back">
				Back
			</Link>
			{episodeData !== null && (
				<div className="episode-box">
					<div className="episode-header">
						{episodeData.name} - <span>Season: {season} | </span>
						<span>Episode: {episode}</span>
					</div>
					<div className="summary-wrapper">
						<div className="summary-inner left">
							<h3>Summary:</h3>
							<div
								className="episode-summary"
								dangerouslySetInnerHTML={createMarkup(episodeData.summary)}
							/>
						</div>
						<div className="summary-inner right">
							<img
								src={
									episodeData.image !== null
										? episodeData.image.medium
										: "https://via.placeholder.com/300"
								}
								alt={episodeData.name}
							/>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};

function createMarkup(summary) {
	return {
		__html: `${
			summary === null || summary === ""
				? "No summary found, sorry..."
				: summary
		}`
	};
}

export default SingleEpisode;
