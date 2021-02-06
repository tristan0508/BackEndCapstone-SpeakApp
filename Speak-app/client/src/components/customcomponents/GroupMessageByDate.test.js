import '@testing-library/jest-dom';
import groupMessagesByDate from './GroupMessageByDate';

const listOfMessages = [
    {
        date: "02/04/2021",
        body: "This is a message!"
    },
    {
        date: "02/04/2021",
        body: "This is another message!"
    },
    {
        date: "01/04/2021",
        body: "Hello world!"
    },
    {
        date: "12/20/2020",
        body: "How are you?"
    },
    {
        date: "01/04/2021",
        body: "Jest is awesome!"
    }
  ]

const noDateMessages = [
    {
        body: "This is a message"
    },
    {
        body: "This is another message"
    }
]

const noBodyMessages = [
    {
        date: "01/04/2021"
    },
    {
        date: "02/20/2021"
    }
]

const notMessages = [
    {
        name: "Tristan"
    },
    {
        name: "Sam"
    }
]

  describe('Grouping chat messages', () => {
    test('Should group messages by key value pairs in array', () => {
        expect(groupMessagesByDate(listOfMessages)).toEqual(expect.objectContaining(
            [["12/20/2020",
                [{"body": "How are you?", "date": "12/20/2020"}]],
            ["01/04/2021",
                [{"body": "Hello world!", "date": "01/04/2021"},
                 {"body": "Jest is awesome!", "date": "01/04/2021"}]],
            ["02/04/2021",
                [{"body": "This is a message!", "date": "02/04/2021"},
                 {"body": "This is another message!", "date": "02/04/2021"}]]]
        ))
    })

    test('Messages with no date, should return empty', () => {
        expect(groupMessagesByDate(noDateMessages)).toEqual([])
    })

    test('Messages with no body, should return empty', () => {
        expect(groupMessagesByDate(noBodyMessages)).toEqual([])
    })
    
    test('Not actual messages should return empty', () => {
        expect(groupMessagesByDate(notMessages)).toEqual([])
    })
    
  })