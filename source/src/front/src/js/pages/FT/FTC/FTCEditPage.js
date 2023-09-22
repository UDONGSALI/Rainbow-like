import FTCEditor from "../../../component/FT/FTC/FTCEditor";
import {useParams} from "react-router-dom";
function FTCEditPage(){
    const {ftcNum} = useParams();

    return(
        <div>
            <FTCEditor ttcNum={ftcNum} />
        </div>
    );
}

export default FTCEditPage;