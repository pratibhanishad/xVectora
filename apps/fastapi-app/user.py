class User:
    def __init__(self, id: int, name: str, email: str):
        self.id = id
        self.name = name
        self.email = email

    def validate(self) -> bool:
        if '@' not in self.email:
            raise ValueError('Invalid email')
        return True