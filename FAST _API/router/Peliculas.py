from fastapi import APIRouter
from models.pelicula import pelicula
from db.client import db_client 
from schema.pelicula import schema_pelicula,schema_peliculas

router = APIRouter(prefix="/Peliculas")


fake_items_db = [{"item_name": "Foo"}, {"item_name": "Bar"}, {"item_name": "Baz"}]

@router.get("/")
async def Peliculas(q:int = 0 , p :int= 10):
    
    return schema_peliculas(db_client.Movilends.movies.find())[q:q+p]



@router.post("/",response_model=pelicula)
async def Peliculas(peli:pelicula ):
    
    pelicula_dict = dict(peli)
    
    id = db_client.Movilends.movies.insert_one(pelicula_dict).inserted_id
    
    new_pelicula = schema_pelicula(db_client.Movilends.movies.find_one({"id": id}))
    
    return pelicula(new_pelicula)