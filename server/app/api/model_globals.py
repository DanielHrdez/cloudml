from sklearn.ensemble import RandomForestClassifier
from sklearn.ensemble import GradientBoostingClassifier
from sklearn.linear_model import LogisticRegression
from sklearn.svm import SVC
from sklearn.neural_network import MLPClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.naive_bayes import GaussianNB
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    make_scorer,
)

RANDOM_STATE = 0
SCORING = {
    "accuracy": make_scorer(accuracy_score),
    "precision_class_0": make_scorer(precision_score, zero_division=0, pos_label=0),
    "precision_class_1": make_scorer(precision_score, zero_division=0, pos_label=1),
    "recall_class_0": make_scorer(recall_score, zero_division=0, pos_label=0),
    "recall_class_1": make_scorer(recall_score, zero_division=0, pos_label=1),
    "f1_class_0": make_scorer(f1_score, zero_division=0, pos_label=0),
    "f1_class_1": make_scorer(f1_score, zero_division=0, pos_label=1),
}
MODELS = [
    RandomForestClassifier(
        n_estimators=100, max_depth=2, random_state=RANDOM_STATE, n_jobs=-1
    ),
    GradientBoostingClassifier(
        n_estimators=128, max_depth=1, random_state=RANDOM_STATE, learning_rate=0.01
    ),
    LogisticRegression(random_state=RANDOM_STATE, max_iter=1000, n_jobs=-1),
    SVC(random_state=RANDOM_STATE, C=0.01, kernel="poly"),
    MLPClassifier(
        random_state=RANDOM_STATE,
        activation="tanh",
        batch_size=32,
        max_iter=1000,
        hidden_layer_sizes=(128, 256),
    ),
    KNeighborsClassifier(n_neighbors=1, n_jobs=-1),
    GaussianNB(var_smoothing=0),
]
