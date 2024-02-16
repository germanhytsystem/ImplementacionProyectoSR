from fastapi import APIRouter, HTTPException
from db.client import db_client 
from models.rating import Rating
from schema.rating import schema_rating,schema_ratings

router = APIRouter(prefix="/Ratings")


@router.get("/")
async def Ratings(q:int = 0 , p :int= 5):
    
    return schema_ratings(db_client.Movilends.ratings.find())[q:q+p]

@router.get("/get_movieId/{id}")
async def get_movie(id:str, q: int = 0, p: int = 5):

    ids_filtradas = schema_ratings(db_client.Movilends.ratings.find({"movieId":id}))[q:q+p]
    
    if not ids_filtradas:
        raise HTTPException(status_code=404, detail="No se encontraron movieId ")
    
    return ids_filtradas

@router.get("/get_userId/{id}")
async def get_user(id:str, q: int = 0, p: int = 5):

    ids_filtradas = schema_ratings(db_client.Movilends.ratings.find({"userId": id}))[q:q+p]
    
    if not ids_filtradas:
        raise HTTPException(status_code=404, detail="No se encontraron userId ")
    
    return ids_filtradas

@router.post("/")
async def Rating(rati: Rating):
    rating_dic = dict(rati)
    
    nuevo = db_client.Movilends.ratings.insert_one(rating_dic)
    
    nuevo_id = nuevo.inserted_id
    
    # Buscar el documento por su _id
    nuevo_doc = schema_rating(db_client.Movilends.ratings.find_one({"_id": nuevo_id}))
    
    return nuevo_doc