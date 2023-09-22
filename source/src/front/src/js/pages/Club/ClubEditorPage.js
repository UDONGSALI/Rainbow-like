import ClubEditor from "../../component/Club/ClubEditor";
import {useParams} from "react-router-dom";

function ClubEditorPage(){
    const { postNum } = useParams();


    return(
        <div>
            <ClubEditor postNum = {postNum} />
        </div>


);
}

export default ClubEditorPage;