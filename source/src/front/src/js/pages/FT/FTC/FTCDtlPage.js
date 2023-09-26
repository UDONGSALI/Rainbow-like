import FTCDtl from "../../../component/FT/FTC/FTCDtl";
import styles from '../../../../css/pages/Club/ClubDtlPage.module.css';

function FTCDtlPage(props){
    const {memId} = props;

    return(
        <div className={styles.postDetailPage}>
            <FTCDtl memId = {memId} />
        </div>
    );
}

export default FTCDtlPage;