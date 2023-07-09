import {
  Timestamp,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { db } from "../Context/firebase-config";

//Collection name
const COLLECTION_NAME = "leaves";
const leaveRef = collection(db, COLLECTION_NAME);

// Type
export type Leave = {
  id?: string;
  code: number;
  type: string;
  subType: string;
  position: string;
  dateFrom?: Date;
  dateTo?: Date;
  timeFrom?: Date;
  timeTo?: Date;
  causeOfLeave: string;
  exchange: number;
  createDate: Timestamp | string;
};

export const getAll = async (): Promise<Array<Leave>> => {
  const snapshot = await getDocs(leaveRef);
  const data: Leave[] = [];

  snapshot.docs.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
    } as Leave);
  });

  return data;
};

export const getByCode = async (code: number): Promise<Leave | null> => {
  const q = query(leaveRef, where("code", "==", code));

  const queryQ = await getDocs(q);
  const doc = queryQ.docs[0];
  if (doc === undefined) {
    return null;
  }
  return { id: doc.id, ...doc.data() } as Leave;
};
