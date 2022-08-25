import { IQuestion } from '../../types';

const questionData: IQuestion[] = [
  {
    id: '723bb143-3b83-4149-b433-55929bb0c73d',
    allowedAttemptCount: 2,
    questionText:
      'If you have 10 mangos and another person gives you 12 more, how many mangos will you have in total?',
    hintText: '10 + 12',
    answerOptionList: [
      {
        id: '13abd54e-e60f-497d-81d2-17f2f89c598a',
        answerText: '1 mango',
      },
      {
        id: '5555bd55-6bdb-4231-8a74-b527a6a4224d',
        answerText: '2 mangos',
      },
      {
        id: '247d4dfb-a09e-4930-9272-768aa5a7e774',
        answerText: '10 mangos',
      },
      {
        id: 'f3f310a8-5d09-4055-844e-3813d875259a',
        answerText: '22 mangos',
      },
    ],
    correctAnswerKeyList: ['f3f310a8-5d09-4055-844e-3813d875259a'],
  },
  {
    id: '05ec58ed-ebb6-4aa6-9bc1-0df53745ce56',
    allowedAttemptCount: 2,
    questionText:
      'If a train is supposed to reach the station at 4:10am. but it is 35 minutes late, at what time will the train reach the station?',
    hintText: '10 + 35',
    answerOptionList: [
      {
        id: 'b09c68fd-3627-4e25-b2b0-f47412ea2387',
        answerText: '4:45 am',
      },
      {
        id: 'ff4cd307-bc28-43ed-90ae-e05bf0d3f210',
        answerText: '3:00 am',
      },
      {
        id: 'ae4b4cba-db03-4162-bc89-51669a8e43cd',
        answerText: '4:45 pm',
      },
      {
        id: '3a030a2e-d970-4d9a-af43-bd49aeed4965',
        answerText: '6:00 pm',
      },
    ],
    correctAnswerKeyList: ['b09c68fd-3627-4e25-b2b0-f47412ea2387'],
  },
];

export default questionData;
