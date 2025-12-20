import codecs
import re

# Lire le fichier avec l'encodage approprié
try:
    with codecs.open('client/src/pages/Dashboard.js', 'r', encoding='utf-8-sig') as f:
        content = f.read()
except:
    with codecs.open('client/src/pages/Dashboard.js', 'r', encoding='utf-16-le') as f:
        content = f.read()

# Modification 1: Ajouter l'import de useAuth
old_import = "import ResponsiveNavigation from '../components/ResponsiveNavigation';"
new_import = "import ResponsiveNavigation from '../components/ResponsiveNavigation';\nimport { useAuth } from '../context/AuthContext';"

content = content.replace(old_import, new_import)

# Modification 2: Remplacer useState(null) par useAuth()
old_code = """const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats] = useState({"""

new_code = """const Dashboard = () => {
  // Récupérer les données utilisateur depuis le contexte d'authentification
  const { user } = useAuth();
  
  // TODO: Remplacer par des appels API réels pour obtenir les statistiques
  const [stats] = useState({"""

content = content.replace(old_code, new_code)

# Modification 3: Supprimer le useEffect qui simule les données
pattern = r"\s*useEffect\(\(\) => \{\s*// Simuler le chargement des données utilisateur\s*const userData = \{\s*firstName: 'Jean'\s*\};\s*setUser\(userData\);\s*\}, \[\]\);\s*"
content = re.sub(pattern, '\n', content, flags=re.MULTILINE)

# Écrire le fichier avec UTF-8 sans BOM
with codecs.open('client/src/pages/Dashboard.js', 'w', encoding='utf-8') as f:
    f.write(content)

print("Fichier modifié avec succès!")
