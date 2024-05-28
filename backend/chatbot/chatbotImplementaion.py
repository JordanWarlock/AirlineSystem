import random
import json
import pickle
import numpy as np
import tensorflow as tf
import nltk
from nltk.stem import WordNetLemmatizer
from openai import OpenAI


key = 'sk-proj-QquzIgfGcE4E4krAMdy8T3BlbkFJA0zNJ8hcOXCtGDNaSK9W'
client = OpenAI(api_key=key)


model = tf.keras.models.load_model("chatbot\chatbot_model.keras")
lemmatizer = WordNetLemmatizer()
intents = json.loads(open('chatbot\intents.json').read())
words = pickle.load(open('chatbot\words.pkl', 'rb'))
classes = pickle.load(open('chatbot\classes.pkl', 'rb'))




def clean_up_sentence(sentence):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word.lower()) for word in sentence_words]
    return sentence_words

def bag_of_words(sentence, words, show_details=True):
    sentence_words = clean_up_sentence(sentence)
    bag = [0] * len(words)
    for s in sentence_words:
        for i, w in enumerate(words):
            if w == s:
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence, model):
    p = bag_of_words(sentence, words, show_details=False)
    res = model.predict(np.array([p]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i, r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]
    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({"intent": classes[r[0]], "probability": str(r[1])})
    return return_list

def get_response(ints, intents_json):
    tag = ints[0]['intent']
    list_of_intents = intents_json['intents']
    for i in list_of_intents:
        if i['tag'] == tag:
            result = random.choice(i['responses'])
            break
    return result


def book_flight(departure, arrival, datetime, flight_type):
    return f"Flight booked from {departure} to {arrival} on {datetime} as a {flight_type} trip."


def handle_booking_conversation(conversation_state, user_input):
    if 'step' not in conversation_state:
        conversation_state['step'] = 0
        conversation_state['flight_type'] = user_input

    
    steps = [
        "Please provide the departure location code e.g KHI for karachi: ",
        "Please provide the arrival destination code: ",
        "Please provide the departure date in format YYYY-MM-DD: ",
        "Please confirm your booking. Type 'yes' to confirm."
    ]

    if conversation_state['step'] < len(steps):
        response = steps[conversation_state['step']]
        
        if conversation_state['step'] == 1:
            conversation_state['departure'] = user_input
        elif conversation_state['step'] == 2:
            conversation_state['arrival'] = user_input
        elif conversation_state['step'] == 3:
            conversation_state['datetime'] = user_input
        conversation_state['step'] += 1
        return response, conversation_state
    
    # Final step: Confirm booking
    if user_input.lower() in ["yes", "y"]:
        response = book_flight(
            conversation_state['departure'],
            conversation_state['arrival'],
            conversation_state['datetime'],
            conversation_state['flight_type']
        )
        conversation_state = {}
    else:
        response = "Booking cancelled. How can I assist you further?"
        conversation_state = {}
    
    return response, conversation_state

def ask_chatgpt(question):
    tuning = """
        give a very brief answer as if you are a flight chatbot. Question is:
    """
    response = client.chat.completions.create(
        messages=[
        {
            "role": "user",
            "content": tuning + question,
        }
    ],
        model="gpt-3.5-turbo"
    )
    return response.choices[0].message.content

def chatbot_response(msg,con):
    user_input = msg
    conversation_state = con

    if conversation_state and conversation_state.get('task') == 'booking_flight':
        response, conversation_state = handle_booking_conversation(conversation_state, user_input)
    else:
        if "oneway" in user_input.lower():
            conversation_state = {'task': 'booking_flight'}
            response, conversation_state = handle_booking_conversation(conversation_state, "oneway")
        else:
            ints = predict_class(msg, model)
            print(ints)
            if(len(ints) > 0 and float(ints[0]["probability"]) > 0.7):
                response = get_response(ints, intents)
            else:
                response = ask_chatgpt(msg)
    return dict({
        'response': response,
        'conversation_state': conversation_state
    })  
