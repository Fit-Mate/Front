import React from "react";
import Card from "../../UI/Card";
import { bodyDataAPI } from "../../API/API";
import { Line } from "react-chartjs-2";
import {Chart as ChartJS} from "chart.js/auto";
import MemberBodyDataManage from "./MemberBodyDataManage";

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
		const datasetYear = recentBodyBatch.map((dataset) => {
			return (dataset.date);
		});
		setSelectedBodyDataYear(datasetYear);

		if (selectedBodyDataType === "weight") {
			const datasets = recentBodyBatch.map((bodyData) => {
				return (bodyData.weight);
			});
			setSelectedBodyDataSets(datasets);
		}
		if (selectedBodyDataType === "upperBodyFat") {
			const datasets = recentBodyBatch.map((bodyData) => {
				return (bodyData.upperBodyFat);
			});
			setSelectedBodyDataSets(datasets);
		}
		if (selectedBodyDataType === "lowerBodyFat") {
			const datasets = recentBodyBatch.map((bodyData) => {
				return (bodyData.lowerBodyFat);
			});
			setSelectedBodyDataSets(datasets);
		}
		if (selectedBodyDataType === "upperMuscleMass") {
			const datasets = recentBodyBatch.map((bodyData) => {
				return (bodyData.upperMuscleMass);
			});
			setSelectedBodyDataSets(datasets);
		}
		if (selectedBodyDataType === "lowerMuscleMass") {
			const datasets = recentBodyBatch.map((bodyData) => {
				return (bodyData.lowerMuscleMass);
			});
			setSelectedBodyDataSets(datasets);
		}
	}

	/**API */
	//최근 10개 BodyData를 가져오는 API인데, 지금은 그냥 아무 BODYDATA 10개를 가져오는 APi로 설정.
	const getRecent10BodyDatas = async () => {
		const response = await bodyDataAPI(`/list/1`);
		const data = response.data;
		setRecentBodyBatch(data);
	}


	/**useEffect */
	React.useEffect(() => {
		getRecent10BodyDatas();
		changeBodyDataSets();
	}, [])

	React.useEffect(() => {
		changeBodyDataSets();
		const chartParam = {
			labels: selectedBodyDataYear,
			datasets: [
				{
					label: selectedBodyDataType,
					data: selectedBodyDatasets,
					backgroundColor: ["red", "green"]
				}
			]
		};
		setChartArgs(chartParam)
	}, [selectedBodyDataType])


	return (
		<Card>
			<header>
				<h2>MemberBodyDataSummary</h2>
				<select value={selectedBodyDataType} onChange={e => setSelectedBodyDataType(e.target.value)}>
					<option value="weight">weight</option>
					<option value="upperBodyFat">upperBodyFat</option>
					<option value="lowerBodyFat">lowerBodyFat</option>
					<option value="upperMuscleMass">upperMuscleMass</option>
					<option value="lowerMuscleMass">lowerMuscleMass</option>
				</select>
			</header>
			<main>
				<Line data={chartArgs} />
			</main>
			<footer>
				<button type='button' onClick={e=>setIsShowBodyDataManage(true)}>체성분 관리</button>
				{isShowBodyDataManage && <MemberBodyDataManage onClick={setIsShowBodyDataManage}/>}
			</footer>
		</Card>
	);

};

export default MemberBodyDataSummary;
