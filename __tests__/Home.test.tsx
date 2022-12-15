import { render, screen, cleanup } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'
import Home from '../pages/index'
import { rest } from 'msw'
import { setupServer } from 'msw/node'
import userEvent from '@testing-library/user-event'
import axios from 'axios'

// mswはjestのmockより低レイヤーなのでエラーが出にくく安全

const handlers = [
  rest.get(
    'http://localhost:9004/todos',
    (req, res, ctx) => {
      return res(
        ctx.status(200),
        ctx.json([
          {
            created_at: "2022-12-07T14:27:17",
            description: "This is test.",
            id: 1,
            title: "test",
            updated_at: "2022-12-07T14:27:17"
          },
          {
            created_at:"2022-12-07T14:27:17",
            description: "This is test.",
            id: 2,
            title: "test2",
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


describe('indexPage Test Cases', () => {
  it('indexページが表示されているかどうか', async () => {
    render(
      <Home />
    )
    expect(screen.getByText('Next.js!')).toBeInTheDocument()
  })
  it('clickの動作確認', async () => {
    render(
      <Home />
    )
    userEvent.click(screen.getByText('ボタン'))
    // screen.getByTestId('')
    expect(await screen.findByText('test2')).toBeInTheDocument()

    // const res = await axios.get('https://jsonplaceholder.typicode.com/posts')
    // console.log(res)
  })
  // it('clickの動作確認 エラー編', async () => {
  //   server.use(
  //     rest.get(
  //       'http://localhost:9004/todos', (req, res, ctx) => {
  //         return res(ctx.status(404))
  //       }
  //     )
  //   )
  //   render(
  //     <Home />
  //   )
  //   const res = await axios.get('http://localhost:9004/todos')
  //   console.log(res)
  // })
})
