def schema_rating(rating) -> dict:
    return {"Id": str(rating["_id"]),
            "userId": rating["userId"],
            "movieId": rating["movieId"],
            "rating": rating["rating"]}


def schema_ratings(ratings) -> list:

    return [schema_rating(rating) for rating in ratings]
