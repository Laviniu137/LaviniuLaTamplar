@echo off
REM Inițializează repo local, face commit și push către GitHub
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/Laviniu137/la-tamplar.git
git push -u origin main

echo Push complet. Verifică https://github.com/Laviniu137/la-tamplar
pause
