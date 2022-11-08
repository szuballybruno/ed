import { memo } from 'react';
import { CourseAdminListItemDTO } from '@episto/communication';
import { Id } from '@episto/commontypes';
import { useIntParam } from '../../../static/locationHelpers';
import { EpistoFlex2 } from '../../controls/EpistoFlex';
import { EpistoImage } from '../../controls/EpistoImage';
import { EpistoSearch } from '../../controls/EpistoSearch';
import { ForceNoOverflowY } from '../../controls/ForceNoOverflowY';
import { FlexList } from '../../universal/FlexList';

export const AdminCourseList = memo((props: {
    onCourseClick: (courseId: Id<'Course'>) => void,
    courses: CourseAdminListItemDTO[],
    noOverflow?: boolean
}) => {

    // props
    const { courses, noOverflow, onCourseClick } = props;

    const isMinimized = true;

    // util
    const courseId = Id
        .create<'Course'>(useIntParam('courseId')!);

    return <EpistoFlex2
        className="roundBorders"
        direction="column"
        mr="5px"
        align='center'
        background="var(--transparentWhite90)"
        minWidth="95px">

        {!isMinimized && <EpistoSearch
            background="white"
            boxShadow="inset 0px -2px 10px -5px #33333315"
            borderRadius="7px 0 0 0" />}

        {/* List of courses */}
        <ForceNoOverflowY disabled={!noOverflow}>
            <FlexList
                flex="1"
                mt="5px"
                direction='column'
                align='center'
                width='85px'
                className="roundBorders"
                background="var(--transparentWhite70)">

                {courses
                    .map((course, index) => {

                        return <EpistoImage
                            title={course.title}
                            key={index}
                            onClick={() => onCourseClick(course.courseId)}
                            src={course.thumbnailImageURL}
                            width='85px'
                            mb='5px'
                            cursor="pointer"
                            className='roundBorders'
                            objectFit="cover" />;

                        /*       align="center"
                              mb="1"
                              thumbnailContent={
                                  <EpistoFlex2
                                      className="roundBorders"
                                      style={{
                                          height: '40px',
                                          width: '100%'
                                      }}
                                      overflow="hidden">
  
                                      
                                  </EpistoFlex2>
                              }
                              midContent={isMinimized
                                  ? undefined
                                  : <FlexListTitleSubtitle
                                      title={course.title}
                                      subTitle={''}
                                      isSelected={course.courseId === courseId}
                                  />
                              } />; */
                    })}
            </FlexList>
        </ForceNoOverflowY>
    </EpistoFlex2>;
}, (prev, next) => {

    return prev.onCourseClick === next.onCourseClick
        && prev.courses.length === next.courses.length;
});
