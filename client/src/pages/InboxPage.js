import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiMail, FiUser, FiClock, FiStar, FiTrash2, FiArchive, FiSend } from 'react-icons/fi';
import ResponsiveNavigation from '../components/ResponsiveNavigation';

const InboxContainer = styled.div`
  min-height: 100vh;
  background: linear-gradient(135deg, #1e3a8a 0%, #3b82f6 25%, #8b5cf6 50%, #ec4899 75%, #f59e0b 100%);
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  padding-bottom: 100px;
  position: relative;

  @keyframes gradientShift {
    0% { background-position: 0% 50%; }
    50% { background-position: 100% 50%; }
    100% { background-position: 0% 50%; }
  }

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: 
      radial-gradient(circle at 20% 80%, rgba(59, 130, 246, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, rgba(236, 72, 153, 0.4) 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, rgba(139, 92, 246, 0.3) 0%, transparent 50%);
    pointer-events: none;
    animation: pulse 8s ease-in-out infinite;
  }

  @keyframes pulse {
    0%, 100% { opacity: 0.8; }
    50% { opacity: 1; }
  }
`;

const Header = styled.div`
  background: linear-gradient(135deg, rgba(30, 58, 138, 0.95) 0%, rgba(59, 130, 246, 0.9) 50%, rgba(139, 92, 246, 0.9) 100%);
  backdrop-filter: blur(25px);
  padding: 50px 20px 40px;
  color: white;
  position: relative;
  overflow: hidden;
  border-bottom-left-radius: 40px;
  border-bottom-right-radius: 40px;
  margin-bottom: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  z-index: 2;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000"><polygon fill="rgba(255,255,255,0.1)" points="0,1000 1000,0 1000,1000"/></svg>');
    background-size: cover;
    opacity: 0.3;
  }

  &::after {
    content: 'EducX';
    position: absolute;
    top: 20px;
    right: 30px;
    font-size: 24px;
    font-weight: 900;
    color: rgba(255, 255, 255, 0.2);
    letter-spacing: 2px;
  }
`;

const HeaderContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const Title = styled(motion.h1)`
  font-size: 28px;
  font-weight: 800;
  margin-bottom: 8px;
  display: flex;
  align-items: center;
  gap: 12px;
`;

const Subtitle = styled(motion.p)`
  font-size: 16px;
  opacity: 0.9;
`;

const MainContent = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 30px 20px;
  position: relative;
  z-index: 2;
`;

const FilterTabs = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 30px;
  overflow-x: auto;
  padding-bottom: 10px;
`;

const FilterTab = styled(motion.button)`
  background: ${props => props.$isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(255, 255, 255, 0.1)'};
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 20px;
  padding: 12px 20px;
  color: white;
  font-weight: 600;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.3s ease;
  white-space: nowrap;

  &:hover {
    background: rgba(255, 255, 255, 0.2);
    transform: translateY(-2px);
  }
`;

const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;

const MessageCard = styled(motion.div)`
  background: rgba(255, 255, 255, 0.95);
  backdrop-filter: blur(20px);
  border-radius: 20px;
  padding: 20px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: ${props => props.$isUnread ? 'linear-gradient(90deg, #3b82f6, #1e40af)' : 'transparent'};
  }

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 15px 40px rgba(0, 0, 0, 0.15);
  }
`;

const MessageHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 12px;
`;

const Avatar = styled.div`
  width: 48px;
  height: 48px;
  background: linear-gradient(135deg, #3b82f6, #1e40af);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 700;
  font-size: 18px;
`;

const MessageInfo = styled.div`
  flex: 1;
`;

const SenderName = styled.h3`
  font-size: 16px;
  font-weight: 700;
  color: #1f2937;
  margin-bottom: 4px;
`;

const MessageTime = styled.div`
  font-size: 12px;
  color: #6b7280;
  display: flex;
  align-items: center;
  gap: 4px;
`;

const MessageContent = styled.div`
  color: #4b5563;
  font-size: 14px;
  line-height: 1.5;
  margin-bottom: 12px;
`;

const MessageActions = styled.div`
  display: flex;
  gap: 8px;
  opacity: 0;
  transition: opacity 0.3s ease;

  ${MessageCard}:hover & {
    opacity: 1;
  }
`;

const ActionButton = styled(motion.button)`
  background: rgba(59, 130, 246, 0.1);
  border: 1px solid rgba(59, 130, 246, 0.2);
  border-radius: 12px;
  padding: 8px 12px;
  color: #3b82f6;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 4px;
  transition: all 0.3s ease;

  &:hover {
    background: rgba(59, 130, 246, 0.2);
    transform: translateY(-1px);
  }
`;

const UnreadBadge = styled(motion.div)`
  position: absolute;
  top: 16px;
  right: 16px;
  width: 12px;
  height: 12px;
  background: linear-gradient(135deg, #ef4444, #dc2626);
  border-radius: 50%;
`;

const EmptyState = styled(motion.div)`
  text-align: center;
  padding: 60px 20px;
  color: white;
`;

const EmptyIcon = styled.div`
  font-size: 64px;
  margin-bottom: 20px;
  opacity: 0.5;
`;

const EmptyText = styled.h3`
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 8px;
`;

const EmptySubtext = styled.p`
  font-size: 14px;
  opacity: 0.8;
`;

const InboxPage = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [messages] = useState([
    {
      id: 1,
      sender: 'Prof. Martin',
      avatar: 'M',
      content: 'Nouveau cours disponible : Mathématiques Avancées. Inscrivez-vous dès maintenant !',
      time: 'Il y a 2h',
      isUnread: true,
      category: 'course'
    },
    {
      id: 2,
      sender: 'Équipe EducX',
      avatar: 'E',
      content: 'Félicitations ! Vous avez terminé votre premier cours. Continuez comme ça !',
      time: 'Il y a 5h',
      isUnread: true,
      category: 'achievement'
    },
    {
      id: 3,
      sender: 'Prof. Sarah',
      avatar: 'S',
      content: 'Rappel : Votre devoir de physique est à rendre demain.',
      time: 'Il y a 1 jour',
      isUnread: false,
      category: 'reminder'
    },
    {
      id: 4,
      sender: 'Support EducX',
      avatar: 'S',
      content: 'Merci pour votre retour. Nous avons résolu le problème de connexion.',
      time: 'Il y a 2 jours',
      isUnread: false,
      category: 'support'
    }
  ]);

  const filters = [
    { id: 'all', label: 'Tous' },
    { id: 'unread', label: 'Non lus' },
    { id: 'course', label: 'Cours' },
    { id: 'achievement', label: 'Réussites' },
    { id: 'reminder', label: 'Rappels' }
  ];

  const filteredMessages = messages.filter(message => {
    if (activeFilter === 'all') return true;
    if (activeFilter === 'unread') return message.isUnread;
    return message.category === activeFilter;
  });

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <ResponsiveNavigation>
      <InboxContainer>
      <Header>
        <HeaderContent>
          <Title
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <FiMail />
            Boîte de réception
          </Title>
          <Subtitle
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            {messages.filter(m => m.isUnread).length} messages non lus
          </Subtitle>
        </HeaderContent>
      </Header>

      <MainContent>
        <FilterTabs>
          {filters.map((filter) => (
            <FilterTab
              key={filter.id}
              $isActive={activeFilter === filter.id}
              onClick={() => setActiveFilter(filter.id)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {filter.label}
            </FilterTab>
          ))}
        </FilterTabs>

        <MessagesList>
          <AnimatePresence>
            {filteredMessages.length > 0 ? (
              filteredMessages.map((message, index) => (
                <MessageCard
                  key={message.id}
                  $isUnread={message.isUnread}
                  variants={itemVariants}
                  initial="hidden"
                  animate="visible"
                  exit="hidden"
                  whileHover={{ scale: 1.02 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <MessageHeader>
                    <Avatar>{message.avatar}</Avatar>
                    <MessageInfo>
                      <SenderName>{message.sender}</SenderName>
                      <MessageTime>
                        <FiClock />
                        {message.time}
                      </MessageTime>
                    </MessageInfo>
                    {message.isUnread && (
                      <UnreadBadge
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.5 + index * 0.1 }}
                      />
                    )}
                  </MessageHeader>
                  
                  <MessageContent>{message.content}</MessageContent>
                  
                  <MessageActions>
                    <ActionButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiSend />
                      Répondre
                    </ActionButton>
                    <ActionButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiArchive />
                      Archiver
                    </ActionButton>
                    <ActionButton
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <FiTrash2 />
                      Supprimer
                    </ActionButton>
                  </MessageActions>
                </MessageCard>
              ))
            ) : (
              <EmptyState
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
              >
                <EmptyIcon>
                  <FiMail />
                </EmptyIcon>
                <EmptyText>Aucun message</EmptyText>
                <EmptySubtext>
                  {activeFilter === 'unread' 
                    ? 'Tous vos messages ont été lus !' 
                    : 'Aucun message dans cette catégorie.'}
                </EmptySubtext>
              </EmptyState>
            )}
          </AnimatePresence>
        </MessagesList>
      </MainContent>

    </InboxContainer>
    </ResponsiveNavigation>
  );
};

export default InboxPage;
