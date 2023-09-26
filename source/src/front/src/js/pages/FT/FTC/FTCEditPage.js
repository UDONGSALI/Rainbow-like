import FTCEditor from "../../../component/FT/FTC/FTCEditor";
import {useParams} from "react-router-dom";
function FTCEditPage(props){
    const {ftcNum} = useParams();
    const {memId} = props;

    return(
        <div>
            <FTCEditor ttcNum={ftcNum} memId={memId} />
        </div>
    );
}

export default FTCEditPage;