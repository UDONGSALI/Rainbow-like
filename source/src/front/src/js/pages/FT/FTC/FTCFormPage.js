import FTCForm from "../../../component/FT/FTC/FTCForm";

function FTCFormPage(props){
    const {memId} = props;

    return(
        <div>
            <FTCForm memId={memId}/>
        </div>
    );
}

export default FTCFormPage;