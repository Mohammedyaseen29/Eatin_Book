import React from 'react'
import { Review } from '@prisma/client'

export const RatingCalculate = (reviews:Review[]) => {
    if (!reviews.length) return 0;
    return(
        reviews.reduce((sum,review)=>{
        return sum + review.rating
    },0)/reviews.length
    )
}
