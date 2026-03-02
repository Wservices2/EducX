const BENIN_COMMUNES = [
  'Abomey',
  'Abomey-Calavi',
  'Adja-Ouere',
  'Adjarra',
  'Adjohoun',
  'Agbangnizoun',
  'Aguégues',
  'Akpro-Misserete',
  'Allada',
  'Aplahoue',
  'Athieme',
  'Avrankou',
  'Banikoara',
  'Bante',
  'Bassila',
  'Bembereke',
  'Bohicon',
  'Bonou',
  'Bopa',
  'Boukoumbe',
  'Cobly',
  'Come',
  'Copargo',
  'Cotonou',
  'Cove',
  'Dangbo',
  'Dassa-Zoume',
  'Djakotomey',
  'Djidja',
  'Djougou',
  'Dogbo',
  'Glazoue',
  'Gogounou',
  'Grand-Popo',
  'Houeyogbe',
  'Ifangni',
  'Kalale',
  'Kandi',
  'Karimama',
  'Kerou',
  'Ketou',
  'Klouekanme',
  'Kouande',
  'Kpomasse',
  'Lalo',
  'Lokossa',
  'Malanville',
  'Materi',
  'Natitingou',
  'Ndali',
  'Nikki',
  'Ouake',
  'Ouidah',
  'Ouinhi',
  'Ouessè',
  'Parakou',
  'Pehunco',
  'Perere',
  'Pobe',
  'Porto-Novo',
  'Sakete',
  'Savalou',
  'Save',
  'Segbana',
  'Seme-Podji',
  'Sinende',
  'So-Ava',
  'Tanguieta',
  'Tchaourou',
  'Toffo',
  'Tori-Bossito',
  'Toucountouna',
  'Toviklin',
  'Ze',
  'Za-Kpota',
  'Zagnanado',
  'Zogbodomey'
];

const normalizeCommune = (value = '') =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[']/g, '')
    .trim()
    .toLowerCase();

const BENIN_COMMUNE_LOOKUP = new Map(
  BENIN_COMMUNES.map((commune) => [normalizeCommune(commune), commune])
);

const toCanonicalCommune = (value) => BENIN_COMMUNE_LOOKUP.get(normalizeCommune(value)) || null;

module.exports = {
  BENIN_COMMUNES,
  toCanonicalCommune
};
