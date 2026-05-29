from fastapi import FastAPI
from user import User         

app = FastAPI()

@app.get("/user")
def get_user():
    user = User(id=1, name="Test User", email="test@example.com")
    user.validate()
    return {"id": user.id, "name": user.name, "email": user.email}