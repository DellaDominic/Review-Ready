// import React, { useEffect, useState } from 'react';
// import ForgeReconciler, { Text } from '@forge/react';
// import { invoke } from '@forge/bridge';
// const App = () => {
//   const [data, setData] = useState(null);
//   useEffect(() => {
//     invoke('getText', { example: 'my-invoke-variable' }).then(setData);
//   }, []);
//   return (
//     <>
//       <Text>Hello world!</Text>
//       <Text>{data ? data : 'Loading...'}</Text>
//     </>
//   );
// };
// ForgeReconciler.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// );
import React, { useEffect, useState } from "react";
import ForgeReconciler, { Text } from "@forge/react";
import { invoke } from "@forge/bridge";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(async () => {
    const repo = await invoke("fetchRepository");
    console.log(`Repository full name: ${JSON.stringify(repo.full_name)}`);
    const commits = await invoke("fetchCommits", {
      commitsUrl: repo.links.commits.href,
    });
    console.log(`Number of commits: ${commits.values.length}`);
  }, []);

  return (
    <>
      <Text>Hello frontend!</Text>
      <Text>{data ? data : "Loading backend data..."}</Text>
    </>
  );
};

ForgeReconciler.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
