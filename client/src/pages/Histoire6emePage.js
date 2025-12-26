import React from 'react';
import SubjectPage from '../components/SubjectPage';
import { getSubjectData } from '../data/subjectsData';

const Histoire6emePage = () => {
  const subjectData = getSubjectData('histoire-6eme');

  return <SubjectPage subjectData={subjectData} />;
};

export default Histoire6emePage;