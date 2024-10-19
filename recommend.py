import joblib
import numpy as np
import os

os.environ["TF_ENABLE_ONEDNN_OPTS"] = "0"

class Recommend:
    def __init__(self):
        with open('./rf_model.joblib', 'rb') as file:
            self.model = joblib.load(file)

    def prepare_sequence(self, difficulties, correct_answers):
        X = np.column_stack((difficulties, correct_answers))
        X = X.reshape((1, 3, 2))
        return X

    def predict_next_difficulty(self, difficulties, correct_answers):
        normalized_difficulties = np.array(difficulties) / 10.0
        X = self.prepare_sequence(normalized_difficulties, correct_answers)
        prediction = self.model.predict(X, verbose=0)[0][0]
        return round(prediction * 10)


r = Recommend()

print(r.predict_next_difficulty([4, 5, 6], [1, 1, 1]))
