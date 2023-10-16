import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader className="pizza-block"
    speed={2}
    width={280}
    height={531}
    viewBox="0 0 280 531"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <circle cx="140" cy="130" r="130" /> 
    <rect x="0" y="267" rx="10" ry="10" width="280" height="27" /> 
    <rect x="0" y="314" rx="12" ry="12" width="280" height="88" /> 
    <rect x="126" y="422" rx="13" ry="13" width="150" height="43" /> 
    <rect x="2" y="429" rx="9" ry="9" width="90" height="27" />
  </ContentLoader>
)

export default MyLoader