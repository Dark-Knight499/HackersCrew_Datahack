from langchain_core.prompts import PromptTemplate
from langchain.chains import LLMChain
from langchain_core.prompts import PromptTemplate
from langchain.memory import ConversationBufferMemory
from langchain_google_genai import ChatGoogleGenerativeAI
from dotenv import load_dotenv
from prompts import *
from flask import Flask , json, jsonify, request
app = Flask(__name__)
load_dotenv()
db = {

}
llm = ChatGoogleGenerativeAI(
    model="gemini-pro",
    temperature=0,
    max_tokens=None,
    timeout=None,
    max_retries=2,
)

start_session_prompt_template = PromptTemplate(
      input_variables=["chat_history"],
      template=start_session_prompt
   )
question_rating_prompt = PromptTemplate(
      input_variables=["chat_history","rating"],
      template=start_session_prompt
   )
# # llm = OpenAI(temperature=0)
# # Notice that "chat_history" is present in the prompt template
# template = """You are a nice chatbot having a conversation with a human.

# Previous conversation:
# {chat_history}

# New human question: {question}
# Response:"""
# prompt = PromptTemplate.from_template(template)
# # Notice that we need to align the `memory_key`
memory = ConversationBufferMemory(memory_key="chat_history")
# conversation = LLMChain(
#     llm=llm,
#     prompt=prompt,
#     verbose=True,
#     memory=memory
# )
para = """
"Bad Romance" is a song by American singer Lady Gaga from her third extended play (EP), The Fame Monster (2009)—the reissue of her debut studio album, The Fame (2008). Gaga wrote and produced the song with RedOne. Following an unauthorized demo leak, Gaga premiered the song's final version during the finale of Alexander McQueen's 2010 Paris Fashion Week show in October 2009 and released it as the lead single from The Fame Monster later that month. Musically, it is an electropop and dance-pop song with a spoken bridge. Inspired by German house and techno, the song was developed as an experimental pop record. Lyrically, Gaga drew from the paranoia she experienced while on tour and wrote about her attraction to unhealthy romantic relationships.

"Bad Romance" was acclaimed by music critics for its chorus, beat and hook. Retrospective reviewers called it Gaga's best song. It topped the charts in more than 20 countries and sold 12 million copies worldwide, becoming one of the best-selling singles of all time. In the US, the song peaked at number two on the Billboard Hot 100 chart and was certified eleven times Platinum by the Recording Industry Association of America, having sold 5.9 million digital downloads as of 2019. "Bad Romance" won a Grammy Award for Best Female Pop Vocal Performance, and was included in annual "best-of" lists of the media outlets Rolling Stone and Pitchfork; the former named it one of the 100 Greatest Songs of the 21st Century and 500 Greatest Songs of All Time. In a 2017 journal, which studied structural patterns in melodies of earworm songs, the American Psychological Association called "Bad Romance" the catchiest in the world.

The music video for "Bad Romance", directed by Francis Lawrence, features Gaga inside a surreal white bathhouse where she is kidnapped and drugged by supermodels who sell her to the Russian mafia for sexual slavery. The video ends as Gaga immolates the man who bought her. It garnered acclaim from critics for its fashion, choreography, costumes and symbolism. Briefly becoming the most-viewed YouTube video in 2010, it received a record ten nominations at the MTV Video Music Awards, winning seven, including Video of the Year. It received the Grammy Award for Best Music Video and was named the best music video of the 21st century by Billboard. Gaga has performed "Bad Romance" at television shows, award ceremonies, her concert tours and residency shows, and the Super Bowl LI halftime show.
"""
# import time
# for i in range(2):
#     print(llm.invoke(start_session_prompt_template.format(chat_history = para , rating = f"{i}")).content)
#     time.sleep(1)
#     """
#     ->generate\db
#     ->get\question
#     ->get\evaluation
#     ->\select\Question

#     """
def generate_question():
    
@app.route("/start/<string:user>")
def send_question(user):
    res = request.json()
    db["user"]["text"] = res.get("text")

@app.route("/select/questions/<string:user>")
def send_question(user):
    db["user"]["result"]
    return generate_question()

    

@app.route("/answer/<string:user>")
def append_answer(user):
    res = request.get_json()    
    db["user"]["results"].append(res.get("evaluation"))

if __name__ == "__main__":
    app.run(debug=True)