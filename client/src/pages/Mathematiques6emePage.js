import React from 'react';
import SubjectPage from '../components/SubjectPage';
import { getSubjectData } from '../data/subjectsData';

const Mathematiques6emePage = () => {
  const subjectData = getSubjectData('mathematiques-6eme');

  return <SubjectPage subjectData={subjectData} />;
};

export default Mathematiques6emePage;