import React from 'react';
import SubjectPage from '../components/SubjectPage';
import { getSubjectData } from '../data/subjectsData';

const PhilosophieTerminalePage = () => {
  const subjectData = getSubjectData('philosophie-terminale');

  return <SubjectPage subjectData={subjectData} />;
};

export default PhilosophieTerminalePage;