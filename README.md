# Stie Mobila — site static

Proiect static (HTML/CSS/JS) gata pentru publicare. Urmează pașii de mai jos pentru a publica și a activa deploy-uri automate la fiecare actualizare.

## 1) Inițializare Git și push către GitHub

1. Creează un repository nou pe GitHub.
2. În terminal, din folderul proiectului (`c:\Users\lavin\OneDrive\Desktop\Stie Mobila`) rulează:

```bash
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/<utilizator>/<repo>.git
git push -u origin main
```

Înlocuiește `<utilizator>` și `<repo>` cu datele tale.

## 2) Deploy automat (recomandat): Netlify sau Vercel

- Conectează repository-ul GitHub în Netlify sau Vercel (cont gratuit).
- La fiecare `git push` site-ul se va redeploya automat.
- Netlify/Vercel oferă HTTPS și domeniu custom.

Netlify simplu:
1. Creează cont pe https://app.netlify.com
2. Alege „New site from Git” → conectează GitHub → selectează repository → Deploy.

Vercel simplu:
1. Creează cont pe https://vercel.com
2. Importă proiect din GitHub → Deploy.

## 3) Publicare rapidă fără Git (temporar)

- Netlify: https://app.netlify.com/drop — tragi fișierele din folder în zona de upload.

## 4) Domeniu custom și HTTPS

- Adaugi domeniul în setările Netlify/Vercel/GitHub Pages și urmezi instrucțiunile DNS ale registrar-ului.
- Certificatul SSL este emis automat de majoritatea host-urilor.

---
Dacă vrei, pot:
- să-ți genereze eu comenzile completate (spune-mi `nume-utilizator` și `nume-repo`) și un fișier `deploy.sh` cu comenzile; sau
- să pregătesc un ZIP pentru upload pe Netlify.

Spune-mi ce variantă vrei și continui eu.

## Repo GitHub

Am pregătit scripturi pentru a face push către repo-ul tău:

- https://github.com/Laviniu137/la-tamplar

Fișiere utile în proiect:
- `deploy.sh` — script shell pentru Linux/macOS
- `deploy-windows.bat` — script pentru Windows (cmd)
- `deploy.ps1` — script PowerShell

Rulare (Windows - PowerShell):
```powershell
.\deploy.ps1
```

Rulare (Windows - cmd):
```cmd
deploy-windows.bat
```

Rulare (Linux/macOS):
```bash
sh deploy.sh
```

Notă: Dacă repo-ul nu există sau nu ai permisiunea, crează repo pe GitHub mai întâi și apoi rulează scriptul.