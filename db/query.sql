-- TODO: CHANGE TO EMPLOYEE TRACKING PROJECT - NOT MOVIES
SELECT movies.movie_name AS movie, reviews.review
FROM reviews
LEFT JOIN movies
ON reviews.movie_id = movies.id
ORDER BY movies.movie_name;