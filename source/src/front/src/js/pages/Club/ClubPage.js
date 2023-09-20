import ClubMain from "../../component/Club/ClubMain";
import ClubList from "../../component/Club/ClubList";
import styles from '../../../css/pages/Club/ClubPage.module.css';

function ClubPage (){

    return(
    <div className={styles.ClubMainPage}>
        <ClubMain />
        <div className={styles.List}>
        <ClubList />
        </div>
    </div>
    );

}

export default ClubPage;