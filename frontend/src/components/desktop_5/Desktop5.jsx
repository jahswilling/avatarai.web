import Content from './Content';
// import Background from '../DASHBOARD_COMPONENT/dashboardcomp';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboardlayout from '../DASHBOARD_COMPONENT/DashboardLayout';

const Desktop5 = () => {
	const navigate = useNavigate();

	useEffect(() => {
		setTimeout(() => {
			navigate('/Dashboard_6');
		}, 5000);
	});

	return (
		<div>
			<Dashboardlayout title="Hello Baki," text="">
				<Content />
			</Dashboardlayout>
		</div>
	);
};

export default Desktop5;
