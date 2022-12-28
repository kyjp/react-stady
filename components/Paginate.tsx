import { useRouter } from 'next/router'
import {FC} from 'react'
import ReactPaginate from 'react-paginate'

type PageType = {
  pageCount: number
  focusPage: number
}

const Paginate: FC<PageType> = ({
  pageCount,
  focusPage
}) => {
 const router = useRouter()
  return (
    <>
      <ReactPaginate
        forcePage={focusPage - 1}
        pageCount={pageCount}
        marginPagesDisplayed={1}
        pageRangeDisplayed={1}
        onPageChange={(event) => {
          router.push({
            pathname: '/list/',
            query: {page: event.selected + 1}
          })
        }}
        containerClassName='pagination'
        pageClassName='page-item'
        pageLinkClassName='page-link'
        activeClassName='active'
        previousLabel='<'
        nextLabel='>'
        previousClassName='page-item'
        nextClassName='page-item'
        previousLinkClassName='page-link'
        nextLinkClassName='page-link'
        disabledClassName='disabled'
        breakLabel='...'
        breakClassName='page-item'
        breakLinkClassName='page-link'
      />
    </>
  )
}

export default Paginate
