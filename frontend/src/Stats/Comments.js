import { useEffect, useState } from "react";
import { connect } from 'react-redux';
import { get_comments, create_comment } from '../api';



function Comments({session, airport_id}) {

  const [body, setBody] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    get_comments(airport_id).then(res => {
      setComments(res)
    })
  }, [airport_id])

  const handleSubmit = () => {
    create_comment({
      body: body,
      user_id: session.user_id,
      airport_id: airport_id
    }).then(() => {
      get_comments(airport_id).then(res => {
        setComments(res);
      })
    })
  }

  let commentDivs = comments.map((comment, index) => (
    <div key={index} className="w-full p mt-2 flex flex-row border-4 border-darkgray rounded shadow-md">
      <div className="p-4 font-bold">
        {comment.username}:
      </div>
      <div className="p-4 px-0">
        {comment.body}
      </div>
    </div>
  ))

  // only allow comments if logged in
  return (
    <div className="w-full">
      {session &&
        <div className="flex flex-col border-2 p-2 bg-darkgray rounded-md">
          <textarea className="focus:shadow-outline p-3 border rounded text-black" type="text" placeholder="Write a comment!" onChange={e => setBody(e.target.value)}/>
          <button className="mt-4 w-1/4 py-2 px-4 bg-orange rounded" onClick={handleSubmit}>Submit</button>
      </div>
      }
      
      <div className="flex flex-col p-2">
        {commentDivs}
      </div>
    </div>
  );
}

export default connect(({session}) => ({session}))(Comments);
