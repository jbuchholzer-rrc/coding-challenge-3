import { db } from "../../../config/firebaseConfig";

export const addDocument = async <T>(
    collectionName: string,
    data: Omit<T, 'id'>
): Promise<string> => {
    const docRef = await db.collection(collectionName).add(data);
    return docRef.id;
};


