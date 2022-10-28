import React from "react";
import { useQuery } from "react-query";
import { fetchSchoolSubjects } from "../../../utils/requests/admin";
import { useRouter } from "next/router";
import { SearchSelect } from "../../atoms/input/SearchSelect";

type Props = {
  selectedSubject: string;
  setSelectedSubject: (subjectUUID: string) => void;
};

export const SubjectSelectionField: React.FC<Props> = ({
  selectedSubject,
  setSelectedSubject,
}) => {
  const router = useRouter();
  const schoolUUID = router.query.schoolUUID as string;

  const { data: subjects, status: subjectsStatus } = useQuery(
    ["subjects", schoolUUID],
    () => fetchSchoolSubjects(schoolUUID),
    {
      enabled: !!schoolUUID,
    }
  );

  if (subjectsStatus === "loading") return <div>Loading...</div>;

  if (subjectsStatus === "error") return <div>Error</div>;

  return (
    <>
      <SearchSelect
        selectOptions={subjects?.map((subject) => ({
          label: subject.schoolSubjectAbbreviation,
          value: subject.schoolSubjectUUID,
        }))}
        selectValue={[selectedSubject]}
        selectMultiValues={false}
        onChange={(value) => setSelectedSubject(value.value)}
        editable={true}
        isSmall={true}
      ></SearchSelect>
    </>
  );
};
