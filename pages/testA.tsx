import { useState, useReducer, useEffect, useCallback, memo } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router'

const testA = () => {
  const router = useRouter()
  const [args, setArgs] = useState<{title: string, description: string}[]
    >([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  useEffect(() => {
    const fetchFunc = async () => {
      try {
        const res = await axios.get('http://localhost:9004/todos')
        console.log(res.data)
        setArgs(res.data)
      } catch (error) {
      }
    }
    fetchFunc()
  }, [])

  const deleteFnc = async (id: any) => {
    try {
      const res = await axios.delete(`http://localhost:9004/todos/${id}`)
      console.log(res.data)
      setArgs(res.data)
    } catch (error) {
      console.log(error)
    }
  }

  const handleClick = async (event: any) => {
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
  return (
    <div>
      <div>
        <div>
          <input type="text" name="" defaultValue={title} onChange={event => setTitle(event.target.value)} />
          <input type="text" name="" defaultValue={description} onChange={event => setDescription(event.target.value)} />
          <button onClick={handleClick}>追加</button>
        </div>
      </div>
      <ul>
        {args.map((item, index) => <li key={index}>{item.title}
          <button onClick={() => deleteFnc(item.id)}>削除</button></li>)}
      </ul>
    </div>
  )
}

export default testA
