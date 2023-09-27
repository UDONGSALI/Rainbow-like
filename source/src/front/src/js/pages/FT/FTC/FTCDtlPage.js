import FTCDtl from "../../../component/FT/FTC/FTCDtl";
import styles from '../../../../css/pages/Club/ClubDtlPage.module.css';
import FTWDtl from "../../../component/FT/FTW/FTWDtl";
import { useParams, useNavigate } from 'react-router-dom';


function FTCDtlPage(props){
    const {memId} = props;
    const { id } = useParams();





    return(
        <div className={styles.postDetailPage}>
            <FTCDtl memId = {memId} />

        </div>
    );
}

export default FTCDtlPage;