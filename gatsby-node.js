const Promise = require("bluebird");
const path = require("path");

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions;

  return new Promise((resolve, reject) => {
    const allPrompts = path.resolve("./src/templates/prompt.js");
    resolve(
      graphql(
        `
          {
            allContentfulPrompt {
              edges {
                node {
                  title
                  slug
                }
              }
            }
          }
        `
      ).then((result) => {
        if (result.errors) {
          console.log(result.errors);
          reject(result.errors);
        }

        const prompts = result.data.allContentfulPrompt.edges;
        prompts.forEach((prompt) => {
          createPage({
            path: `/prompt/${prompt.node.slug}/`,
            component: allPrompts,
            context: {
              slug: prompt.node.slug,
              hashtag: prompt.node.hashtag,
            },
          });
        });
      })
    );
  });
};
