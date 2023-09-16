import ClubDetail from "../component/Club/ClubDetail";
import Comment from "../component/Comment/Comment";
import '../../css/component/ClubDetail.css';


function ClubDtlPage(){


    return(
        <div className="post-detailPage">

            <ClubDetail />
            <div className="comment">
                <Comment   />
            </div>
        </div>


);
}

export default ClubDtlPage;