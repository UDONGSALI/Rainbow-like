import FTWForm from "../../../component/FT/FTW/FTWForm";

function FTWFormPage(props){
    const {memId} = props;

    return(
        <div>
            <FTWForm memId={memId}/>
        </div>
    );
}

export default FTWFormPage;