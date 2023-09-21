import FTWEditor from "../../../component/FT/FTW/FTWEditor";
import {useParams} from "react-router-dom";
function FTWEditPage(){
    const {ftwNum} = useParams();

    return(
        <div>
            <FTWEditor ttwNum={ftwNum} />
        </div>
    );
}

export default FTWEditPage;