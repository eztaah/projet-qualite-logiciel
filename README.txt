Pour initialiser playwright sur un dossier vide :
$ npm init playwright@latest --force

---------------------
Quand on clone le depot : 
1. Installer node.js
2. $ npm install
3. $ npx playwright install

---------------------
Pour executer les tests : 
$ npx playwright test --ui                   # pour lancer les tests avec une ui
$ npx playwright test                        # pour lancer les tests en headless
$ npx playwright test tests/login.spec.ts    # pour lancer un test en particulier
