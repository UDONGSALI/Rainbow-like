import ClubForm from "../../component/Club/ClubForm";

function ClubFormPage(props){
    const {memId} = props;


    return(
        <div>
            <ClubForm memId = {memId} />
        </div>


);
}

export default ClubFormPage;