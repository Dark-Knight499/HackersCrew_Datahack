import numpy as np
import tensorflow as tf
import joblib
from tensorflow.keras.models import Sequential
from tensorflow.keras.layers import LSTM, Dense, Dropout
from tensorflow.keras.optimizers import Adam

class QuestionDifficultyAdjuster:
    def __init__(self, sequence_length=5):
        self.sequence_length = sequence_length
        self.model = self._build_model()
        
    def _build_model(self):
        model = Sequential([
            LSTM(64, input_shape=(self.sequence_length, 2), return_sequences=True),
            Dropout(0.2),
            LSTM(32),
            Dropout(0.2),
            Dense(16, activation='relu'),
            Dense(1, activation='sigmoid')
        ])
        
        model.compile(
            optimizer=Adam(learning_rate=0.001),
            loss='mse',
            metrics=['mae']
        )
        return model
    
    def prepare_sequence(self, difficulties, correct_answers):
        X = np.column_stack((difficulties, correct_answers))
        X = X.reshape((1, self.sequence_length, 2))
        return X
    
    def predict_next_difficulty(self, difficulties, correct_answers):
        normalized_difficulties = np.array(difficulties) / 10.0
        
        X = self.prepare_sequence(normalized_difficulties, correct_answers)
        
        prediction = self.model.predict(X, verbose=0)[0][0]
        return round(prediction * 10)
    
    def train(self, num_samples=1000, epochs=50):
        X = []
        y = []
        
        for i in range(num_samples):

            difficulties = np.random.randint(1, 11, size=self.sequence_length) / 10.0
            correct_answers = np.random.random(self.sequence_length)
            avg_performance = np.mean(correct_answers)
            if avg_performance > 0.8:
                target = min(1.0, difficulties[-1] + 0.1)
            elif avg_performance < 0.5:
                target = max(0.1, difficulties[-1] - 0.1)
            else:
                target = difficulties[-1]
            
            X.append(np.column_stack((difficulties, correct_answers)))
            y.append(target)
        
        X = np.array(X)
        y = np.array(y)
        
        history = self.model.fit(
            X, y,
            epochs=epochs,
            validation_split=0.2,
            verbose=1
        )
        return history

adjuster = QuestionDifficultyAdjuster(3)
def demonstrate_model():
    global adjuster
    
    history = adjuster.train(num_samples=1000, epochs=200)
    
    difficulties = [5, 5, 6]
    correct_answers = [1, 1, 1]
    
    next_difficulty = adjuster.predict_next_difficulty(difficulties, correct_answers)
    print(f"Previous difficulties: {difficulties}")
    print(f"Correct answers: {correct_answers}")
    print(f"Recommended next difficulty: {next_difficulty}")
    
    difficulties = [5, 5, 4]
    correct_answers = [1, 1, 0]
    
    next_difficulty = adjuster.predict_next_difficulty(difficulties, correct_answers)
    print(f"\nPrevious difficulties: {difficulties}")
    print(f"Correct answers: {correct_answers}")
    print(f"Recommended next difficulty: {next_difficulty}")

if __name__ == "__main__":
    demonstrate_model()
    joblib.dump(adjuster.model, './rf_model.joblib')
