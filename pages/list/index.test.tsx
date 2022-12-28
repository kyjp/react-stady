import List from "."
import { render, screen, cleanup } from '@testing-library/react'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import userEvent from '@testing-library/user-event'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      asPath: '/',
      query: 2
    };
  },
}))

const handlers = [
  rest.get(
    'http://localhost:9004/todos',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test1",
            id: 1,
            title: "test",
            updated_at: "2022-12-07T14:27:17"
          },
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test2",
            id: 2,
            title: "test2",
            updated_at: "2022-12-07T14:27:17"
          },
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test3",
            id: 3,
            title: "test3",
            updated_at: "2022-12-07T14:27:17"
          },
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test4",
            id: 4,
            title: "test4",
            updated_at: "2022-12-07T14:27:17"
          },
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test5",
            id: 5,
            title: "test5",
            updated_at: "2022-12-07T14:27:17"
          },
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test6",
            id: 6,
            title: "test6",
            updated_at: "2022-12-07T14:27:17"
          },
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test7",
            id: 7,
            title: "test7",
            updated_at: "2022-12-07T14:27:17"
          },
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test8",
            id: 8,
            title: "test8",
            updated_at: "2022-12-07T14:27:17"
          },
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test9",
            id: 9,
            title: "test9",
            updated_at: "2022-12-07T14:27:17"
          },
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test10",
            id: 10,
            title: "test10",
            updated_at: "2022-12-07T14:27:17"
          },
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test11",
            id: 11,
            title: "test11",
            updated_at: "2022-12-07T14:27:17"
          },
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test12",
            id: 12,
            title: "test12",
            updated_at: "2022-12-07T14:27:17"
          },
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test13",
            id: 13,
            title: "test13",
            updated_at: "2022-12-07T14:27:17"
          },
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test14",
            id: 14,
            title: "test14",
            updated_at: "2022-12-07T14:27:17"
          },
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test15",
            id: 15,
            title: "test15",
            updated_at: "2022-12-07T14:27:17"
          },
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test16",
            id: 16,
            title: "test16",
            updated_at: "2022-12-07T14:27:17"
          }
        ])
      )
    }
  )
]

const server = setupServer(...handlers)

beforeAll(() => {
  server.listen()
})
afterEach(() => {
  server.resetHandlers()
  cleanup()
})
afterAll(() => {
  server.close()
})

describe('list page check case', () => {
  it('記事表示チェック', async () => {
    render(
      <List />
    )
    await new Promise((reject, _) => setTimeout(reject, 2000))
    userEvent.click(await screen.findByText('2'))
    expect(await screen.findByText('test5')).toBeInTheDocument()
  } )
})
