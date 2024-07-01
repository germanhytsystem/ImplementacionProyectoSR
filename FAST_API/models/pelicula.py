from pydantic import BaseModel


class Pelicula(BaseModel):
    movieId: str
    title: str
    genres: str
