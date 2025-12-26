import React from 'react';
import SubjectPage from '../components/SubjectPage';
import { getSubjectData } from '../data/subjectsData';

const PhysiqueChimie2ndePage = () => {
  const subjectData = getSubjectData('physique-chimie-2nde');

  return <SubjectPage subjectData={subjectData} />;
};

export default PhysiqueChimie2ndePage;