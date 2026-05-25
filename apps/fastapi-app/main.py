from fastapi import FastAPI

app = FastAPI()

class User:
    def __init__(self, id: int, name: str, email: str):
        self.id = id
        self.name = name
        self.email = email

    def validate(self) -> bool:
        if '@' not in self.email:
            raise ValueError('Invalid email')
        return True

@app.get("/user")
def get_user():
    user = User(id=1, name="Test User", email="test@example.com")
    user.validate()
    return {"id": user.id, "name": user.name, "email": user.email}