import { ChangeEvent } from "react";
import Button from "../../components/Button";
import Paginate from "../../components/Paginate";
import { useListHooks } from "./useListHooks"

const List = () => {
  const { array, load, error, page, pageCount, description, setDescription, title, setTitle, handleClick, todoAdd } = useListHooks()
  if(load) return (<>ロード中...</>)
  if(error) return (<>エラーが発生しました</>)
  return (
    <div>
      <h1>
        Todos
      </h1>
      <div>
        <form action="post">
          <div>
            タイトル：
            <input type="text" defaultValue={title} onChange={(event: ChangeEvent<HTMLInputElement>) => setTitle(event.target.value)} />
          </div>
          <div>
            説明文：
            <input type="text" defaultValue={description} onChange={(event: ChangeEvent<HTMLInputElement>) => setDescription(event.target.value)} />
          </div>
          <Button
            onClick={event => todoAdd(event)}
          >
            追加
          </Button>
        </form>
      </div>
      <ul>
        {array.map((item, index) => (
          <li key={item.id} data-testid={`item-${index}`}>
            {item.title}
            <Button
              onClick={_ => handleClick(item.id)}
            >
              削除
            </Button>
          </li>)
        )}
      </ul>
      <div>
        <Paginate
          pageCount={Number(pageCount)}
          focusPage={Number(page)}
        />
      </div>
    </div>
  );
}

export default List
