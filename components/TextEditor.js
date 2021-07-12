import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import { EditorState, convertFromRaw, convertToRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import db from "../firebase";
import { useSession } from "next-auth/client";
import { useRouter } from "next/dist/client/router";
import { useCollectionOnce } from "react-firebase-hooks/firestore";

//import dynamically since the window object does not exists on the node server
const Editor = dynamic(
  () => import("react-draft-wysiwyg").then((module) => module.Editor),
  { ssr: false }
);

const TextEditor = () => {
  const [session] = useSession();
  const router = useRouter();
  const { id } = router.query;

  const [snapshot] = useCollectionOnce(
    db
      .collection("userDocs")
      .doc(session?.user?.email)
      .collection("docs")
      .doc(id)
  );

  useEffect(() => {
    if (snapshot?.data()?.editorState) {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(snapshot?.data()?.editorState)
        )
      );
    }
  }, [snapshot]);

  const [editorState, setEditorState] = useState(EditorState.createEmpty());

  const onEditorStateChange = (state) => {
    setEditorState(state);
    db.collection("userDocs")
      .doc(session?.user?.email)
      .collection("docs")
      .doc(id)
      .set(
        {
          editorState: convertToRaw(state.getCurrentContent()),
        },
        { merge: true }
      );
  };

  return (
    <div className="bg-[#F8F9FA] min-h-screen pb-16">
      <Editor
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
        toolbarClassName="flex sticky top-0 z-50 !justify-center mx-auto"
        editorClassName="mt-6 min-h-80vh bg-white shadow-lg max-w-6xl mx-auto  mb-12 border p-10"
      />
    </div>
  );
};

export default TextEditor;
