import React, { useContext, useEffect } from 'react'
import { motion } from "framer-motion";
import { Contexts } from '../App';
import ReviewCard from './ReviewCard';
import InternetError from './InternetError';
import NoResultFound from './NoResultFound';

export default function OverviewPage() {
    const { AnimeId, videoId, shortDescription, setNoResult, setInternetError, setLoading, setReviews, reviews, internetError, loading, noResult, handleStart } = useContext(Contexts);

    let fetchReviews = async () => {
        try {
            setLoading(true);
            setInternetError(false);
            setNoResult(false);
            console.log(`https://kitsu.io/api/edge/anime/${AnimeId}/reviews?fields[reviews]=likesCount,content,rating,createdAt`);

            let animeData = await fetch(`https://kitsu.io/api/edge/anime/${AnimeId}/reviews?fields[reviews]=likesCount,contentFormatted,rating,createdAt`);

            let parsedAnimeReviews = await animeData.json();

            console.log(parsedAnimeReviews);

            setLoading(false);
            if (parsedAnimeReviews.data.length === 0) {
                setNoResult(true);
                setReviews([])
                return;
            }
            setReviews(parsedAnimeReviews.data)
        }
        catch {
            setLoading(false);
            setInternetError(true)
        }
    }

    useEffect(() => {
        fetchReviews();
    }, [AnimeId])

    return (
        <>
            <div className='lg:mx-[15%] mt-4 lg:rounded-xl overflow-hidden'>
                <div className='relative w-full pb-[56.25%]'>
                    <iframe
                        className='absolute top-0 left-0 w-full h-full'
                        src={`https://www.youtube.com/embed/${videoId}`}
                        title="Anime Trailer"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                    ></iframe>
                </div>
            </div>
            <div className="discription">
                <h1>Story: </h1>
                <p>{shortDescription}</p>
            </div>
            <div className="reviews">
                <h1>Reviews:</h1>
                {(!noResult && !internetError) && (
                    <>
                        <div className="grid md:grid-col-2 w-10/12 m-auto gap-2 pb-10 lg:grid-cols-3 grid-cols-1 mb-28">
                            {Array.isArray(reviews) && reviews.map((review, index) => (
                                <ReviewCard review={review} index={index} key={review.id} />
                            ))}
                            {(!loading) && <motion.button className='border-white border-2 px-8 py-2 rounded-[30px] font-semibold mt-5 m-auto md:col-span-3 '

                                initial={{
                                    scale: 3,
                                    opacity: 0,
                                    y: "10vh"
                                }}
                                whileInView={{
                                    opacity: 1,
                                    scale: 1.2,
                                    y: 0,
                                    transition: {
                                        type: "spring",
                                        stiffness: 200,
                                        duration: 0.7,
                                        delay: 0.3,
                                    }
                                }}
                                whileHover={{
                                    scale: 1.4,
                                    transition: { type: 'tween', delay: 0 },
                                }}
                                whileTap={{
                                    scale: 1,
                                    transition: { type: 'tween', duration: 1 },
                                }}
                                onClick={handleStart}
                            >Try Again.</motion.button>}
                        </div>

                    </>
                )}
                {((internetError && noResult) || (internetError)) && <InternetError />}
                {(!internetError && noResult) && <NoResultFound />}
            </div>
        </>
    )
}
