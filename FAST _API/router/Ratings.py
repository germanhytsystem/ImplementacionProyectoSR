from fastapi import APIRouter, HTTPException
from db.client import db_client 
from models.rating import rating
from schema.rating import schema_rating,schema_ratings

router = APIRouter(prefix="/Ratings")


@router.get("/")
async def Ratings(q:int = 0 , p :int= 5):
    
    return schema_ratings(db_client.Movilends.ratings.find())[q:q+p]

@router.get("/get_movieId/{id}")
async def get_movie(id, q: int = 0, p: int = 5):
    # Filtrar películas por género
    ids_filtradas = schema_ratings(db_client.Movilends.ratings.find({"movieId":int(id)}))[q:q+p]
    
    if not ids_filtradas:
        raise HTTPException(status_code=404, detail="No se encontraron movieId ")
    
    return ids_filtradas

@router.get("/get_userId/{id}")
async def get_user(id, q: int = 0, p: int = 5):
    # Filtrar películas por género
    ids_filtradas = schema_ratings(db_client.Movilends.ratings.find({"userId": int(id)}))[q:q+p]
    
    if not ids_filtradas:
        raise HTTPException(status_code=404, detail="No se encontraron userId ")
    
    return ids_filtradas