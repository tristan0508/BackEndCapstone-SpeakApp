import '@testing-library/jest-dom';
import groupMessagesByDate from './GroupMessageByDate';

const listOfMessages = [
    {
        dateCreated: "02/04/2021",
        body: "This is a message!"
    },
    {
        dateCreated: "02/04/2021",
        body: "This is another message!"
    },
    {
        dateCreated: "01/04/2021",
        body: "Hello world!"
    },
    {
        dateCreated: "12/20/2020",
        body: "How are you?"
    },
    {
        dateCreated: "01/04/2021",
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
        dateCreated: "01/04/2021"
    },
    {
        dateCreated: "02/20/2021"
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
                [{"body": "How are you?", "dateCreated": "12/20/2020"}]],
            ["01/04/2021",
                [{"body": "Hello world!", "dateCreated": "01/04/2021"},
                 {"body": "Jest is awesome!", "dateCreated": "01/04/2021"}]],
            ["02/04/2021",
                [{"body": "This is a message!", "dateCreated": "02/04/2021"},
                 {"body": "This is another message!", "dateCreated": "02/04/2021"}]]]
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