from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import (
    f1_score,
    make_scorer,
)


RANDOM_STATE = 0
SCORING = {
    "f1_class_0": make_scorer(f1_score, zero_division=0, pos_label=0),
    "f1_class_1": make_scorer(f1_score, zero_division=0, pos_label=1),
}
MODELS = [
    RandomForestClassifier(
        n_estimators=16, max_depth=1, random_state=RANDOM_STATE, n_jobs=-1
    ),
    GradientBoostingClassifier(
        n_estimators=16, max_depth=8, random_state=RANDOM_STATE, learning_rate=0.01
    ),
    # LogisticRegression(random_state=RANDOM_STATE, max_iter=100, n_jobs=-1),
    # SVC(random_state=RANDOM_STATE, C=0.01, kernel="poly", probability=True),
    MLPClassifier(
        random_state=RANDOM_STATE,
        activation="relu",
        batch_size=128,
        max_iter=100,
        hidden_layer_sizes=(8),
        learning_rate="adaptive",
        learning_rate_init=0.1,
        early_stopping=True,
        validation_fraction=0.2,
        verbose=False,
    ),
    # KNeighborsClassifier(n_neighbors=5, n_jobs=-1),
    # GaussianNB(var_smoothing=0),
]
