from pydantic import BaseModel

class Rating(BaseModel):
    userId: str
    movieId: str
    rating: float

 