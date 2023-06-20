import React from 'react'

export default function ReviewCard(props) {
    
    return (
        <>
            <div className="review-content" dangerouslySetInnerHTML={{ __html: props.review.attributes.contentFormatted }}></div>

            <div>{props.review.attributes.likesCount}</div>
            <div>{props.review.attributes.rating}</div>
            <div>{props.review.attributes.createdAt}</div>

        </>
    )
}
