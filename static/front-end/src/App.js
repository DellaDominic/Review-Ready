import React, { useEffect, useState } from "react";
import { invoke } from "@forge/bridge";
import { CiSquarePlus } from "react-icons/ci";
import { GoPlus } from "react-icons/go";

const App = () => {
  const [comments, setComments] = useState([
    {
      id: 1,
      fileName: "main.py",
      lineNumber: 45,
      comment:
        "The purpose of the PR is clearly described in the title and/or description.",
      reviewer: "Alice Smith",
      status: "Open",
      resolution: "Will rename to `processed_data` in the next commit.",
    },
    {
      id: 2,
      fileName: "utils/helpers.py",
      lineNumber: 72,
      comment:
        "All related Jira tickets/issues are linked in the PR description.",
      reviewer: "Bob Johnson",
      status: "Resolved",
      resolution: "Added a constant `TIMEOUT` in `constants.py`.",
    },
    {
      id: 3,
      fileName: "README.md",
      lineNumber: "N/A",
      comment: "The PR includes relevant screenshots or logs (if applicable).",
      reviewer: "Alice Smith",
      status: "Pending",
      resolution: "Will add examples by the next update.",
    },
    {
      id: 4,
      fileName: "styles.css",
      lineNumber: 120,
      comment: "Full code coverage on new functionality by unit tests.",
      reviewer: "Charlie Brown",
      status: "Resolved",
      resolution: "Corrected the typo.",
    },
  ]);
  const [data, setData] = useState(null);
  const [newCheckItem, setNewCheckItem] = useState("");
  const [isCheckedList, setIsCheckedList] = useState(
    Array(comments.length).fill(false)
  );

  const handleAddCheck = () => {
    if (newCheckItem) {
      setComments([
        ...comments,
        { id: comments.length, comment: newCheckItem },
      ]);
      setNewCheckItem("");
    }
  };

  useEffect(async () => {
    const repo = await invoke("fetchRepository");
    console.log(`Repository full name: ${JSON.stringify(repo.full_name)}`);
    const commits = await invoke("fetchCommits", {
      commitsUrl: repo.links.commits.href,
    });
    setData(JSON.stringify(commits));
    console.log(`Number of commits: ${JSON.stringify(commits)}`);
    const reviewComments = await invoke("fetchReviewComments");
    console.log(`review comments: ${JSON.stringify(reviewComments)}`);
  }, []);

  const handleCheckboxChange = (event, index) => {
    setIsChecked(event.target.checked);
  };

  console.log("data----->", data);
  return (
    <>
      {/* <h1>{data ? data : " Data is loading" + data}</h1> */}
      <hr />
      <div>
        <table style={{ borderCollapse: "collapse", width: "100%" }}>
          <thead>
            <tr>
              <th>Done</th>
              {/* <th>File Name</th>
          <th>Line Number</th> */}
              <th>PR checks</th>
              {/* <th>Comments</th> */}
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
                  <input
                    style={{ marginTop: "10px" }}
                    type="checkbox"
                    id={comment.id}
                    value={comment.comment}
                    // checked={isCheckedList[index]}
                    onChange={(e, index) =>
                      setIsCheckedList([
                        ...isCheckedList,
                        (isCheckedList[index] = e.target.checked),
                      ])
                    }
                  />

                  {/* <td>{comment.fileName}</td>
            <td>{comment.lineNumber}</td> */}
                  <td>
                    <label for={comment.id}>{comment.comment}</label>
                  </td>
                  {/* <td>
                  <input
                  // value={newCheckItem}
                  style={{ width: "30%" }}
                  // onChange={(e) => setNewCheckItem(e.target.value)}
                ></input>
                  </td> */}
                  {/* scroll to the comment on click----------------------- */}
                  {/* <td>{<button onClick={() => {}}>Notes</button>}</td> */}
                  {/* <td>{comment.reviewer}</td>
            <td>{comment.status}</td>
            <td>{comment.resolution}</td> */}
                </tr>
              );
            })}
            <tr>
              <th>
                <div onClick={handleAddCheck} style={{ marginLeft: "3px" }}>
                  <GoPlus />
                </div>
              </th>
              <th>
                <input
                  value={newCheckItem}
                  style={{ width: "90%" }}
                  onChange={(e) => setNewCheckItem(e.target.value)}
                ></input>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default App;
