import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiPlay, FiCheckCircle, FiChevronRight, FiChevronDown,
  FiBookOpen, FiTarget, FiAward, FiClock, FiStar
} from 'react-icons/fi';
import { useParams, useNavigate } from 'react-router-dom';
import ResponsiveNavigation from '../components/ResponsiveNavigation';

const SubjectPageContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  padding: 0;
  position: relative;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background:
      radial-gradient(circle at 20% 80%, rgba(120, 119, 198, 0.3) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.3) 0%, transparent 50%);
    pointer-events: none;
  }
`;

const MainContent = styled.div`
  padding: clamp(24px, 6vw, 40px);
  max-width: 1200px;
  margin: 0 auto;
  position: relative;
  z-index: 2;
  padding-bottom: 100px;

  @media (max-width: 480px) {
    padding: 24px 20px 90px;
  }
`;

const Header = styled.div`
  text-align: center;
  margin-bottom: clamp(30px, 8vw, 48px);
  color: white;

  @media (max-width: 480px) {
    margin-bottom: 30px;
  }
`;

const SubjectTitle = styled(motion.h1)`
  font-size: clamp(28px, 7vw, 3rem);
  font-weight: 800;
  margin: 0 0 clamp(12px, 3vw, 16px) 0;
  background: linear-gradient(135deg, #ffffff 0%, #f0f9ff 100%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

  @media (max-width: 480px) {
    font-size: 32px;
  }
`;

const SubjectInfo = styled(motion.div)`
  font-size: clamp(16px, 4vw, 1.25rem);
  opacity: 0.9;
  margin: 0;
  font-weight: 400;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const ChaptersContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: clamp(20px, 4vw, 32px);
`;

const ChapterCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: clamp(16px, 4vw, 24px);
  padding: clamp(24px, 5vw, 32px);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  position: relative;
  overflow: hidden;

  @media (max-width: 480px) {
    padding: 24px 20px;
    border-radius: 16px;
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 4px;
    background: linear-gradient(90deg, #10b981 0%, #059669 100%);
  }
`;

const ChapterHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  cursor: pointer;

  @media (max-width: 480px) {
    margin-bottom: 16px;
  }
`;

const ChapterTitle = styled.h3`
  font-size: clamp(20px, 5vw, 24px);
  font-weight: 700;
  color: #1f2937;
  margin: 0;
  display: flex;
  align-items: center;
  gap: 12px;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const ChapterIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 12px;
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 20px;

  @media (max-width: 480px) {
    width: 36px;
    height: 36px;
    font-size: 18px;
  }
`;

const ExpandIcon = styled(motion.div)`
  color: #6b7280;
  font-size: 20px;
  transition: transform 0.3s ease;
`;

const ChapterContent = styled(motion.div)`
  overflow: hidden;
`;

const SummarySection = styled.div`
  margin-bottom: 24px;

  @media (max-width: 480px) {
    margin-bottom: 20px;
  }
`;

const SummaryTitle = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 12px 0;
  display: flex;
  align-items: center;
  gap: 8px;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const SummaryText = styled.p`
  font-size: 16px;
  color: #4b5563;
  line-height: 1.6;
  margin: 0;

  @media (max-width: 480px) {
    font-size: 15px;
  }
`;

const ActionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;

  @media (max-width: 480px) {
    gap: 12px;
  }
`;

const ActionButton = styled(motion.button)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  padding: clamp(16px, 4vw, 20px);
  background: ${props => props.primary ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)' : 'white'};
  color: ${props => props.primary ? 'white' : '#374151'};
  border: ${props => props.primary ? 'none' : '2px solid #e5e7eb'};
  border-radius: clamp(12px, 3vw, 16px);
  font-size: clamp(16px, 4vw, 18px);
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: ${props => props.primary ? '0 4px 15px rgba(102, 126, 234, 0.3)' : '0 2px 8px rgba(0, 0, 0, 0.1)'};

  @media (max-width: 480px) {
    padding: 16px 20px;
    font-size: 16px;
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${props => props.primary ? '0 8px 25px rgba(102, 126, 234, 0.4)' : '0 4px 15px rgba(0, 0, 0, 0.15)'};
  }

  &:active {
    transform: translateY(0);
  }
`;

const ActionIcon = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;

const ActionArrow = styled(FiChevronRight)`
  font-size: 18px;
  transition: transform 0.3s ease;
`;

const VideoModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
`;

const VideoContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 32px;
  max-width: 600px;
  width: 100%;
  text-align: center;
  position: relative;

  @media (max-width: 480px) {
    padding: 24px 20px;
    border-radius: 16px;
  }
`;

const VideoTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 16px 0;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const VideoMessage = styled.p`
  font-size: 16px;
  color: #6b7280;
  margin: 0 0 24px 0;
  line-height: 1.6;
`;

const VideoButtons = styled.div`
  display: flex;
  gap: 12px;
  justify-content: center;

  @media (max-width: 480px) {
    flex-direction: column;
  }
`;

const VideoButton = styled.button`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  ${props => props.primary ? `
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
    }
  ` : `
    background: #f3f4f6;
    color: #374151;

    &:hover {
      background: #e5e7eb;
      transform: translateY(-1px);
    }
  `}
`;

const QuizModal = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 20px;
  overflow-y: auto;
`;

const QuizContent = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 32px;
  max-width: 600px;
  width: 100%;
  max-height: 90vh;
  overflow-y: auto;

  @media (max-width: 480px) {
    padding: 24px 20px;
    border-radius: 16px;
    max-height: 95vh;
  }
`;

const QuizTitle = styled.h3`
  font-size: 24px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 24px 0;
  text-align: center;

  @media (max-width: 480px) {
    font-size: 20px;
  }
`;

const QuestionCard = styled.div`
  background: #f9fafb;
  border-radius: 16px;
  padding: 24px;
  margin-bottom: 20px;
  border: 2px solid #e5e7eb;

  @media (max-width: 480px) {
    padding: 20px;
  }
`;

const QuestionText = styled.h4`
  font-size: 18px;
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 16px 0;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const OptionsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const OptionButton = styled.button`
  padding: 14px 20px;
  border: 2px solid ${props => props.selected ? '#10b981' : '#e5e7eb'};
  background: ${props => props.selected ? '#d1fae5' : 'white'};
  color: ${props => props.selected ? '#065f46' : '#374151'};
  border-radius: 12px;
  font-size: 16px;
  text-align: left;
  cursor: pointer;
  transition: all 0.3s ease;

  &:hover {
    border-color: #10b981;
    background: #d1fae5;
    color: #065f46;
  }

  @media (max-width: 480px) {
    padding: 12px 16px;
    font-size: 15px;
  }
`;

const QuizActions = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;

  @media (max-width: 480px) {
    flex-direction: column;
    gap: 12px;
  }
`;

const QuizButton = styled.button`
  padding: 12px 24px;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s ease;
  border: none;

  ${props => props.primary ? `
    background: linear-gradient(135deg, #10b981 0%, #059669 100%);
    color: white;

    &:hover {
      transform: translateY(-2px);
      box-shadow: 0 8px 25px rgba(16, 185, 129, 0.3);
    }
  ` : `
    background: #f3f4f6;
    color: #374151;

    &:hover {
      background: #e5e7eb;
    }
  `}

  @media (max-width: 480px) {
    padding: 14px 20px;
  }
`;

const ResultsContainer = styled.div`
  text-align: center;
  margin-top: 24px;
`;

const ScoreDisplay = styled.div`
  font-size: 48px;
  font-weight: 800;
  color: ${props => props.score >= 80 ? '#10b981' : props.score >= 60 ? '#f59e0b' : '#ef4444'};
  margin-bottom: 16px;

  @media (max-width: 480px) {
    font-size: 36px;
  }
`;

const ScoreText = styled.p`
  font-size: 18px;
  color: #6b7280;
  margin: 0 0 24px 0;

  @media (max-width: 480px) {
    font-size: 16px;
  }
`;

const CorrectionsContainer = styled.div`
  margin-top: 32px;
`;

const CorrectionTitle = styled.h4`
  font-size: 20px;
  font-weight: 700;
  color: #1f2937;
  margin: 0 0 20px 0;

  @media (max-width: 480px) {
    font-size: 18px;
  }
`;

const CorrectionItem = styled.div`
  background: #f9fafb;
  border-radius: 12px;
  padding: 20px;
  margin-bottom: 16px;
  border-left: 4px solid ${props => props.correct ? '#10b981' : '#ef4444'};

  @media (max-width: 480px) {
    padding: 16px;
  }
`;

const CorrectionQuestion = styled.p`
  font-weight: 600;
  color: #1f2937;
  margin: 0 0 8px 0;
`;

const CorrectionAnswer = styled.p`
  color: ${props => props.correct ? '#065f46' : '#dc2626'};
  margin: 0 0 8px 0;
  font-weight: 500;
`;

const CorrectionExplanation = styled.p`
  color: #6b7280;
  margin: 0;
  font-size: 14px;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  background: none;
  border: none;
  font-size: 24px;
  color: #6b7280;
  cursor: pointer;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.3s ease;

  &:hover {
    background: #f3f4f6;
    color: #374151;
  }
`;

const VimeoPlayer = styled.div`
  width: 100%;
  height: 0;
  padding-bottom: 56.25%; // 16:9 aspect ratio
  position: relative;
  background: #000;
  border-radius: 12px;
  overflow: hidden;
  margin-top: 20px;
`;

const VimeoIframe = styled.iframe`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border: none;
`;

const SubjectPage = ({ subjectData }) => {
  const [expandedChapters, setExpandedChapters] = useState({});
  const [showVideoModal, setShowVideoModal] = useState(false);
  const [showQuizModal, setShowQuizModal] = useState(false);
  const [currentChapter, setCurrentChapter] = useState(null);
  const [quizAnswers, setQuizAnswers] = useState({});
  const [quizSubmitted, setQuizSubmitted] = useState(false);
  const [quizScore, setQuizScore] = useState(0);
  const [showVideo, setShowVideo] = useState(false);
  const navigate = useNavigate();

  const toggleChapter = (chapterId) => {
    setExpandedChapters(prev => ({
      ...prev,
      [chapterId]: !prev[chapterId]
    }));
  };

  const handleVideoClick = (chapter) => {
    setCurrentChapter(chapter);
    setShowVideoModal(true);
  };

  const confirmVideoPlay = () => {
    setShowVideoModal(false);
    setShowVideo(true);
  };

  const handleQuizClick = (chapter) => {
    setCurrentChapter(chapter);
    setShowQuizModal(true);
    setQuizAnswers({});
    setQuizSubmitted(false);
    setQuizScore(0);
  };

  const selectAnswer = (questionIndex, answerIndex) => {
    setQuizAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const submitQuiz = () => {
    if (!currentChapter?.quiz) return;

    const totalQuestions = currentChapter.quiz.questions.length;
    let correctAnswers = 0;

    currentChapter.quiz.questions.forEach((question, index) => {
      if (quizAnswers[index] === question.correctAnswer) {
        correctAnswers++;
      }
    });

    const score = Math.round((correctAnswers / totalQuestions) * 100);
    setQuizScore(score);
    setQuizSubmitted(true);
  };

  const closeModals = () => {
    setShowVideoModal(false);
    setShowQuizModal(false);
    setShowVideo(false);
    setCurrentChapter(null);
  };

  if (!subjectData) {
    return (
      <SubjectPageContainer>
        <MainContent>
          <Header>
            <SubjectTitle>Matière non trouvée</SubjectTitle>
          </Header>
        </MainContent>
        <ResponsiveNavigation />
      </SubjectPageContainer>
    );
  }

  return (
    <SubjectPageContainer>
      <MainContent>
        <Header>
          <SubjectTitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            {subjectData.name}
          </SubjectTitle>
          <SubjectInfo
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {subjectData.class} • {subjectData.series || 'Toutes séries'}
          </SubjectInfo>
        </Header>

        <ChaptersContainer>
          {subjectData.chapters.map((chapter, index) => (
            <ChapterCard
              key={chapter.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <ChapterHeader onClick={() => toggleChapter(chapter.id)}>
                <ChapterTitle>
                  <ChapterIcon>
                    <FiBookOpen />
                  </ChapterIcon>
                  Chapitre {chapter.number} : {chapter.title}
                </ChapterTitle>
                <ExpandIcon
                  animate={{ rotate: expandedChapters[chapter.id] ? 180 : 0 }}
                  transition={{ duration: 0.3 }}
                >
                  <FiChevronDown />
                </ExpandIcon>
              </ChapterHeader>

              <AnimatePresence>
                {expandedChapters[chapter.id] && (
                  <ChapterContent
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <SummarySection>
                      <SummaryTitle>
                        <FiTarget />
                        En Bref
                      </SummaryTitle>
                      <SummaryText>{chapter.summary}</SummaryText>
                    </SummarySection>

                    <ActionsContainer>
                      <ActionButton
                        primary
                        onClick={() => handleVideoClick(chapter)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ActionIcon>
                          <FiPlay />
                          Vidéo du cours
                        </ActionIcon>
                        <ActionArrow />
                      </ActionButton>

                      <ActionButton
                        onClick={() => handleQuizClick(chapter)}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <ActionIcon>
                          <FiTarget />
                          Interrogation quiz
                        </ActionIcon>
                        <ActionArrow />
                      </ActionButton>
                    </ActionsContainer>
                  </ChapterContent>
                )}
              </AnimatePresence>
            </ChapterCard>
          ))}
        </ChaptersContainer>
      </MainContent>

      {/* Video Modal */}
      <AnimatePresence>
        {showVideoModal && (
          <VideoModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModals}
          >
            <VideoContent
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <CloseButton onClick={closeModals}>×</CloseButton>
              <VideoTitle>
                <FiPlay style={{ marginRight: '8px' }} />
                Vidéo du cours
              </VideoTitle>
              <VideoMessage>
                Cette vidéo est gratuite pour tous les étudiants. Voulez-vous commencer le cours maintenant ?
              </VideoMessage>
              <VideoButtons>
                <VideoButton primary onClick={confirmVideoPlay}>
                  Commencer le cours (0 FCFA)
                </VideoButton>
                <VideoButton onClick={closeModals}>
                  Plus tard
                </VideoButton>
              </VideoButtons>
            </VideoContent>
          </VideoModal>
        )}
      </AnimatePresence>

      {/* Video Player */}
      <AnimatePresence>
        {showVideo && currentChapter && (
          <VideoModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModals}
          >
            <VideoContent
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              style={{ maxWidth: '900px', padding: '20px' }}
            >
              <CloseButton onClick={closeModals}>×</CloseButton>
              <VideoTitle>Chapitre {currentChapter.number} : {currentChapter.title}</VideoTitle>
              <VimeoPlayer>
                <VimeoIframe
                  src={`https://player.vimeo.com/video/${currentChapter.videoId}?badge=0&autopause=0&player_id=0&app_id=58479`}
                  allow="autoplay; fullscreen; picture-in-picture"
                  title={`Chapitre ${currentChapter.number} : ${currentChapter.title}`}
                />
              </VimeoPlayer>
            </VideoContent>
          </VideoModal>
        )}
      </AnimatePresence>

      {/* Quiz Modal */}
      <AnimatePresence>
        {showQuizModal && currentChapter && (
          <QuizModal
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeModals}
          >
            <QuizContent
              onClick={(e) => e.stopPropagation()}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <CloseButton onClick={closeModals}>×</CloseButton>
              <QuizTitle>
                <FiTarget style={{ marginRight: '8px' }} />
                Quiz - Chapitre {currentChapter.number}
              </QuizTitle>

              {!quizSubmitted ? (
                <>
                  {currentChapter.quiz?.questions.map((question, qIndex) => (
                    <QuestionCard key={qIndex}>
                      <QuestionText>{question.question}</QuestionText>
                      <OptionsContainer>
                        {question.options.map((option, oIndex) => (
                          <OptionButton
                            key={oIndex}
                            selected={quizAnswers[qIndex] === oIndex}
                            onClick={() => selectAnswer(qIndex, oIndex)}
                          >
                            {option}
                          </OptionButton>
                        ))}
                      </OptionsContainer>
                    </QuestionCard>
                  ))}

                  <QuizActions>
                    <QuizButton onClick={closeModals}>Annuler</QuizButton>
                    <QuizButton
                      primary
                      onClick={submitQuiz}
                      disabled={Object.keys(quizAnswers).length !== currentChapter.quiz?.questions.length}
                    >
                      Soumettre
                    </QuizButton>
                  </QuizActions>
                </>
              ) : (
                <ResultsContainer>
                  <ScoreDisplay score={quizScore}>
                    {quizScore}%
                  </ScoreDisplay>
                  <ScoreText>
                    {quizScore >= 80 ? 'Excellent travail !' :
                     quizScore >= 60 ? 'Bon travail, continuez !' :
                     'Vous pouvez faire mieux, réessayez !'}
                  </ScoreText>

                  <CorrectionsContainer>
                    <CorrectionTitle>Corrections</CorrectionTitle>
                    {currentChapter.quiz?.questions.map((question, qIndex) => (
                      <CorrectionItem key={qIndex} correct={quizAnswers[qIndex] === question.correctAnswer}>
                        <CorrectionQuestion>{question.question}</CorrectionQuestion>
                        <CorrectionAnswer correct={quizAnswers[qIndex] === question.correctAnswer}>
                          Votre réponse : {question.options[quizAnswers[qIndex]]}
                        </CorrectionAnswer>
                        <CorrectionExplanation>
                          Réponse correcte : {question.options[question.correctAnswer]}
                          <br />
                          {question.explanation}
                        </CorrectionExplanation>
                      </CorrectionItem>
                    ))}
                  </CorrectionsContainer>

                  <QuizActions>
                    <QuizButton onClick={closeModals}>Fermer</QuizButton>
                    <QuizButton primary onClick={() => handleQuizClick(currentChapter)}>
                      Refaire le quiz
                    </QuizButton>
                  </QuizActions>
                </ResultsContainer>
              )}
            </QuizContent>
          </QuizModal>
        )}
      </AnimatePresence>

      <ResponsiveNavigation />
    </SubjectPageContainer>
  );
};

export default SubjectPage;