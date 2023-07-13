from gensim.models.word2vec import Word2Vec
from janome.tokenizer import Tokenizer
import sys
import urllib.parse
Data =sys.stdin.readline().strip()
Data=urllib.parse.unquote(Data)

model_path = 'models/word2vec.gensim.model'
model = Word2Vec.load(model_path)
t = Tokenizer()

def extract_words(text):
    tokens = t.tokenize(text)
    return [token.base_form for token in tokens]

kanjou=["オレンジ","赤","青","黄色","水色"]
kanjou_c=["#FFA500","#FF0000","#0000FF","#EDD60E","#00BFFF"]
result=[]

for i in kanjou:
    resp=model.wv.similarity(extract_words(Data), i)
    # print(extract_words(Data),i,resp)
    result.append(sum(resp)/len(resp))

print(kanjou_c[result.index(max(result))])