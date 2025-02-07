import Grid from "./components/Grid"
import Herosection from "./components/Herosection"
import TOPSELLING from "./components/topselling"
import Xscrollwrapper from "./components/xscrollwrapper"
import DRESSNEW from "./components/new arrivals"

function page (){
  return (
    <><Herosection /><DRESSNEW /><TOPSELLING/><Grid /> <Xscrollwrapper /></>
  )
}
 
export default page