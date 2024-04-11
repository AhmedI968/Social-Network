// pages/api/createInterest.ts
import { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../lib/script";

export default async function handle(req: NextApiRequest, res: NextApiResponse) {
    const { interestName, categoryName } = req.body;

    if (categoryName) {
        // Check if the category already exists
        const existingCategory = await prisma.interestCategory.findFirst({
            where: {
            category_name: categoryName,
            },
        });
  
        // If the category does not exist, create it
        if (!existingCategory) {
            const newCategory = await prisma.interestCategory.create({
                data: {
                category_name: categoryName,
                },
            });

            if (interestName) {
                const newInterest = await prisma.interest.create({
                data: {
                    interest_name: interestName,
                    category_id: newCategory.category_id,
                },
                });

                return res.json({ newInterest, newCategory });
            }

            return res.json({ newCategory });
        } else {
            // If the category already exists and an interest name is provided, create the interest
            if (interestName) {
                const newInterest = await prisma.interest.create({
                data: {
                    interest_name: interestName,
                    category_id: existingCategory.category_id,
                },
                });

                return res.json({ newInterest, existingCategory });
            }

            // If the category already exists and no interest name is provided, return an error
            return res.status(400).json({ error: 'Category already exists' });
        }
    }
  
    if (interestName) {
      return res.status(400).json({ error: 'Category name is required when creating an interest' });
    }
  
    return res.status(400).json({ error: 'At least one of interest name or category name must be provided' });
}