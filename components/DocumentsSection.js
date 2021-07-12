import Icon from "@material-tailwind/react/Icon";

import { useCollection } from "react-firebase-hooks/firestore";
import db from "../firebase";
import { useSession } from "next-auth/client";

import DocumentRow from "./DocumentRow";

const DocumentsSection = () => {
  const [session] = useSession();

  const [snapshot] = useCollection(
    db
      .collection("userDocs")
      .doc(session?.user?.email)
      .collection("docs")
      .orderBy("timestamp", "desc")
  );

  return (
    <section className="bg-white px-10 max-w-3xl mx-auto py-8 text-sm text-gray-700">
      <div className="flex items-center justify-between pb-5">
        <h2 className="font-medium flex-grow">My Documents</h2>
        <p className="mr-12">Date Created</p>
        <Icon name="folder" size="3xl" color="gray" />
      </div>

      {snapshot?.docs.map((doc) => (
        <DocumentRow
          key={doc.id}
          id={doc.id}
          fileName={doc.data().fileName}
          date={doc.data().timestamp}
        />
      ))}
    </section>
  );
};

export default DocumentsSection;
