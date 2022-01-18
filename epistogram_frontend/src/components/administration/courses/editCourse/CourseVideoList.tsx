import { Box } from '@chakra-ui/react';
import React from 'react';

export const CourseVideoList = (props: { courseId: string }) => {

    // TODO: Remove. It is not used anywhere
    return <Box>WIP</Box>;
    // const admin = useState(adminSideState)

    // const items = useState([{
    //     _id: "",
    //     type: "",
    //     title: "",
    //     subTitle: "",
    //     url: "",
    //     thumbnailUrl: "",
    //     teacherName: "",
    //     courseName: "",
    //     overlaysCount: 0,
    //     length: 0,
    //     watchCount: 0,
    //     uploadTime: "",
    //     name: "",
    //     examQuestions: [{
    //         questionValue: "",
    //         questionAnswers: [{
    //             answerValue: "",
    //             isTheAnswerTrue: false,
    //         }]
    //     }]
    // }])
    // useEffect(() => {
    //     instance.get(`/courses/course/${props.courseId}`).then((res) => {
    //         return items.set(res.data.items)
    //     })
    //     // eslint-disable-next-line react-hooks/exhaustive-deps
    // }, [])
    // return (
    //     <div className={classes.itemsContainer}>
    //         {items.get() ? items.get().map((item, index) => {
    //             return item.type === "video" ? <AdministrationListItem
    //                 title={item.title}
    //                 thumbnailUrl={item.thumbnailUrl}
    //                 chips={[
    //                     { label: "item.watchCount.toString()", icon: "play" },
    //                     { label: item.overlaysCount.toString(), icon: "overlay" },
    //                     { label: Math.round(item.length / 60) + " perc", icon: "length" }]}

    //                 key={item._id}
    //                 searchItemButtons={[
    //                     {
    //                         to: `/admin/manage/courses/${admin.currentlyEdited.course._id.get()}/item/${item._id}`, // Ezt a komponenst szerkeszteni, hogy elfogadjon más URL-t is.
    //                         icon: "edit",
    //                         onClick: () => {

    //                         }
    //                     }, {
    //                         selectedComponent: "userStatistics",
    //                         icon: "statistics",
    //                         onClick: () => {

    //                         }
    //                     }, {
    //                         icon: "delete",
    //                         onClick: () => {
    //                             instance.delete(`${backendUrl}videos/deletevideo?videoId=${item._id}`).then(() => {
    //                                 return items[index].set(none)
    //                             }).catch(e => console.error(e.toString()))
    //                         }
    //                     },]
    //                 } /> : null
    //         }) : <div className={classes.noCourseContainer}><Typography>Ez a kurzus még nem tartalmaz egy videót sem.</Typography></div>}
    //     </div>
    // );
};
