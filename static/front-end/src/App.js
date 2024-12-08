import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(async () => {
    const repo = await invoke("fetchRepository");
    console.log(`Repository full name: ${JSON.stringify(repo.full_name)}`);
    const commits = await invoke("fetchCommits", {
      commitsUrl: repo.links.commits.href,
    });
    console.log(`Number of commits: ${JSON.stringify(commits)}`);
    const reviewComments = await invoke("fetchReviewComments");
    console.log(`review comments: ${JSON.stringify(reviewComments)}`);
  }, []);

  // const handleCheckboxChange = (event) => {
  //   setIsChecked(event.target.checked);
  // };

  const comments = [
    {
      id: 1,
      fileName: "main.py",
      lineNumber: 45,
      comment: "Consider renaming this variable to improve readability.",
      reviewer: "Alice Smith",
      status: "Open",
      resolution: "Will rename to `processed_data` in the next commit.",
    },
    {
      id: 2,
      fileName: "utils/helpers.py",
      lineNumber: 72,
      comment: "Avoid using hardcoded values; use a constant instead.",
      reviewer: "Bob Johnson",
      status: "Resolved",
      resolution: "Added a constant `TIMEOUT` in `constants.py`.",
    },
    {
      id: 3,
      fileName: "README.md",
      lineNumber: "N/A",
      comment:
        "Please update the documentation to include examples of the new API usage.",
      reviewer: "Alice Smith",
      status: "Pending",
      resolution: "Will add examples by the next update.",
    },
    {
      id: 4,
      fileName: "styles.css",
      lineNumber: 120,
      comment:
        "There's a typo in the class name; it should be `.navbar-active` instead.",
      reviewer: "Charlie Brown",
      status: "Resolved",
      resolution: "Corrected the typo.",
    },
  ];
  console.log("data----->", data);
  return (
    <>
      {/* <h1>{data ? data : " Data is loading" + data}</h1> */}
      <hr />
      <div>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>man</th>
              {/* <th>File Name</th>
          <th>Line Number</th> */}
              <th>Comment</th>
              <th>Details</th>
              {/* <th>Reviewer</th>
          <th>Status</th>
          <th>Response/Resolution</th> */}
            </tr>
          </thead>
          <tbody>
            {comments.map((comment, index) => {
              return (
                <tr key={comment.id}>
                  {/* <td>{index + 1}</td> */}
                  {/* <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={handleCheckboxChange}
                  /> */}
                  {/* <td>{comment.fileName}</td>
            <td>{comment.lineNumber}</td> */}
                  <td>{comment.comment}</td>
                  {/* scroll to the comment on click----------------------- */}
                  <td>{<button onClick={() => {}}>See comment</button>}</td>
                  {/* <td>{comment.reviewer}</td>
            <td>{comment.status}</td>
            <td>{comment.resolution}</td> */}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
