import { useState, useEffect, useCallback, MouseEvent} from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'


const MAX = 5

export const useListHooks = () => {
  const [array, setArray] = useState<{ id: string, title: string, description: string }[]
    >([])
  const [load, setLoad] = useState(true)
  const [error, setError] = useState(false)
  const router = useRouter()
  const [page, setPage] = useState<string | string[] | 1>('1')
  const [pageCount, setPageCount] = useState<number>(1)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  useEffect(() => {
    const fetchFunc = async () => {
      setLoad(true)
      try {
        await new Promise((reject, _) => setTimeout(reject, 2000))
        const res = await axios.get('http://localhost:9004/todos')
        console.log(argsSplit(res.data))
        setArray(argsSplit(res.data))
        setPageCount(argsCount(res.data))
      } catch (error) {
        console.log(error)
        setError(true)
      }
      setLoad(false)
    }
    fetchFunc()
  }, [page])

  useEffect(() => {
    if (router.isReady) {
      setPage(router.query.page ? router.query.page : 1)
    }
  }, [router])

  const argsCount = (args: any[]) => {
    return Math.ceil(args.length / MAX)
  }

  const argsSplit = (args: any[]) => {
    const itemLength = args.length
    if (itemLength < MAX + 1) {
      return args
    } else {
      return args.filter((item, index) => {
        if (MAX * (Number(page) - 1) <= index && index < MAX * Number(page)) {
          return item
        }
      })
    }
  }

  const handleClick = useCallback(async (id: string) => {
    try {
      const res = await axios.delete(`http://localhost:9004/todos/${id}`)
      setArray(argsSplit(res.data))
      setPageCount(argsCount(res.data))
    } catch (error) {
      console.log(error)
      setError(true)
    }
  }, [array, setError])

  const todoAdd = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault()
    await axios.post(`http://localhost:9004/todos`, {
      'title': title,
      'description': description
    }, {
      headers: {
        'Content-Type': 'application/json',
        'accept': 'application/json'
      },
    })
    router.reload()
  }

  return {
    array, setArray, error, load, page, pageCount, title, setTitle, description, setDescription, handleClick, todoAdd
  }
}
