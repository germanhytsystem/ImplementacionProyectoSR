from fastapi import APIRouter, HTTPException
from models.pelicula import Pelicula
from db.client import db_client 
from schema.pelicula import schema_pelicula,schema_peliculas

router = APIRouter(prefix="/Peliculas")

@router.get("/")
async def Peliculas(q:int = 0 , p :int= 5):
    
    return schema_peliculas(db_client.Movilends.movies.find())[q:q+p]

@router.get("/get_genero/{genre}")
async def get_pelicula_generor(genre: str, q: int = 0, p: int = 5):
    # Filtrar películas por género
    peliculas_filtradas = schema_peliculas(db_client.Movilends.movies.find({"genres": {"$regex": genre, "$options": "i"}}))[q:q+p]
    
    if not peliculas_filtradas:
        raise HTTPException(status_code=404, detail="No se encontraron genero con ese título ")
    
    return peliculas_filtradas

@router.get("/get_titulo/{titulo}")
async def get_pelicula_titulo(titulo: str, q: int = 0, p: int = 5):
    # Filtrar películas por título parcial
    
    peliculas_filtradas = schema_peliculas(db_client.Movilends.movies.find({"title": {"$regex": titulo, "$options": "i"}}))[q:q+p]
    
    if not peliculas_filtradas:
        raise HTTPException(status_code=404, detail="No se encontraron películas con ese título ")
    
    return peliculas_filtradas
    
@router.post("/",response_model=Pelicula)
async def Peliculas(peli:Pelicula ):
    
    pelicula_dict = dict(peli)
    
    id = db_client.Movilends.movies.insert_one(pelicula_dict).inserted_id
    
    new_pelicula = schema_pelicula(db_client.Movilends.movies.find_one({"movieId": id}))
    
    return Pelicula(new_pelicula)