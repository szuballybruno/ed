# Instructions for consistent seed

To properly simulate a started course with watched videos, you need to mimic the following functions:

* answerPrequizQuestion
* finishPrequiz
* answerExamQuestion
* finishPretest
* setCourseMode
* saveVideoPlaybackSample

This means that the following steps should be made:

1. Add 3 prequiz user answers
2. Add PrequizCompletion
3. Add AnswerSession for pretest
4. Add GivenAnswerStreak for pretest
3. Add GivenAnswers and AnswerGivenAnswerBridges for pretest
    4. If somehow there is a five correct streak, add 5 coins
5. Add CourseItemCompletion for pretest
6. Add UserCourseBridge
7. Add VideoPlaybackSamples like they have been merged, so
   no need for 5 sec blocks
8. Add UserVideoProgressBridge with proper completedPercentage and cursorSeconds
    9. If completed, insert CourseItemCompletion
10. If two days of activities following each other, add
    ActivityStreak
11. Add ActivitySession with correct dates
12. Add UserSessionActivity
