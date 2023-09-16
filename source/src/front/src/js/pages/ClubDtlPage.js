import ClubDetail from "../compnent/ClubDetail";
import Comment from "../compnent/Comment";
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