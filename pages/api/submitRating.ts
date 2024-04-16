import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/script";
import { NextResponse } from "next/server";
import Scorecard from "@/app/welcome/scorecard/page";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    // extract the data from the headers, the local storage, and the passed in values
    const authHeader = req.headers.authorization;
    const ratingUsername = authHeader?.split(" ")[1];
    const ratedUsername = authHeader?.split(" ")[2];
    const ratings = req.body;

    console.log(ratingUsername, ratedUsername, ratings, "this is the data passed in");

    // find the user that is currently signed in and the user we are rating
    const ratingUser = await prisma.user.findUnique({ where: { username: ratingUsername } });
    const ratedUser = await prisma.user.findUnique({ where: { username: ratedUsername } });

    if (!ratingUser || !ratedUser) {
        res.status(404).json({ message: "User not found" });
        return;
    }

    // organize the values that have been passed in
    const categoryRatings = [];
    const interestRatings = [];
    let totalRating = 0;
    let numberOfRatings = 0;
    for (const key in ratings) {
        const score = ratings[key];
        totalRating += score;
        numberOfRatings += 1;
        const [categoryName, interestName] = key.split(":");
        if (interestName) {
            // this is an interest
            const interest = await prisma.interest.findFirst({ where: { interest_name: interestName } });

            if (!interest) {
                res.status(404).json({ message: "Interest not found" });
                return;
            }

            interestRatings.push({
                rating_user_id: ratingUser?.user_id,
                rated_user_id: ratedUser?.user_id,
                interest_id: interest?.interest_id,
                score: score,
            });
        } else {
            // this is a category
            const category = await prisma.interestCategory.findFirst({ where: { category_name: categoryName } });

            if (!category) {
                res.status(404).json({ message: "Category not found" });
                return;
            }

            categoryRatings.push({
                rating_user_id: ratingUser?.user_id,
                rated_user_id: ratedUser?.user_id,
                category_id: category?.category_id,
                score: score,
            });

        }
    }

    const averageRating = totalRating / numberOfRatings;


    // create the scorecard object
    const scorecard = await prisma.scorecard.create({
        data: {
            user_id: ratingUser?.user_id,
            cumulative_score: averageRating,
        },
    });

    console.log("category ratings ", categoryRatings)
    console.log("interest ratings ", interestRatings)

    for (const categoryRating of categoryRatings) {

        console.log("creating category rating with info ", categoryRating)
        
        await prisma.categoryRating.create({
            data: {
                ...categoryRating,
                scorecard_id: scorecard.scorecard_id,
            },
        });
    }

    for (const interestRating of interestRatings) {

        console.log("creating interest rating with info ", interestRating)

        await prisma.interestRating.create({
            data: {
                ...interestRating,
                scorecard_id: scorecard.scorecard_id,
            },
        });
    }

    console.log(scorecard, "this is the scorecard");

    res.status(200).json({ message: `Scorecard successfully created with ID: ${scorecard.scorecard_id}`, scorecard: scorecard  });

}