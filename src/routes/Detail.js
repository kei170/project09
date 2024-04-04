import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./Detail.module.css";

function Detail() {
    const { id } = useParams();
    const [movie, setMovie] = useState(null);

    const getMovie = async () => {
        const json = await (
            await fetch(`https://yts.mx/api/v2/movie_details.json?movie_id=${id}`)
        ).json();
        setMovie(json.data.movie);
    }

    useEffect(() => {
        const fetchData = async () => {
            await getMovie();
        };
        fetchData();
    }, [id]); // id가 변경될 때마다 다시 데이터를 가져오도록 의존성 추가

    const getYouTubeEmbedUrl = (trailerCode) => {
        return `https://www.youtube.com/embed/${trailerCode}`;
    };

    return (
        <div className={styles.detailContainer}>
            {movie ? (
                <div>
                    <h1 className={styles.detailTitle}>{movie.title}</h1>
                    <p className={styles.detailSummary}>{movie.summary}</p>
                    <div className={styles.videoContainer}>
                        {movie.yt_trailer_code ? (
                            <iframe
                                width="560"
                                height="315"
                                src={getYouTubeEmbedUrl(movie.yt_trailer_code)}
                                title="YouTube video player"
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ) : (
                            <p>영화 미리보기 영상이 없습니다.</p>
                        )}
                    </div>
                </div>
            ) : (
                <h1>Loading...</h1>
            )}
        </div>
    );
}

export default Detail;
