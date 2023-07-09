import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../Context/firebase-config";

//Collection name
const COLLECTION_NAME = "teacher";
const teacherRef = collection(db, COLLECTION_NAME);

// Type
export type Teacher = {
  id?: string;
  code: number;
  firstName: string;
  lastName: string;
  tel?: string;
};

export const getAll = async (): Promise<Array<Teacher>> => {
  const snapshot = await getDocs(teacherRef);
  const data: Teacher[] = [];

  snapshot.docs.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    } as Teacher);
  });

  return data;
};

export const getByCode = async (code: number): Promise<Teacher | null> => {
  const q = query(teacherRef, where("code", "==", code));

  const queryQ = await getDocs(q);
  const doc = queryQ.docs[0];
  if (doc === undefined) {
    return null;
  }
  return { id: doc.id, ...doc.data() } as Teacher;
};
