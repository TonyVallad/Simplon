### **<h1 align="center">Veille Cross-validation & Hypertunning</h1>**

## Validation croisée (cross-validation)

### **1. Concepts de base**

#### Qu’est-ce que la validation croisée et pourquoi est-elle importante dans l’entraînement des modèles de machine learning ?
Validation croisée est une méthode d'évaluation utilisée pour mesurer la performance d’un modèle sur un ensemble de données, en divisant les données en plusieurs sous-ensembles appelés "folds". Cette technique permet :
- D'obtenir une évaluation plus robuste et représentative des performances du modèle.
- De réduire les biais causés par un simple train/test split.
- De mieux comprendre la généralisation du modèle sur des données non vues.

#### Quelle est la différence entre la validation simple (train/test split) et la validation croisée ?
- **Validation simple** : Divise les données en deux parties (train et test). Elle est rapide mais peut donner des résultats biaisés si la division n’est pas représentative.
- **Validation croisée** : Divise les données en plusieurs folds et effectue plusieurs cycles d’entraînement/évaluation pour utiliser toutes les données à la fois comme ensemble d’entraînement et de test. Elle donne une évaluation plus fiable mais est plus coûteuse en calcul.

---

### **2. Types de validation croisée**

#### Quelles sont les différences entre k-fold cross-validation, leave-one-out cross-validation (LOOCV) et stratified k-fold cross-validation ?
- **k-fold cross-validation** : Divise les données en k folds. Chaque fold est utilisé une fois pour le test, et les autres pour l’entraînement. Moins coûteux que LOOCV.
- **Leave-One-Out Cross-Validation (LOOCV)** : Chaque point de données est utilisé comme test une fois, tandis que les autres servent pour l’entraînement. Précis mais coûteux pour de grands ensembles de données.
- **Stratified k-fold cross-validation** : Similar to k-fold but respecte la distribution des classes dans chaque fold, ce qui est crucial pour les données déséquilibrées.

#### Dans quels cas utiliser stratified k-fold cross-validation plutôt qu’une validation croisée classique ?
- Lorsque les données sont déséquilibrées (par exemple, un problème de classification binaire avec des classes majoritaires et minoritaires). Cela garantit que chaque fold conserve la même proportion des classes, améliorant ainsi la représentativité.

---

### **3. Applications et limites**

#### Quels sont les avantages et les inconvénients de la validation croisée pour les ensembles de données déséquilibrés ?
- **Avantages** :
  - Réduit les biais en utilisant stratified k-fold pour équilibrer la répartition des classes.
  - Évalue la robustesse du modèle même sur des classes minoritaires.
- **Inconvénients** :
  - Peut augmenter le temps de calcul si les données sont volumineuses.
  - Les performances mesurées peuvent être biaisées si les classes minoritaires sont très sous-représentées.

#### Comment la validation croisée permet-elle d’éviter le surapprentissage (overfitting) ?
En testant le modèle sur des folds de données non vues à chaque itération, la validation croisée simule des scénarios réels d’utilisation. Elle aide à détecter si le modèle est trop ajusté aux données d’entraînement (overfitting) en observant les performances sur les données de test.

---

### **4. Métriques et résultats**

#### Que représente le score moyen obtenu lors d’une validation croisée ?
Le score moyen est une estimation des performances générales du modèle sur des données non vues. Il reflète la capacité du modèle à généraliser.

#### Comment interpréter la variance des scores sur les différents plis (folds) ?
- **Faible variance** : Indique que le modèle est cohérent et robuste sur différents sous-ensembles des données.
- **Forte variance** : Suggère que le modèle est sensible aux variations dans les données, ce qui peut indiquer un problème de surapprentissage ou de sous-apprentissage.

## Optimisation des hyperparamètres (GridSearchCV et
RandomizedSearchCV)

### **1. Concepts de base**

#### Quelle est la différence entre les paramètres d’un modèle et ses hyperparamètres ?
- **Paramètres d’un modèle** : Appris directement par le modèle pendant l’entraînement (par ex., les coefficients dans une régression linéaire ou les poids dans un réseau de neurones).
- **Hyperparamètres** : Fixés manuellement avant l’entraînement et non appris automatiquement (par ex., le nombre d’arbres dans une forêt aléatoire ou le taux d’apprentissage dans un réseau neuronal).

#### Pourquoi les hyperparamètres nécessitent-ils une optimisation séparée ?
- Les hyperparamètres contrôlent le comportement du modèle et influencent directement sa capacité à bien s'adapter aux données (sur- ou sous-apprentissage).
- Une optimisation séparée est nécessaire pour identifier les combinaisons d’hyperparamètres qui maximisent les performances sur les données de validation.

---

### **2. Approches d’optimisation**

#### Comment fonctionne GridSearchCV ? Quels en sont les avantages et inconvénients ?
- **Fonctionnement** :
  - GridSearchCV teste toutes les combinaisons possibles d’un ensemble de valeurs prédéfini pour les hyperparamètres.
  - Il utilise une validation croisée pour évaluer chaque combinaison.
- **Avantages** :
  - Explore systématiquement toutes les options, garantissant de trouver la meilleure combinaison dans les plages spécifiées.
  - Simple à configurer et interpréter.
- **Inconvénients** :
  - Coût computationnel élevé, surtout avec de grands ensembles de données ou de nombreuses combinaisons d’hyperparamètres.

#### Comment RandomizedSearchCV diffère-t-il de GridSearchCV et dans quels cas est-il préférable ?
- **Différences** :
  - RandomizedSearchCV ne teste qu’un sous-ensemble aléatoire des combinaisons d’hyperparamètres, défini par un nombre d’itérations.
  - Moins exhaustif mais plus rapide.
- **Quand l’utiliser** :
  - Lorsque les données ou l’espace d’hyperparamètres sont vastes et que le temps ou les ressources computationnelles sont limités.
  - Lorsque certaines plages d’hyperparamètres sont plus susceptibles de contenir de bonnes solutions (RandomizedSearchCV permet de couvrir ces plages plus efficacement).

#### Quels sont les facteurs influençant le choix de la méthode d’optimisation (taille des données, coût computationnel) ?
- **Taille des données** : Des ensembles volumineux favorisent RandomizedSearchCV pour limiter le temps d’entraînement.
- **Coût computationnel** : Si le modèle est coûteux à entraîner, RandomizedSearchCV est préférable.
- **Importance de l’exploration** : Si une exploration exhaustive est critique, GridSearchCV est idéal.

---

### **3. Configuration et choix**

#### Qu’est-ce que le paramètre `cv` dans GridSearchCV et pourquoi son choix est-il critique ?
- **cv** détermine le nombre de folds utilisés pour la validation croisée.
- Un choix adéquat est critique pour équilibrer :
  - **Fiabilité** : Plus de folds augmentent la précision des estimations mais sont plus coûteux.
  - **Représentativité** : Un nombre de folds trop faible peut conduire à des estimations biaisées.

#### Comment choisir les hyperparamètres et les plages de valeurs à tester ?
- **Basé sur la documentation du modèle** : Identifier les hyperparamètres ayant le plus d’impact.
- **Approche empirique** : Tester d’abord des plages larges, puis les affiner autour des valeurs prometteuses.
- **Utiliser des connaissances du domaine** : Certaines valeurs peuvent être éliminées à l’avance en fonction des contraintes du problème.

---

### **4. Problèmes courants**

#### Quels risques peuvent survenir si la validation croisée est mal configurée dans GridSearchCV ?
- **Overfitting** : Si `cv` est mal configuré (par ex., avec des folds non représentatifs), le modèle peut sur-apprendre sur les données de validation.
- **Sous-évaluation** : Un nombre insuffisant de folds peut donner des performances peu fiables.

#### Que signifie le terme *data leakage* dans le contexte de l’optimisation des hyperparamètres, et comment l’éviter ?
- **Data leakage** : Se produit lorsque des informations des données de test (ou validation) "fuitent" dans les données d’entraînement, faussant ainsi les performances du modèle.
- **Comment l’éviter** :
  - Appliquer strictement les transformations (comme le scaling) sur chaque fold séparément, en s’assurant que les données de test ne contaminent jamais les données d’entraînement.
  - Maintenir des ensembles de test complètement séparés.

---

### **5. Métriques et performance**

#### Comment évaluer les performances des modèles obtenus via GridSearchCV ou RandomizedSearchCV ?
- Analyser la **moyenne des scores** sur les folds pour évaluer la performance globale.
- Examiner la **variance des scores** pour identifier la robustesse du modèle.
- Comparer les performances sur un ensemble de test séparé pour une évaluation finale.

#### Pourquoi privilégier une métrique spécifique (par exemple, *accuracy* vs *F1-score*) pour certains problèmes ?
- **Accuracy** : Pertinente lorsque les classes sont équilibrées.
- **F1-score** : Préférée pour des données déséquilibrées, car elle équilibre précision (precision) et rappel (recall).
- Le choix de la métrique dépend du coût des erreurs dans le contexte du problème (par ex., détecter des fraudes favorise le rappel, tandis que diagnostiquer des maladies peut nécessiter un F1-score élevé).