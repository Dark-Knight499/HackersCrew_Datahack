from flask import Flask, jsonify, request
import json

app = Flask(__name__)
db = {

}
class Question:
    def __init__(self, id, question, options, answer):
        self.id = id
        self.question = question
        self.options = options  
        self.answer = answer     

    def class_to_json(self):
        ques_dict = {
            "id": self.id,
            "question": self.question,
            "options": self.options,
            "answer": self.answer
        }
        return ques_dict  

sample_questions = [
    Question(1, "What is 2 + 2?", ["1", "2", "3", "4"], "4"),
    Question(2, "Which is the capital of France?", ["London", "Berlin", "Paris", "Madrid"], "Paris"),
    Question(3, "What is the largest planet in our solar system?", ["Earth", "Mars", "Jupiter", "Saturn"], "Jupiter"),
]

def choose_question(results):
    return sample_questions  

def send_question(question):
    return question.answer  

def evaluate_question(answer, question):
    is_correct = answer == question.answer 
    return question.class_to_json()

@app.route("/generate/questions/<string:user>")
def generate_question(user):
    if user not in db:
        db["user"] = []
    question = choose_question(db["user"])
    return json.dumps(question)
@app.route("/answer/<string:user>")
def append_answer(user):
    if user not in db:
        db["user"] = []
    question = choose_question(db["user"])
    return json.dumps(question)

if __name__ == "__main__":
    app.run(debug=True)
