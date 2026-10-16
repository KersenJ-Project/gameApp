# 🎮 GameApp

Application mobile de mini-jeux faite avec React Native et Expo. Le but : regrouper plusieurs jeux dans une seule app, accessibles depuis une barre latérale.

Pour l'instant, un jeu est disponible : le **Memory Card Game**.

---

## 🃏 Memory Card Game

### But du jeu

Retrouver toutes les paires de fruits cachées, en faisant le moins de coups possible.

### Comment jouer

1. 16 cartes sont affichées face cachée (`?`). Elles forment 8 paires d'emojis.
2. Appuie sur une carte pour la retourner, puis sur une deuxième.
3. **Même emoji** : la paire est trouvée. Les cartes restent visibles et deviennent vertes.
4. **Emojis différents** : les deux cartes se retournent de nouveau après un court instant. Essaie de mémoriser leur position.
5. La partie se termine quand toutes les paires sont trouvées. Un message de victoire affiche ton nombre de coups.
6. Le bouton **New Game** mélange les cartes et remet tout à zéro.

### Score et coups

- **Score** : nombre de paires trouvées.
- **Moves** : nombre de tentatives. Un coup correspond à deux cartes retournées.

### Animations

- Les cartes pivotent en 3D quand on les retourne.
- Une paire trouvée fait un petit effet « pop » et passe au vert.
- Les cartes apparaissent l'une après l'autre au début de chaque partie.
- Le score et les coups « rebondissent » quand ils changent.
- Le message de victoire apparaît avec un effet de ressort.


### Déroulement d'un tour

1. Le joueur appuie sur une carte : `handleCardPress` la retourne.
2. Si c'est la première carte, le jeu attend la seconde.
3. Si c'est la seconde, le jeu **verrouille** les appuis, compte un coup et compare les deux valeurs.
4. Après un court délai, les cartes sont soit marquées comme trouvées, soit retournées face cachée.
5. Le jeu se déverrouille et le joueur peut continuer.

---

## Technologies

- Expo + Expo Router
- React Native
- NativeWind (Tailwind CSS)
- react-native-reanimated (animations)
- react-native-gesture-handler

---

## Lancer le projet

```bash
npm install
npx expo install --fix
npx expo start
```

Scanne le QR code avec Expo Go, ou appuie sur `w` pour ouvrir dans le navigateur.