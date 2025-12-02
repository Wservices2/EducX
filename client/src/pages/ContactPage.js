import React, { useState } from 'react';
import styled from 'styled-components';
import { FiMail, FiUser, FiMessage, FiCheckCircle } from 'react-icons/fi';
import Header from '../components/Header';
import Footer from '../components/Footer';
import SectionTitle from '../components/SectionTitle';
import Input from '../components/Input';
import Button from '../components/Button';

const PageContainer = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

const Main = styled.main`
  flex: 1;
  max-width: 900px;
  margin: 40px auto;
  padding: 0 20px;
`;

const Card = styled.div`
  background: white;
  border-radius: 20px;
  padding: 32px;
  box-shadow: 0 10px 30px rgba(17,24,39,0.06);
`;

const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 16px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 140px;
  padding: 12px 16px;
  border: 2px solid #e5e7eb;
  border-radius: 12px;
  font-size: 15px;
  font-family: inherit;
  resize: vertical;

  &:focus {
    outline: none;
    border-color: #1e40af;
    box-shadow: 0 0 0 6px rgba(59,130,246,0.06);
    background: white;
  }
`;

const Actions = styled.div`
  display: flex;
  gap: 12px;
  margin-top: 18px;
  justify-content: flex-end;
`;

const SuccessBox = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  padding: 12px 16px;
  border-radius: 12px;
  background: #ecfdf5;
  color: #065f46;
  margin-top: 16px;
`;

const ContactPage = () => {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validate = () => {
    const err = {};
    if (!form.name.trim()) err.name = 'Le nom est requis';
    if (!form.email.trim()) err.email = 'L\'email est requis';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) err.email = 'Email invalide';
    if (!form.subject.trim()) err.subject = 'Le sujet est requis';
    if (!form.message.trim()) err.message = 'Le message est requis';
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmitting(true);
    setSuccess(false);

    try {
      // Ici on simule l'envoi — intégrer l'API serveur si disponible
      await new Promise(res => setTimeout(res, 800));
      setSuccess(true);
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (err) {
      console.error('Contact submit error', err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <Header />
      <Main>
        <SectionTitle icon={() => <FiMail />}>Contactez-nous</SectionTitle>

        <Card>
          <form onSubmit={handleSubmit} noValidate>
            <Grid>
              <div>
                <Input
                  label="Nom"
                  name="name"
                  placeholder="Votre nom complet"
                  value={form.name}
                  onChange={handleChange}
                  error={errors.name}
                />
              </div>

              <div>
                <Input
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="votre@email.com"
                  value={form.email}
                  onChange={handleChange}
                  error={errors.email}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <Input
                  label="Sujet"
                  name="subject"
                  placeholder="Sujet de votre message"
                  value={form.subject}
                  onChange={handleChange}
                  error={errors.subject}
                />
              </div>

              <div style={{ gridColumn: '1 / -1' }}>
                <label style={{ display: 'block', marginBottom: 8, fontWeight: 600, color: '#374151' }}>Message</label>
                <TextArea
                  name="message"
                  placeholder="Écrivez votre message ici..."
                  value={form.message}
                  onChange={handleChange}
                />
                {errors.message && <div style={{ color: '#ef4444', marginTop: 8 }}>{errors.message}</div>}
              </div>
            </Grid>

            <Actions>
              <Button variant="outline" type="button" onClick={() => setForm({ name: '', email: '', subject: '', message: '' })}>Annuler</Button>
              <Button type="submit" loading={submitting}>Envoyer le message</Button>
            </Actions>

            {success && (
              <SuccessBox>
                <FiCheckCircle />
                <div>Merci — votre message a bien été envoyé. Nous vous répondrons bientôt.</div>
              </SuccessBox>
            )}
          </form>
        </Card>
      </Main>
      <Footer />
    </PageContainer>
  );
};

export default ContactPage;
