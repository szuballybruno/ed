import { Box, Flex } from "@chakra-ui/react";
import { applicationRoutes } from "../../configuration/applicationRoutes";
import { useCourseOverviewData } from "../../services/api/miscApiService";
import { useNavigation } from "../../services/core/navigatior";
import { iterate } from "../../static/frontendHelpers";
import { translatableTexts } from "../../static/translatableTexts";
import { EpistoFont } from "../controls/EpistoFont";
import { EpistoGrid } from "../controls/EpistoGrid";
import { ExamLayout } from "../exam/ExamLayout";
import StatisticsCard from "../statisticsCard/StatisticsCard";

export const CourseOverview = () => {
	const { courseOverviewData } = useCourseOverviewData();

	const { navigate } = useNavigation();

	/**
	* Összesen ennyi videót néztél meg
	* Ennyi EpistoCoint szereztél közben
	* Ennyi idő alatt végezted el a kurzust
	* Összesen ennyi kérdésre válaszoltál
	* A kérdésekre adott válaszaid átlaga
	* A témazárók átlaga
	* A kurzuszáró vizsgád eredménye
	**/

	const courseStatsOverviewData = [
		{
			value: "Dummy",
			title: "Összesen ennyi videót néztél meg",
			suffix: "db"
		},
		{
			value: "Dummy",
			title: "Ennyi EpistoCoint szereztél közben",
			suffix: "db"
		},
		{
			value: "Dummy",
			title: "Ennyi idő alatt végezted el a kurzust",
			suffix: "perc"
		},
		{
			value: "Dummy",
			title: "Összesen ennyi kérdésre válaszoltál",
			suffix: "db"
		},
		{
			value: "Dummy",
			title: "A kérdésekre adott válaszaid átlaga",
			suffix: "%"
		},
		{
			value: "Dummy",
			title: "A témazárók átlaga",
			suffix: "%"
		},
		{
			value: "Dummy",
			title: "A kurzuszáró vizsgád eredménye",
			suffix: "%"
		}
	]

	console.log(courseOverviewData);

	return (
		<ExamLayout headerCenterText={"A kurzus során elért eredményed"} handleNext={() => { }}
			nextButtonTitle={translatableTexts.exam.continueCourse}
			footerButtons={[
				{
					text: "Vissza a tanfolyamkeresobe",
					action: () => {
						navigate(applicationRoutes.availableCoursesRoute);
					},
				},
			]}
			showNextButton={false}>

			<Flex direction="column" className="whall" p="20px 0">

				<EpistoGrid minColumnWidth={"250px"} gap={"10"} auto={"fill"} w="100%">
					{courseStatsOverviewData.map((item) => {
						return <StatisticsCard
							suffix={item.suffix}
							title={item.title}
							value={item.value}
							height={150}
							p="10px 10px 10px 30px" />
					})}
				</EpistoGrid>
			</Flex>
		</ExamLayout>
	);
};