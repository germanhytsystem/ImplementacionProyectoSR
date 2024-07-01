from fastapi import FastAPI
from typing import Union
from router import Peliculas, Login, Ratings


app = FastAPI()

app.include_router(Peliculas.router)
app.include_router(Login.router)
app.include_router(Ratings.router)


@app.get("/")
async def read_root():
    return {"Hello": "World"}


@app.get("/items/{item_id}")
async def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}
