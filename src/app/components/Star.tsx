    import { Review } from '@prisma/client'
    import React from 'react'
    import { RatingCalculate } from '../../../utils/RatingCalculate'
    import fullStar from "../../../public/icons/full-star.png"
    import halfStar from "../../../public/icons/half-star.png"
    import emptyStar from "../../../public/icons/empty-star.png"
    import Image from 'next/image'
    const Star = ({ reviews,rating }: { reviews: Review[],rating ?:number }) => {
    function renderStars() {
        const reviewRating = rating || RatingCalculate(reviews);
        const stars = [];

        for (let i = 0; i < 5; i++) {
        const difference = parseFloat((reviewRating - i).toFixed(1));
        if (difference >= 1) {
            stars.push(fullStar);
        } else if (difference < 1 && difference > 0) {
            if (difference > 0.2 && difference <= 0.6) {
            stars.push(halfStar);
            } else if (difference <= 0.2) {
            stars.push(emptyStar);
            } else {
            stars.push(fullStar);
            }
        } else {
            stars.push(emptyStar);
        }
        }

        return stars.map((star, index) => (
        <Image key={index} src={star} alt='' className='w-4 h-4 mr-1' />
        ));
    }

    return (
        <div className='flex items-center'>
        {renderStars()}
        </div>
    );
    };

    export default Star;