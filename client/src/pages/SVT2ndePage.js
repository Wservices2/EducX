import React from 'react';
import SubjectPage from '../components/SubjectPage';
import { getSubjectData } from '../data/subjectsData';

const SVT2ndePage = () => {
  const subjectData = getSubjectData('svt-2nde');

  return <SubjectPage subjectData={subjectData} />;
};

export default SVT2ndePage;