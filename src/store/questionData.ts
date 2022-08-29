import { IQuestion } from '../../types';

const questionData: IQuestion[] = [
  {
    id: '723bb143-3b83-4149-b433-55929bb0c73d',
    allowedAttemptCount: 2,
    allowedTime: 10,
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
    allowedAttemptCount: 3,
    allowedTime: 15,
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
  {
    id: '11d2de47-367c-48b7-be1b-fa8059f65f83',
    allowedAttemptCount: 2,
    allowedTime: 10,
    questionText: 'Which of these animals can fly?',
    hintText: 'The ones with wings.',
    answerOptionList: [
      {
        id: 'b29886cf-49d8-4891-864c-b550abc9c31a',
        answerText: 'Cats',
      },
      {
        id: '4bc28a87-02fd-49e5-ae82-2d6562d5ac0d',
        answerText: 'Bats',
      },
      {
        id: 'dd60ebc5-2d9f-4a70-b61d-b49d700989ba',
        answerText: 'Birds',
      },
      {
        id: 'bf35793d-808e-49ea-b737-2ea69e9a2b12',
        answerText: 'Worms',
      },
    ],
    correctAnswerKeyList: [
      '4bc28a87-02fd-49e5-ae82-2d6562d5ac0d',
      'dd60ebc5-2d9f-4a70-b61d-b49d700989ba',
    ],
  },
  {
    id: '02801f74-67ab-4159-87a0-1979ee5959c6',
    allowedAttemptCount: 2,
    allowedTime: 10,
    questionText: 'Which of the following is a list of colors?',
    hintText: "They're named after crayons.",
    answerOptionList: [
      {
        id: '30dddfad-4049-418f-9d86-92795a88febc',
        answerText: 'Dog, cat, fish',
      },
      {
        id: 'c65ef47d-18d0-4bca-836c-aea8b12030f9',
        answerText:
          'Earth, Mars, Venus, Saturn, Mercury, Jupiter, Neptune, Uranus',
      },
      {
        id: '9d7246df-4706-4c64-95b8-feea64de3d7a',
        answerText: 'Guitar, drums, piano, harmonica, tambourine, trumpet',
      },
      {
        id: '1e1cf001-c6bc-4d6e-8a3f-f250b555ef7e',
        answerText: 'Red, orange, yellow, green, blue, indigo, violet',
      },
    ],
    correctAnswerKeyList: ['1e1cf001-c6bc-4d6e-8a3f-f250b555ef7e'],
  },
  {
    id: 'd12c28a7-e7c7-4480-ae1a-554108de7bba',
    allowedAttemptCount: 5,
    allowedTime: 30,
    questionText:
      'If you are reading a book and are on page 374, what will the number of the next page be?',
    hintText: '374 + 1',
    answerOptionList: [
      {
        id: 'b02ad68a-aab7-4242-b8ba-b9a32749802e',
        answerText: '375',
      },
      {
        id: '081e3188-11fc-4066-a869-efc4fa99e7b3',
        answerText: '373',
      },
      {
        id: 'f15e6994-d7bc-4860-b134-9577e05393b3',
        answerText: '474',
      },
      {
        id: '5f2d4c54-731d-4273-9c3e-9b7fd6bb3fbb',
        answerText: '400',
      },
    ],
    correctAnswerKeyList: ['b02ad68a-aab7-4242-b8ba-b9a32749802e'],
  },
];

export default questionData;
