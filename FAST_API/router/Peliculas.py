from fastapi import APIRouter, HTTPException
from models.pelicula import Pelicula
from db.client import db_client
from schema.pelicula import schema_pelicula, schema_peliculas

import pandas as pd
import numpy as np
from scipy.sparse.linalg import svds

router = APIRouter(prefix="/peliculas")


@router.get("/")
async def Peliculas(q: int = 0, p: int = 5):
    return schema_peliculas(db_client.Movilends.movies.find())[q:q+p]


@router.get("/tenfirst")
async def Peliculas():
    # los 10 primeros
    return schema_peliculas(db_client.Movilends.movies.find())[0:10]


@router.get("/get_genero/{genre}")
async def get_pelicula_generor(genre: str, q: int = 0, p: int = 5):
    # Filtrar películas por género
    peliculas_filtradas = schema_peliculas(db_client.Movilends.movies.find(
        {"genres": {"$regex": genre, "$options": "i"}}))[q:q+p]

    if not peliculas_filtradas:
        raise HTTPException(
            status_code=404, detail="No se encontraron genero con ese título ")

    return peliculas_filtradas


@router.get("/get_titulo/{titulo}")
async def get_pelicula_titulo(titulo: str, q: int = 0, p: int = 5):
    # Filtrar películas por título parcial

    peliculas_filtradas = schema_peliculas(db_client.Movilends.movies.find(
        {"title": {"$regex": titulo, "$options": "i"}}))[q:q+p]

    if not peliculas_filtradas:
        raise HTTPException(
            status_code=404, detail="No se encontraron películas con ese título ")

    return peliculas_filtradas


@router.post("/", response_model=Pelicula)
async def Peliculas(peli: Pelicula):

    pelicula_dict = dict(peli)

    id = db_client.Movilends.movies.insert_one(pelicula_dict).inserted_id

    new_pelicula = schema_pelicula(
        db_client.Movilends.movies.find_one({"movieId": id}))

    return Pelicula(new_pelicula)


# API aplicando el Algoritmo de recomendación con SVD para recomendar peliculas, mediante la técnica de filtrado colaborativo
@router.get("/recomendar/{userId}")
async def recomendar(userId: int):
    # Obtener las valoraciones de los usuarios
    ratings = pd.DataFrame(
        list(db_client.Movilends.ratings.find().limit(10000)))
    # Convertir ObjectId a string
    ratings['_id'] = ratings['_id'].astype(str)
    ratings['movieId'] = ratings['movieId'].astype(str)
    ratings['userId'] = pd.to_numeric(ratings['userId'], errors='coerce')
    ratings['rating'] = pd.to_numeric(ratings['rating'], errors='coerce')
    ratings = ratings.dropna(subset=['rating'])
    print("ratings", ratings)

    # Obtener las películas
    movies = pd.DataFrame(list(db_client.Movilends.movies.find().limit(10000)))
    # Convertir ObjectId a string
    movies['_id'] = movies['_id'].astype(str)
    movies['movieId'] = movies['movieId'].astype(str)
    print("movies", movies)

    # Crear una matriz de valoraciones
    R_df = ratings.pivot(index='userId', columns='movieId',
                         values='rating').fillna(0)
    print("R_df", R_df)

    # Normalizar la matriz de valoraciones
    R = R_df.values
    print("R", R)
    user_ratings_mean = np.mean(R, axis=1)
    print("user_ratings_mean", user_ratings_mean)
    R_demeaned = R - user_ratings_mean.reshape(-1, 1)
    print("R_demeaned", R_demeaned)

    # Ajustar k dinámicamente
    k = min(50, min(R_demeaned.shape) - 1)
    print("k", k)

    # Aplicar SVD
    U, sigma, Vt = svds(R_demeaned, k=k)
    sigma = np.diag(sigma)
    print("sigma", sigma)

    # Predecir las valoraciones
    all_user_predicted_ratings = np.dot(
        np.dot(U, sigma), Vt) + user_ratings_mean.reshape(-1, 1)
    print("all_user_predicted_ratings", all_user_predicted_ratings)
    preds_df = pd.DataFrame(all_user_predicted_ratings, columns=R_df.columns)
    print("preds_df", preds_df)

    # Verificar si el userId es válido
    if userId - 1 not in preds_df.index:
        return {"error": "userId out of bounds"}

    # Obtener las películas que el usuario no ha valorado
    user_row_number = userId - 1
    sorted_user_predictions = preds_df.iloc[user_row_number].sort_values(
        ascending=False)
    print("sorted_user_predictions", sorted_user_predictions)

    # Obtener las valoraciones del usuario
    user_data = ratings[ratings.userId == userId]
    user_full = (user_data.merge(movies, how='left', left_on='movieId', right_on='movieId')
                 .sort_values(['rating'], ascending=False))
    print("user_full", user_full)

    # Obtener las recomendaciones
    recommendations = (
        movies[~movies['movieId'].isin(user_full['movieId'])]
        .merge(
            pd.DataFrame(sorted_user_predictions).reset_index(),
            how='left',
            left_on='movieId',
            right_on='movieId'
        )
        .rename(columns={user_row_number: 'Predictions'})
        .sort_values('Predictions', ascending=False)
        .iloc[:5]
    )

    # Convertir ObjectId a string en el DataFrame de recomendaciones
    recommendations['_id'] = recommendations['_id'].astype(str)

    return recommendations.to_dict(orient='records')
