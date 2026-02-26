/**
 * Mock data for VocabRecall (PROMPT 2).
 * 12 lessons (2 per category), 4–8 words each, dates in last 3 months (ISO).
 * 4 VocabPhrases for VocabReminder.
 */

import type { Lesson, VocabPhrase } from '@/types';

export const MOCK_LESSONS: Omit<Lesson, 'id'>[] = [
  {
    title: 'Restaurant Vocabulary',
    date: '2026-02-20',
    wordsCount: 5,
    category: 'food',
    words: [
      { word: 'Appetizer', translation: 'Aperitivo', context: 'Would you like to order an appetizer?' },
      { word: 'Medium Rare', translation: 'Ao ponto', context: "I'd like my steak medium rare, please." },
      { word: 'Reservation', translation: 'Reserva', context: 'We have a reservation for two at 7pm.' },
      { word: 'Tip', translation: 'Gorjeta', context: 'Should we leave a tip?' },
      { word: 'Dessert', translation: 'Sobremesa', context: 'The dessert menu looks amazing.' },
    ],
  },
  {
    title: 'International Cuisine Terms',
    date: '2026-02-08',
    wordsCount: 6,
    category: 'food',
    words: [
      { word: 'Sauté', translation: 'Refogar', context: 'Sauté the onions until golden.' },
      { word: 'Simmer', translation: 'Ferver em fogo baixo', context: 'Let the sauce simmer for 20 minutes.' },
      { word: 'Delicacy', translation: 'Iguaria', context: 'Caviar is considered a delicacy.' },
      { word: 'Palate', translation: 'Paladar', context: 'This dish has a complex palate.' },
      { word: 'Garnish', translation: 'Guarnição', context: 'Garnish with fresh herbs.' },
      { word: 'Marinate', translation: 'Marinar', context: 'Marinate the chicken overnight.' },
    ],
  },
  {
    title: 'Team Sports & Rules',
    date: '2026-02-18',
    wordsCount: 5,
    category: 'sports',
    words: [
      { word: 'Overtime', translation: 'Prorrogação', context: 'The game went into overtime.' },
      { word: 'Penalty', translation: 'Penalidade', context: 'The referee called a penalty.' },
      { word: 'Substitution', translation: 'Substituição', context: 'The coach made a substitution.' },
      { word: 'Underdog', translation: 'Azarão', context: 'The underdog team won the championship.' },
      { word: 'Halftime', translation: 'Intervalo', context: 'The score was tied at halftime.' },
    ],
  },
  {
    title: 'Fitness & Exercise Terms',
    date: '2026-01-28',
    wordsCount: 6,
    category: 'sports',
    words: [
      { word: 'Warm-up', translation: 'Aquecimento', context: 'Always do a warm-up before exercising.' },
      { word: 'Repetition', translation: 'Repetição', context: 'Do three sets of 10 repetitions.' },
      { word: 'Stretch', translation: 'Alongar', context: 'Stretch after your workout.' },
      { word: 'Cardio', translation: 'Cardio', context: 'I do cardio three times a week.' },
      { word: 'Reps', translation: 'Repetições', context: 'How many reps did you do?' },
      { word: 'Cool-down', translation: 'Desaquecimento', context: 'Don\'t skip the cool-down.' },
    ],
  },
  {
    title: 'Tech Startups & Product',
    date: '2026-02-22',
    wordsCount: 7,
    category: 'technology',
    words: [
      { word: 'Deploy', translation: 'Implantar', context: 'We will deploy the new version tomorrow.' },
      { word: 'Debugging', translation: 'Depuração', context: 'I spent all morning debugging this code.' },
      { word: 'Framework', translation: 'Framework', context: 'React is a popular JavaScript framework.' },
      { word: 'Repository', translation: 'Repositório', context: 'Clone the repository from GitHub.' },
      { word: 'Merge Conflict', translation: 'Conflito de mesclagem', context: 'We need to resolve this merge conflict.' },
      { word: 'Scalability', translation: 'Escalabilidade', context: 'The system offers great scalability.' },
      { word: 'Load Balancer', translation: 'Balanceador de carga', context: 'We need to configure the load balancer.' },
    ],
  },
  {
    title: 'Software Development Basics',
    date: '2026-01-15',
    wordsCount: 5,
    category: 'technology',
    words: [
      { word: 'API', translation: 'API', context: 'The API returns JSON data.' },
      { word: 'Endpoint', translation: 'Endpoint', context: 'Call this endpoint to get the list.' },
      { word: 'Backend', translation: 'Back-end', context: 'The backend handles authentication.' },
      { word: 'Frontend', translation: 'Front-end', context: 'The frontend is built with React.' },
      { word: 'Database', translation: 'Banco de dados', context: 'We need to query the database.' },
    ],
  },
  {
    title: 'Travel Essentials',
    date: '2026-02-14',
    wordsCount: 6,
    category: 'travel',
    words: [
      { word: 'Itinerary', translation: 'Itinerário', context: 'Please send me your travel itinerary.' },
      { word: 'Boarding Pass', translation: 'Cartão de embarque', context: "Don't forget to print your boarding pass." },
      { word: 'Landmark', translation: 'Marco histórico', context: 'The Eiffel Tower is a famous landmark.' },
      { word: 'Guided Tour', translation: 'Tour guiado', context: 'We booked a guided tour of the city.' },
      { word: 'Sightseeing', translation: 'Turismo', context: 'We went sightseeing all day.' },
      { word: 'Check-in', translation: 'Fazer check-in', context: 'What time is check-in?' },
    ],
  },
  {
    title: 'Hotel & Accommodation',
    date: '2026-01-05',
    wordsCount: 5,
    category: 'travel',
    words: [
      { word: 'Amenities', translation: 'Comodidades', context: 'The hotel has great amenities.' },
      { word: 'Room Service', translation: 'Serviço de quarto', context: 'We ordered room service.' },
      { word: 'Concierge', translation: 'Concierge', context: 'Ask the concierge for recommendations.' },
      { word: 'Check-out', translation: 'Fazer check-out', context: 'Check-out is at 11am.' },
      { word: 'Booking', translation: 'Reserva', context: 'I confirmed my booking online.' },
    ],
  },
  {
    title: 'Public Transportation',
    date: '2026-02-10',
    wordsCount: 5,
    category: 'transports',
    words: [
      { word: 'Layover', translation: 'Escala', context: 'I have a two-hour layover in Miami.' },
      { word: 'Baggage Claim', translation: 'Retirada de bagagem', context: 'Meet me at the baggage claim area.' },
      { word: 'Commute', translation: 'Deslocamento', context: 'My daily commute takes 45 minutes.' },
      { word: 'Rush Hour', translation: 'Horário de pico', context: 'Avoid traveling during rush hour.' },
      { word: 'Transfer', translation: 'Conexão', context: 'We have a transfer in Frankfurt.' },
    ],
  },
  {
    title: 'Driving & Road Vocabulary',
    date: '2026-01-22',
    wordsCount: 6,
    category: 'transports',
    words: [
      { word: 'Roundabout', translation: 'Rotatória', context: 'Take the second exit at the roundabout.' },
      { word: 'Yield', translation: 'Dar preferência', context: 'You must yield to oncoming traffic.' },
      { word: 'Speed Limit', translation: 'Limite de velocidade', context: 'The speed limit is 50 mph.' },
      { word: 'Toll', translation: 'Pedágio', context: 'There is a toll on this highway.' },
      { word: 'Parking Lot', translation: 'Estacionamento', context: 'The parking lot was full.' },
      { word: 'Traffic Jam', translation: 'Congestionamento', context: 'We were stuck in a traffic jam.' },
    ],
  },
  {
    title: 'Business English - Meetings',
    date: '2026-02-24',
    wordsCount: 6,
    category: 'business',
    words: [
      { word: 'Agenda', translation: 'Pauta', context: "We need to set the agenda for tomorrow's meeting." },
      { word: 'Stakeholder', translation: 'Parte interessada', context: 'All stakeholders must approve this decision.' },
      { word: 'Deliverable', translation: 'Entregável', context: 'What are the key deliverables for this project?' },
      { word: 'Deadline', translation: 'Prazo', context: 'The deadline is next Friday.' },
      { word: 'Follow-up', translation: 'Acompanhamento', context: 'Send a follow-up email after the call.' },
      { word: 'Brief', translation: 'Resumo', context: 'Give me a brief overview of the project.' },
    ],
  },
  {
    title: 'Marketing & Advertising',
    date: '2026-02-02',
    wordsCount: 5,
    category: 'business',
    words: [
      { word: 'Campaign', translation: 'Campanha', context: 'Our marketing campaign was very successful.' },
      { word: 'Target Audience', translation: 'Público-alvo', context: 'Who is your target audience?' },
      { word: 'Brand', translation: 'Marca', context: 'We need to strengthen our brand.' },
      { word: 'Conversion', translation: 'Conversão', context: 'Conversion rates have improved.' },
      { word: 'Engagement', translation: 'Engajamento', context: 'User engagement is up this month.' },
    ],
  },
];

export const MOCK_VOCAB_PHRASES: VocabPhrase[] = [
  { word: 'Serendipity', phrase: 'Finding something good without looking for it was pure serendipity.' },
  { word: 'Ephemeral', phrase: 'The beauty of cherry blossoms is ephemeral, lasting only a few weeks.' },
  { word: 'Eloquent', phrase: 'Her eloquent speech moved everyone in the audience.' },
  { word: 'Resilience', phrase: 'Resilience is the key to overcoming setbacks.' },
];
