import FTWDtl from "../../../component/FT/FTW/FTWDtl";
import styles from '../../../../css/pages/Club/ClubDtlPage.module.css';

function FTWDtlPage(props){
    const {memId} = props;

    return(
        <div className={styles.postDetailPage}>
            <FTWDtl memId={memId} />
        </div>
    );
}

export default FTWDtlPage;