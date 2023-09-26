import ClubMain from "../../component/Club/ClubMain";
import ClubList from "../../component/Club/ClubList";
import styles from '../../../css/pages/Club/ClubPage.module.css';

function ClubPage (props){
    const {memId} = props;

    return(
    <div className={styles.ClubMainPage}>
        <ClubMain />
        <div className={styles.List}>
        <ClubList memId = {memId} />
        </div>
    </div>
    );

}

export default ClubPage;