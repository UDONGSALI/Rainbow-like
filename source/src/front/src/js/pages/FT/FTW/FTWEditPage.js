import FTWEditor from "../../../component/FT/FTW/FTWEditor";
import {useParams} from "react-router-dom";
function FTWEditPage(props){
    const {ftwNum} = useParams();
    const {memId} = props;

    return(
        <div>
            <FTWEditor ttwNum={ftwNum} memId={memId} />
        </div>
    );
}

export default FTWEditPage;