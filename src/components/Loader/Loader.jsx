import { Bars } from  'react-loader-spinner'

function Loader(props) {
  return (
<Bars
  height="80"
  width="80"
  color="#4fa94d"
  ariaLabel="bars-loading"
  wrapperStyle={{}}
  wrapperClass=""
  visible={true}
/>
  )
}

export default Loader
