#!/usr/bin/env python3
Matrices, numerical calculations
"""
MATHEMATICS FOR AI AND MACHINE LEARNING
=======================================

Learning order:
  01. Arithmetic and algebra
  02. Functions, exponents and logarithms
  03. Vectors and norms
  04. Matrices and linear transformations
  05. Dot products, similarity and distances
  06. Calculus, derivatives and chain rule
  07. Probability
  08. Statistics
  09. Conditional probability and Bayes' theorem
  10. Optimization and gradient descent
  11. Linear regression
  12. Logistic regression
  13. Neural networks and backpropagation
  14. Classification metrics
  15. Regularization
  16. Principal Component Analysis (PCA)

Install:
    python -m pip install numpy

Run:
    python mathematics_for_ai_ml.py
    python mathematics_for_ai_ml.py --list
    python mathematics_for_ai_ml.py --lesson 11

These are educational demonstrations, not production ML systems.
"""

import argparse
import math
import sys

try:
    import numpy as np
except ImportError:
    print("NumPy is required. Install it using:")
    print("python -m pip install numpy")
    sys.exit(1)


# ============================================================
# REUSABLE HELPERS
# ============================================================

def heading(number, title):
    print("\n" + "=" * 68)
    print(f"LESSON {number:02d}: {title}")
    print("=" * 68)


def section(title):
    print(f"\n--- {title} ---")


def show(name, value):
    print(f"{name} = {np.array2string(np.asarray(value), precision=4)}")


def sigmoid(z):
    """Map a real number or array of numbers to probabilities."""
    z = np.asarray(z, dtype=float)
    return 1.0 / (1.0 + np.exp(-np.clip(z, -500, 500)))


def softmax(values):
    """Convert scores into probabilities whose sum is one."""
    values = np.asarray(values, dtype=float)
    shifted = values - np.max(values)
    exp_values = np.exp(shifted)
    return exp_values / np.sum(exp_values)


def safe_divide(a, b):
    return a / b if b != 0 else 0.0


# ============================================================
# 01. ARITHMETIC AND ALGEBRA
# ============================================================

def lesson_01_foundations():
    heading(1, "Arithmetic and algebra")

    section("Order of operations")
    print("3 + 2 * 4 =", 3 + 2 * 4)
    print("(3 + 2) * 4 =", (3 + 2) * 4)

    section("Variables and equations")
    print("Suppose y = 2x + 3.")
    for x in range(4):
        print(f"When x={x}, y={2 * x + 3}")

    section("Summations and averages")
    values = [2, 4, 6, 8]
    print("Values:", values)
    print("Sum:", sum(values))
    print("Mean:", sum(values) / len(values))

    print("\nAI/ML connection:")
    print("Model parameters are variables. Training often minimizes an")
    print("average loss calculated across many examples.")


# ============================================================
# 02. FUNCTIONS, EXPONENTS AND LOGARITHMS
# ============================================================

def lesson_02_functions():
    heading(2, "Functions, exponents and logarithms")

    section("Functions")
    def f(x):
        return x**2 + 2*x + 1

    for x in [-2, -1, 0, 1, 2]:
        print(f"f({x}) = {f(x)}")

    section("Exponents and logarithms")
    print("2^5 =", 2**5)
    print("log2(32) =", math.log2(32))
    print("ln(e^3) =", math.log(math.exp(3)))
    print("log(a*b) = log(a) + log(b), for positive a and b.")

    section("Sigmoid")
    for x in [-4, -1, 0, 1, 4]:
        print(f"sigmoid({x}) = {float(sigmoid(x)):.4f}")

    section("Softmax")
    scores = np.array([2.0, 1.0, 0.1])
    probabilities = softmax(scores)
    show("Scores", scores)
    show("Probabilities", probabilities)
    print("Probability sum:", probabilities.sum())

    print("\nAI/ML connection:")
    print("Sigmoid is common for binary classification.")
    print("Softmax is common for multiclass classification.")


# ============================================================
# 03. VECTORS AND NORMS
# ============================================================

def lesson_03_vectors():
    heading(3, "Vectors and norms")

    v = np.array([3.0, 4.0])
    w = np.array([1.0, 2.0])

    show("Vector v", v)
    show("Vector w", w)
    show("v + w", v + w)
    show("v - w", v - w)
    show("3 * v", 3 * v)

    print("L1 norm:", np.linalg.norm(v, ord=1))
    print("L2 norm:", np.linalg.norm(v))
    print("Squared L2 norm:", np.sum(v**2))

    print("\nAI/ML connection:")
    print("Feature vectors represent examples; parameter vectors store weights.")
    print("Norms measure size and are used in regularization.")


# ============================================================
# 04. MATRICES AND LINEAR TRANSFORMATIONS
# ============================================================

def lesson_04_matrices():
    heading(4, "Matrices and linear transformations")

    A = np.array([[1.0, 2.0], [3.0, 4.0]])
    B = np.array([[2.0, 0.0], [1.0, 2.0]])

    print("A =\n", A)
    print("B =\n", B)
    print("A + B =\n", A + B)
    print("A transpose =\n", A.T)
    print("Element-wise A * B =\n", A * B)
    print("Matrix multiplication A @ B =\n", A @ B)

    section("Features multiplied by model weights")
    X = np.array([[1, 10], [2, 20], [3, 30]], dtype=float)
    weights = np.array([0.5, -0.1])
    bias = 1.0
    predictions = X @ weights + bias

    print("Feature matrix shape:", X.shape)
    print("Weight vector shape:", weights.shape)
    show("Predictions", predictions)

    section("Determinant and inverse")
    C = np.array([[2.0, 1.0], [1.0, 2.0]])
    print("det(C) =", np.linalg.det(C))
    print("inverse(C) =\n", np.linalg.inv(C))

    print("\nAI/ML connection:")
    print("Neural network layers heavily use matrix multiplication.")
    print("Matrix dimensions must agree for multiplication to be valid.")


# ============================================================
# 05. DOT PRODUCTS, SIMILARITY AND DISTANCES
# ============================================================

def lesson_05_similarity():
    heading(5, "Dot products, similarity and distances")

    a = np.array([1.0, 2.0, 3.0])
    b = np.array([2.0, 1.0, 4.0])

    dot = float(a @ b)
    denominator = float(np.linalg.norm(a) * np.linalg.norm(b))
    cosine = safe_divide(dot, denominator)

    show("a", a)
    show("b", b)
    print("Dot product:", dot)
    print("Euclidean distance:", np.linalg.norm(a - b))
    print("Cosine similarity:", cosine)

    print("\nWeighted sum example")
    features = np.array([10.0, 0.5, 2.0])
    weights = np.array([0.2, 4.0, -1.0])
    bias = 0.5
    print("Weighted sum plus bias:", features @ weights + bias)

    print("\nAI/ML connection:")
    print("Dot products appear in neurons, attention and similarity search.")
    print("Distance measures appear in clustering and nearest-neighbour methods.")


# ============================================================
# 06. CALCULUS AND DERIVATIVES
# ============================================================

def lesson_06_calculus():
    heading(6, "Calculus, derivatives and the chain rule")

    section("A derivative is a rate of change")
    print("For f(x) = x^2, f'(x) = 2x.")

    x = 3.0
    epsilon = 1e-5
    exact = 2 * x
    forward = ((x + epsilon)**2 - x**2) / epsilon
    central = ((x + epsilon)**2 - (x - epsilon)**2) / (2 * epsilon)

    print("Exact derivative at x=3:", exact)
    print("Forward numerical estimate:", forward)
    print("Central numerical estimate:", central)

    section("Useful derivative rules")
    print("d(c)/dx = 0")
    print("d(x^n)/dx = n*x^(n-1)")
    print("d(exp(x))/dx = exp(x)")
    print("d(ln(x))/dx = 1/x, for x > 0")
    print("d(sigmoid(x))/dx = sigmoid(x)*(1-sigmoid(x))")

    section("Chain rule")
    print("If y=f(g(x)), then dy/dx = f'(g(x))*g'(x).")
    print("For y=(3x+1)^2, dy/dx = 6*(3x+1).")
    print("At x=2, derivative =", 6 * (3 * 2 + 1))

    print("\nAI/ML connection:")
    print("Training algorithms use derivatives to determine how parameters")
    print("should change to reduce a model's loss.")


# ============================================================
# 07. PROBABILITY
# ============================================================

def lesson_07_probability():
    heading(7, "Probability")

    print("Fair coin: P(heads) =", 1 / 2)
    print("Fair die: P(rolling a 6) =", 1 / 6)

    section("Expected value")
    outcomes = np.array([1, 2, 3, 4, 5, 6], dtype=float)
    probabilities = np.full(6, 1 / 6)
    expected_value = np.sum(outcomes * probabilities)
    print("Expected value of a fair die:", expected_value)

    section("Independence")
    print("For independent events A and B:")
    print("P(A and B) = P(A) * P(B)")
    print("Two heads in two independent fair tosses =", 0.5 * 0.5)

    print("\nAI/ML connection:")
    print("Probability describes uncertainty, random variables and predictions.")
    print("Many models estimate the probability of a class or outcome.")


# ============================================================
# 08. STATISTICS
# ============================================================

def lesson_08_statistics():
    heading(8, "Statistics: mean, variance and correlation")

    x = np.array([2.0, 4.0, 4.0, 6.0, 9.0])
    y = np.array([1.0, 3.0, 3.0, 5.0, 8.0])

    show("Data x", x)
    print("Mean:", np.mean(x))
    print("Median:", np.median(x))
    print("Population variance:", np.var(x))
    print("Population standard deviation:", np.std(x))
    print("Sample variance:", np.var(x, ddof=1))

    print("Sample covariance of x and y:", np.cov(x, y, ddof=1)[0, 1])
    print("Correlation of x and y:", np.corrcoef(x, y)[0, 1])

    z_scores = (x - np.mean(x)) / np.std(x)
    show("Standardized z-scores", z_scores)

    print("\nAI/ML connection:")
    print("Statistics helps summarize data, detect variability and evaluate")
    print("feature relationships. Correlation does not prove causation.")
    print("For ML, calculate preprocessing statistics from training data only.")


# ============================================================
# 09. CONDITIONAL PROBABILITY AND BAYES' THEOREM
# ============================================================

def lesson_09_bayes():
    heading(9, "Conditional probability and Bayes' theorem")

    print("Conditional probability:")
    print("P(A|B) = P(A and B) / P(B), provided P(B) > 0.")
    print("Bayes' theorem:")
    print("P(A|B) = P(B|A) * P(A) / P(B).")

    section("Hypothetical numerical example")
    prevalence = 0.01
    sensitivity = 0.95
    false_positive_rate = 0.05

    p_positive = (
        sensitivity * prevalence
        + false_positive_rate * (1 - prevalence)
    )
    posterior = sensitivity * prevalence / p_positive

    print("Prevalence:", prevalence)
    print("Sensitivity:", sensitivity)
    print("False-positive rate:", false_positive_rate)
    print("Probability of a positive result:", p_positive)
    print("Probability of condition given positive result:", posterior)

    print("\nThis is an illustrative mathematical example, not medical guidance.")
    print("AI/ML connection: Bayes' theorem supports probabilistic reasoning.")


# ============================================================
# 10. OPTIMIZATION AND GRADIENT DESCENT
# ============================================================

def lesson_10_optimization():
    heading(10, "Optimization and gradient descent")

    print("Minimize f(w) = (w - 3)^2.")
    print("Derivative: f'(w) = 2(w - 3).")
    print("Update: w = w - learning_rate * gradient.")

    w = -2.0
    learning_rate = 0.1

    for step in range(1, 11):
        loss = (w - 3)**2
        gradient = 2 * (w - 3)
        print(
            f"Step {step:02d}: w={w:.6f}, "
            f"loss={loss:.6f}, gradient={gradient:.6f}"
        )
        w -= learning_rate * gradient

    print("Final w after 10 steps:", w)
    print("Exact minimum occurs at w=3.")

    print("\nA learning rate that is too small can be slow.")
    print("A learning rate that is too large can cause unstable updates.")
    print("SGD, momentum, RMSProp and Adam are commonly used optimizers.")


# ============================================================
# 11. LINEAR REGRESSION AND MEAN SQUARED ERROR
# ============================================================

def lesson_11_linear_regression():
    heading(11, "Linear regression and mean squared error")

    X = np.array([1, 2, 3, 4, 5], dtype=float)
    y = np.array([3, 5, 7, 9, 11], dtype=float)  # y = 2x + 1

    weight = 0.0
    bias = 0.0
    learning_rate = 0.05
    m = len(X)

    def predict(inputs, w, b):
        return w * inputs + b

    def mse(targets, predictions):
        return float(np.mean((targets - predictions)**2))

    print("Goal: learn the relationship y = 2x + 1.")
    print("Initial MSE:", mse(y, predict(X, weight, bias)))

    for _ in range(1000):
        predictions = predict(X, weight, bias)
        errors = predictions - y

        grad_w = (2 / m) * np.sum(errors * X)
        grad_b = (2 / m) * np.sum(errors)

        weight -= learning_rate * grad_w
        bias -= learning_rate * grad_b

    predictions = predict(X, weight, bias)

    print("Learned weight:", weight)
    print("Learned bias:", bias)
    print("Final MSE:", mse(y, predictions))
    show("Predictions", predictions)

    print("\nAI/ML connection:")
    print("Linear regression learns weights by minimizing a prediction loss.")


# ============================================================
# 12. LOGISTIC REGRESSION AND BINARY CROSS-ENTROPY
# ============================================================

def lesson_12_logistic_regression():
    heading(12, "Logistic regression and binary cross-entropy")

    X = np.array([
        [0.0, 0.0],
        [1.0, 0.0],
        [0.0, 1.0],
        [1.0, 1.0],
    ])
    y = np.array([0.0, 0.0, 0.0, 1.0])

    weights = np.zeros(2)
    bias = 0.0
    learning_rate = 0.5

    def binary_cross_entropy(targets, probabilities):
        probabilities = np.clip(probabilities, 1e-12, 1 - 1e-12)
        return float(-np.mean(
            targets * np.log(probabilities)
            + (1 - targets) * np.log(1 - probabilities)
        ))

    probabilities = sigmoid(X @ weights + bias)
    print("Initial probabilities:")
    show("P(y=1)", probabilities)
    print("Initial binary cross-entropy:", binary_cross_entropy(y, probabilities))

    # Gradient for sigmoid followed by binary cross-entropy.
    errors = probabilities - y
    grad_weights = X.T @ errors / len(y)
    grad_bias = float(np.mean(errors))

    weights -= learning_rate * grad_weights
    bias -= learning_rate * grad_bias

    updated_probabilities = sigmoid(X @ weights + bias)
    print("Weight gradient:")
    show("dL/dw", grad_weights)
    print("Bias gradient:", grad_bias)
    show("Updated weights", weights)
    print("Updated bias:", bias)
    show("Updated probabilities", updated_probabilities)
    print("Updated loss:", binary_cross_entropy(y, updated_probabilities))

    print("\nAI/ML connection:")
    print("Logistic regression estimates a binary class probability.")
    print("A threshold, often 0.5, can convert that probability into a label.")


# ============================================================
# 13. NEURAL NETWORKS AND BACKPROPAGATION
# ============================================================

def lesson_13_neural_network():
    heading(13, "Neural networks and backpropagation")

    x = np.array([1.0, 2.0])
    weights = np.array([0.1, -0.2])
    bias = 0.0
    target = 1.0
    learning_rate = 0.1

    # Forward pass
    logit = float(x @ weights + bias)
    prediction = float(sigmoid(logit))
    loss = -math.log(max(1e-12, prediction))  # target is 1

    # Backward pass: sigmoid + binary cross-entropy
    grad_logit = prediction - target
    grad_weights = grad_logit * x
    grad_bias = grad_logit

    show("Input", x)
    show("Weights before update", weights)
    print("Logit:", logit)
    print("Prediction:", prediction)
    print("Loss:", loss)
    print("dLoss/dLogit:", grad_logit)
    show("dLoss/dWeights", grad_weights)
    print("dLoss/dBias:", grad_bias)

    weights -= learning_rate * grad_weights
    bias -= learning_rate * grad_bias

    show("Weights after update", weights)
    print("Bias after update:", bias)
    print("New prediction:", float(sigmoid(x @ weights + bias)))

    print("\nAI/ML connection:")
    print("Backpropagation applies the chain rule through network operations")
    print("to calculate the gradient for each trainable parameter.")


# ============================================================
# 14. CLASSIFICATION METRICS
# ============================================================

def lesson_14_metrics():
    heading(14, "Classification evaluation metrics")

    actual = np.array([1, 0, 1, 1, 0, 1])
    predicted = np.array([1, 0, 0, 1, 0, 1])

    tp = int(np.sum((actual == 1) & (predicted == 1)))
    tn = int(np.sum((actual == 0) & (predicted == 0)))
    fp = int(np.sum((actual == 0) & (predicted == 1)))
    fn = int(np.sum((actual == 1) & (predicted == 0)))

    accuracy = safe_divide(tp + tn, tp + tn + fp + fn)
    precision = safe_divide(tp, tp + fp)
    recall = safe_divide(tp, tp + fn)
    f1 = safe_divide(2 * precision * recall, precision + recall)

    show("Actual labels", actual)
    show("Predicted labels", predicted)
    print(f"TP={tp}, TN={tn}, FP={fp}, FN={fn}")
    print("Accuracy:", accuracy)
    print("Precision:", precision)
    print("Recall:", recall)
    print("F1 score:", f1)

    print("\nAI/ML connection:")
    print("Accuracy can mislead on imbalanced datasets.")
    print("Choose metrics based on the practical cost of false positives and negatives.")


# ============================================================
# 15. REGULARIZATION: L1 AND L2
# ============================================================

def lesson_15_regularization():
    heading(15, "Regularization: L1 and L2 penalties")

    weights = np.array([3.0, -1.0, 0.2])
    data_loss = 0.8
    lam = 0.1

    l1_penalty = lam * np.sum(np.abs(weights))
    l2_penalty = lam * np.sum(weights**2)

    show("Weights", weights)
    print("Data loss:", data_loss)
    print("L1 penalty:", l1_penalty)
    print("L2 penalty:", l2_penalty)
    print("Total illustrative loss with L1:", data_loss + l1_penalty)
    print("Total illustrative loss with L2:", data_loss + l2_penalty)

    print("\nL1 penalizes absolute weight values and can encourage exact zeros.")
    print("L2 penalizes squared weight values and usually shrinks weights.")
    print("This lesson calculates penalties; it does not train a model.")


# ============================================================
# 16. PRINCIPAL COMPONENT ANALYSIS
# ============================================================

def lesson_16_pca():
    heading(16, "Principal Component Analysis (PCA)")

    X = np.array([
        [2.5, 2.4],
        [0.5, 0.7],
        [2.2, 2.9],
        [1.9, 2.2],
        [3.1, 3.0],
        [2.3, 2.7],
        [2.0, 1.6],
        [1.0, 1.1],
    ])

    mean = X.mean(axis=0)
    centered = X - mean

    # SVD of centered data; rows are examples and columns are features.
    U, singular_values, Vt = np.linalg.svd(centered, full_matrices=False)

    contributions = singular_values**2
    explained_variance_ratio = contributions / contributions.sum()

    first_component = Vt[:1].T
    projected = centered @ first_component

    print("Original data shape:", X.shape)
    show("Feature means", mean)
    show("Singular values", singular_values)
    show("Explained variance ratios", explained_variance_ratio)
    print("Variance retained by first component:",
          f"{explained_variance_ratio[0]:.2%}")
    print("First principal component:\n", first_component)
    print("Projection onto one component:\n", projected)

    print("\nAI/ML connection:")
    print("PCA finds directions of high variance.")
    print("It can reduce dimensions or help visualize high-dimensional data.")
    print("Feature scaling may be important when feature units differ.")


# ============================================================
# LEARNING PATH, MENU AND ENTRY POINT
# ============================================================

LESSONS = {
    1: ("Arithmetic and algebra", lesson_01_foundations),
    2: ("Functions, exponents and logarithms", lesson_02_functions),
    3: ("Vectors and norms", lesson_03_vectors),
    4: ("Matrices and transformations", lesson_04_matrices),
    5: ("Dot products, similarity and distances", lesson_05_similarity),
    6: ("Calculus and derivatives", lesson_06_calculus),
    7: ("Probability", lesson_07_probability),
    8: ("Statistics", lesson_08_statistics),
    9: ("Conditional probability and Bayes", lesson_09_bayes),
    10: ("Optimization and gradient descent", lesson_10_optimization),
    11: ("Linear regression", lesson_11_linear_regression),
    12: ("Logistic regression", lesson_12_logistic_regression),
    13: ("Neural networks and backpropagation", lesson_13_neural_network),
    14: ("Classification metrics", lesson_14_metrics),
    15: ("Regularization", lesson_15_regularization),
    16: ("Principal Component Analysis (PCA)", lesson_16_pca),
}


def show_learning_path():
    print("\nMATHEMATICS FOR AI / MACHINE LEARNING")
    print("-" * 68)
    for number, (title, _) in LESSONS.items():
        print(f"{number:02d}. {title}")


def run_lesson(number):
    title, function = LESSONS[number]
    function()


def interactive_menu():
    show_learning_path()

    while True:
        print("\nEnter 1-16, 'all', 'list', or 'q' to quit:")
        choice = input("> ").strip().lower()

        if choice in {"q", "quit", "exit"}:
            print("Practice each topic and change the example values yourself.")
            break

        if choice in {"list", "l"}:
            show_learning_path()
            continue

        if choice == "all":
            for number in LESSONS:
                run_lesson(number)
            continue

        try:
            number = int(choice)
            if number not in LESSONS:
                print("Choose a lesson from 1 to 16.")
            else:
                run_lesson(number)
        except ValueError:
            print("Invalid choice. Enter a lesson number, 'all', 'list', or 'q'.")


def main():
    parser = argparse.ArgumentParser(
        description="Interactive mathematics lessons for AI and machine learning."
    )
    parser.add_argument("--lesson", type=int, choices=LESSONS.keys())
    parser.add_argument("--list", action="store_true")
    args = parser.parse_args()

    if args.list:
        show_learning_path()
    elif args.lesson is not None:
        run_lesson(args.lesson)
    else:
        interactive_menu()


if __name__ == "__main__":
    main()