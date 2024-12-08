// import Resolver from '@forge/resolver';

// const resolver = new Resolver();

// resolver.define('getText', (req) => {
//   console.log(req);
//   return 'Hello, world!';
// });

// export const handler = resolver.getDefinitions();
import api, { route, routeFromAbsolute } from "@forge/api";
import Resolver from "@forge/resolver";

const resolver = new Resolver();

resolver.define("fetchRepository", async ({ context }) => {
  const workspaceId = context.workspaceId;
  const repositoryId = context.extension.repository.uuid;

  console.log(`Fetching repository ${workspaceId}/${repositoryId}`);

  const res = await api
    .asApp()
    .requestBitbucket(route`/2.0/repositories/${workspaceId}/${repositoryId}`);

  return res.json();
});

resolver.define("fetchCommits", async (req) => {
  const { payload } = req;
  const { commitsUrl } = payload;

  console.log("Fetching commits");

  const res = await api
    .asUser()
    .requestBitbucket(routeFromAbsolute(commitsUrl));

  return res.json();
});

export const handler = resolver.getDefinitions();
