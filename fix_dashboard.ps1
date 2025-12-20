$content = Get-Content 'client\src\pages\Dashboard.js' -Raw -Encoding UTF8

# Ajouter l'import de useAuth
$content = $content -replace "import ResponsiveNavigation from '../components/ResponsiveNavigation';", "import ResponsiveNavigation from '../components/ResponsiveNavigation';`nimport { useAuth } from '../context/AuthContext';"

# Remplacer const [user, setUser] = useState(null); par const { user } = useAuth();
$content = $content -replace "const \[user, setUser\] = useState\(null\);", "// Récupérer les données utilisateur depuis le contexte d'authentification`n  const { user } = useAuth();"

# Supprimer le useEffect qui simule les données
$content = $content -replace "(?s)useEffect\(\(\) => \{[^}]*firstName: 'Jean'[^}]*\}, \[\]\);", ""

# Sauvegarder le fichier
$content | Out-File 'client\src\pages\Dashboard.js' -Encoding UTF8 -NoNewline

Write-Host "Modifications appliquées avec succès!"
