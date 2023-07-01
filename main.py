from fastapi import FastAPI
from pydantic import BaseModel 

# 정적 파일들을 서버에 올려줄 수 있음
from fastapi.staticfiles import StaticFiles

app = FastAPI()

answer = "APPLE"

@app.get('/answer')
def get_answer():
  return answer

app.mount("/", StaticFiles(directory="static", html=True), name="static")
