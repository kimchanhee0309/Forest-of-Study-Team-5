import UpdateStudyForm from "../../components/study/UpdateStudyForm/UpdateStudyForm.jsx";
import GNB from "../../components/common/GNB/GNB";

function UpdateStudyPage() {
  return (
    <>
      <GNB showButton={false} />
      <UpdateStudyForm />;
    </>
  );
}

export default UpdateStudyPage;
