# Demineur_JS
Création d'un démineur en Javascript.

convention naming:
_variables en camelCase
_fonction en snake_case
_constante en UPPER_SNAKE_CASE comme le veut la convention en Javascript

cheminement logique et points de vigilance

Pour ce démineur, nous commencerons par l'élaboration d'un formulaire avec 4 champs (1 text et 3 number), il faudra bien effectuer la sécurisation et parer à toute les éventualités de saisi qui pourraient entraîner une erreur.
optionnel: enregistrer le pseudo de l'utilisateur en session avec peut-être la possibilité de garder aussi ses statistiques de jeu.
_la validation du formulaire, enverra une requ^tz à l'API, qui nous retournera un tableau de 0 et 1.
_en me basant sur mes souvenirs du démineur je pense que les 1 qui marquent les bombes vont me poser problème lorsque je devrais incrémenter les cases indiquant la promixité d'une bombe, donc la première chose que je vais faire c'est de transformer les 1 en "B", pour éviter tout conflit pendant les opérations numériques.
_ensuite il me faudra une fonction qui parcoure le tableau et à chaque fois qu'elle rencontre un "B", elle incrémentera les 8 cases adjacentes de 1, sauf si une de ces cases est aussi un "B".
_ à la suite de ça on pourra enfin afficher le tableau dans le HTML
_puis il faudra une fonction qui gère les différent cas lorsqu'on clique sur une case:
cas 1: la case contient une bombe -> fin de la partie (défaite)
cas 2: la case ne contient pas de bombe et tout les cases restantes sont des bombes -> fin de la partie (victoire)
cas 3: la case ne contient pas de bombe et il reste des cases non-bombes -> la partie continue, on rappelle la fonction de gestion click sur les cases
optionel:_ donner la possibilité de marquer les cases que l'on soupçonne de contenir une bombe avec un click droit. 
         _faire une fonction qui révélera aussi les cases adjacentes non-bombes, lorsqu'on clique sur une case non-bombe et que la partie continue.
_et enfin faire une fonction pour gérer les fins de partis (victoire/défaite) ainsi que la possibilité de rejouer.


