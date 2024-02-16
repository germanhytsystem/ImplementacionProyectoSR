def schema_rating(rating) -> dict :
    return {"userId":int(rating["userId"]),
            "movieId":rating["movieId"],
            "rating":rating["rating"]}
    
def schema_ratings(ratings ) -> list :
     
    return [schema_rating(rating) for rating in ratings]