import UpdateStudyForm from "../../components/study/UpdateStudyForm/UpdateStudyForm.jsx";
import GNB from "../../components/common/GNB/GNB";
import { useParams } from "react-router-dom";

function UpdateStudyPage() {
  const { studyId } = useParams();

  return (
    <>
      <GNB showButton={false} />
      <UpdateStudyForm studyId={studyId} />;
    </>
  );
}

export default UpdateStudyPage;
