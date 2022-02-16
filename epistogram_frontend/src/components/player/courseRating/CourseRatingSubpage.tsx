import { ExamLayout } from "../../exam/ExamLayout";

export const CourseRatingSubpage = () => {


    return (
        <ExamLayout
            headerLeftItem={<Flex align="center">

                <img
                    alt=""
                    src={getAssetUrl("course_page_icons/curriculum_test.svg")}
                    className="square35" />

                <EpistoFont style={{ marginLeft: "10px" }}>
                    {totalQuestionsCount}/{currentQuestionIndex + 1}
                </EpistoFont>
            </Flex>}
            headerCenterText="Kurzus elotti felmero"
            handleNext={handleNextAsync}
            showNextButton={canContinue}
            nextButtonTitle={translatableTexts.exam.nextQuestion}
            progressValue={progressPercentage}
            handleBack={currentQuestionIndex !== 0 ? handleBackAsync : undefined}>

            <ExamLayoutContent
                title={question?.text ?? ""}>

                {question?.isNumeric
                    ? <Flex direction="column" align="center">
                        <Flex justify="space-between">
                            <EpistoFont>
                                Nem erzem tapasztaltnak magam
                            </EpistoFont>

                            <Box width="80px" />

                            <EpistoFont>
                                Tapasztaltnak erzem magam
                            </EpistoFont>
                        </Flex>

                        <Slider
                            max={10}
                            valueLabelDisplay="auto"
                            marks={true}
                            style={{
                                color: "var(--deepBlue)"
                            }}
                            onChange={(_, value) => setNumericValue(value as any)}
                            value={numericValue} />

                        <EpistoFont
                            fontSize="fontHuge"
                            style={{
                                boxShadow: "-1px 3px 16px 17px white",
                                background: "white",
                                borderRadius: "10px",
                                marginTop: "10px"
                            }}>

                            {numericValue}
                        </EpistoFont>
                    </Flex>
                    : <Grid
                        templateColumns="repeat(2, 1fr)"
                        gridAutoRows="minmax(0,1fr)"
                        direction="column"
                        gridGap="10px"
                        flex="1">

                        {question && question
                            .answers
                            .map((answer, index) => {

                                const isAnswerSelected = answer.id === selectedAnswerId;

                                return <QuestionAnswer
                                    onClick={() => setSelectedAnswerId(answer.id)}
                                    answerText={answer.text}
                                    isSelected={isAnswerSelected} />
                            })}
                    </Grid>}
            </ExamLayoutContent>
        </ExamLayout >
    )
}