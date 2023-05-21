import React from "react";
import Card from "../../UI/Card";
import { bodyDataAPI } from "../../API/API";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";
import MemberBodyDataManage from "./MemberBodyDataManage";

import classes from "./MemberBodyDataSummary.module.css"

import Button from "../../UI/Button";

const MemberBodyDataSummary = (props) => {

	/**state */
	const [isShowBodyDataManage, setIsShowBodyDataManage] = React.useState(false);
	const [recentBodyBatch, setRecentBodyBatch] = React.useState([]);
	const [selectedBodyDatasets, setSelectedBodyDataSets] = React.useState([]);
	const [selectedBodyDataYear, setSelectedBodyDataYear] = React.useState([]);
	const [selectedBodyDataType, setSelectedBodyDataType] = React.useState("weight");
	const [chartArgs, setChartArgs] = React.useState({
		labels: [],
		datasets: [
			{
				label: selectedBodyDataType,
				data: [],
				backgroundcolor: ["red", "green"],
			}
		]
	});

	/**function */
	const changeBodyDataSets = () => {
		let data;
		const datasetYear = recentBodyBatch.map((dataset) => {
			return (dataset.date);
		});
		setSelectedBodyDataYear(datasetYear);

		if (selectedBodyDataType === "weight") {
			const datasets = recentBodyBatch.map((bodyData) => {
				return (bodyData.weight);
			});
			data = [...datasets];
		}
		if (selectedBodyDataType === "upperBodyFat") {
			const datasets = recentBodyBatch.map((bodyData) => {
				return (bodyData.upperBodyFat);
			});
			data = [...datasets];
		}
		if (selectedBodyDataType === "lowerBodyFat") {
			const datasets = recentBodyBatch.map((bodyData) => {
				return (bodyData.lowerBodyFat);
			});
			data = [...datasets];
		}
		if (selectedBodyDataType === "upperMuscleMass") {
			const datasets = recentBodyBatch.map((bodyData) => {
				return (bodyData.upperMuscleMass);
			});
			data = [...datasets];
		}
		if (selectedBodyDataType === "lowerMuscleMass") {
			const datasets = recentBodyBatch.map((bodyData) => {
				return (bodyData.lowerMuscleMass);
			});
			data = [...datasets];
		}
		setSelectedBodyDataSets(data);
	}

	/**API */
	//최근 10개 BodyData를 가져오는 API인데, 지금은 그냥 아무 BODYDATA 10개를 가져오는 APi로 설정.
	const getRecent10BodyDatas = async () => {
		const response = await bodyDataAPI(`/list/1`);
		const data = response.data;
		setRecentBodyBatch((prev) => data);
	}


	/**useEffect */
	React.useEffect(() => {
		getRecent10BodyDatas();
		changeBodyDataSets();
	}, []);

	React.useEffect(() => {
		changeBodyDataSets();
	}, [recentBodyBatch])


	React.useEffect(() => {
		changeBodyDataSets();
	}, [selectedBodyDataType])

	React.useEffect(() => {
		const chartParam = {
			labels: selectedBodyDataYear.reverse(),
			datasets: [
				{
					label: selectedBodyDataType,
					data: selectedBodyDatasets.reverse(),
					backgroundColor: ["red", "green"]
				}
			]
		};
		setChartArgs((prev) => chartParam);
	}, [selectedBodyDatasets])


	return (
		<div className={classes.card}>
			<div>
				<Card>
					<header>
						<h2>MemberBodyDataSummary</h2>
						<select onChange={e => setSelectedBodyDataType(e.target.value)}>
							<option value="weight">weight</option>
							<option value="upperBodyFat">upperBodyFat</option>
							<option value="lowerBodyFat">lowerBodyFat</option>
							<option value="upperMuscleMass">upperMuscleMass</option>
							<option value="lowerMuscleMass">lowerMuscleMass</option>
						</select>
					</header>
					<main className={classes.chart}>
						<Line data={chartArgs} />
					</main>
					<footer>
						<Button type='button' onClick={e => setIsShowBodyDataManage(true)}>체성분 관리</Button>
					</footer>
				</Card>
			</div>
			<div>
				{isShowBodyDataManage && <MemberBodyDataManage onClick={setIsShowBodyDataManage} />}
			</div>
		</div>
	);

};

export default MemberBodyDataSummary;
