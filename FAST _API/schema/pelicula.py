def schema_pelicula(pelicula) -> dict :
    return {"movieId":str(pelicula["_id"]),
            "title":pelicula["title"],
            "genres":pelicula["genres"]}
    
def schema_peliculas(peliculas ) -> list :
     
    return [schema_pelicula(pelicula) for pelicula in peliculas]