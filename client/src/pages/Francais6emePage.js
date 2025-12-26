import React from 'react';
import SubjectPage from '../components/SubjectPage';
import { getSubjectData } from '../data/subjectsData';

const Francais6emePage = () => {
  const subjectData = getSubjectData('francais-6eme');

  return <SubjectPage subjectData={subjectData} />;
};

export default Francais6emePage;